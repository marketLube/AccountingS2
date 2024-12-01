import mongoose from "mongoose";
import Bank from "./bankModel.js";
import Branch from "./branchModel.js";
import AppError from "../Utilities/appError.js";

const transactionSchema = mongoose.Schema(
  {
    catagory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Catagory",
      required: [true, "Transaction Must have a Category"],
    },
    particular: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Particulars",
      required: [true, "Transaction Must have a Particular"],
    },
    purpose: {
      type: String,
      required: [true, "Transaction Must hava a purpose"],
      minlength: [3, "Purpose name must be at least 3 characters long"],
      maxlength: [160, "Purpose name must be less than 50 characters long"],
    },
    amount: {
      type: Number,
    },
    bank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bank",
      required: [true, "Bank must have a name"],
    },
    remark: {
      type: String,
      trim: true,
      minlength: [1, "Description must be at least 3 characters long"],
    },
    type: {
      type: String,
      enum: ["Credit", "Debit"],
      required: [true, "Transaction must have a type (Credit or Debit)"],
    },
    date: {
      type: Date,
      default: new Date(),
    },
    formattedDate: {
      type: String,
    },
    tds: {
      type: String,
      default: "0%",
    },
    gstPercent: {
      type: Number,
      default: 0,
    },
    gstType: {
      type: String,
      enum: ["incl", "excl", "no-gst"],
      default: "no-gst",
    },
    totalAmt: {
      type: Number,
    },
    tdsType: {
      type: String,
      enum: ["Payable", "Receivable", "no tds"],
      default: "no tds",
    },
    isGstDeduct: {
      type: Boolean,
      default: false,
    },

    branches: [
      {
        branch: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Branch",
        },
        amount: {
          type: Number,
          required: [true, "Trancsaction branches must have amount"],
        },
        branchTotalAmt: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);
transactionSchema.pre(/^find/, function (next) {
  this.populate({ path: "branches.branch", select: "name" });
  next();
});

// Pre-save middleware
transactionSchema.pre("save", async function (next) {
  try {
    // 1. Validate bank exists
    const bank = await Bank.findById(this.bank);
    if (!bank) {
      return next(new AppError("Bank not found", 404));
    }

    // 2. Calculate total transaction amount and update branches
    let totalAmount = 0;

    // Use Promise.all for parallel processing of branches
    await Promise.all(
      this.branches.map(async (branchData) => {
        // Validate branch exists
        const branch = await Branch.findById(branchData.branch);
        if (!branch) {
          throw new AppError(`Branch ${branchData.branch} not found`, 404);
        }

        // Convert amount based on transaction type
        const amount =
          this.type === "Credit" ? branchData.amount : -branchData.amount;
        totalAmount += amount;

        // Find and update the branch's bank account
        const bankAccount = branch.accounts.find(
          (account) => account.bank.toString() === this.bank.toString()
        );

        if (!bankAccount) {
          return next(new AppError("Failed to fetch Bank Accounts", 400));
        }

        if (this.tdsType !== "no tds") {
          // Calculate TDS value
          const tdsRate = parseFloat(this.tds) / 100;
          const tdsDeduction = amount * tdsRate;

          // Update existing bank account balance with TDS applied
          bankAccount.branchBalance += amount - tdsDeduction;
          branchData.amount = Math.abs(amount - tdsDeduction);
          branchData.branchTotalAmt = Math.abs(amount);

          // Update total branch balance with TDS applied
          branch.totalBranchBalance += amount - tdsDeduction;
        } else {
          // If no TDS, update balances normally
          bankAccount.branchBalance += amount;
          branch.totalBranchBalance += amount;
        }

        // Save branch updates
        await branch.save();
      })
    );

    if (this.tdsType !== "no tds") {
      const tdsRate = parseFloat(this.tds) / 100;
      const tdsDeduction = totalAmount * tdsRate;

      // 3. Update bank balance
      bank.balance += totalAmount - tdsDeduction;
      this.amount = Math.abs(totalAmount - tdsDeduction);
    } else {
      bank.balance += totalAmount;
      this.amount = Math.abs(totalAmount);
    }
    this.totalAmt = Math.abs(totalAmount);

    // Save bank updates
    await bank.save();

    // 4. Set formatted date
    this.formattedDate = this.date.toISOString().split("T")[0];

    next();
  } catch (error) {
    console.log(error);
    next(new AppError("Failed to create transaction", 404));
  }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
