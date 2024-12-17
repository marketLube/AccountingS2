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
      // type: String,
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
    gstAmount: {
      type: Number,
      default: 0,
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

transactionSchema.pre("save", async function (next) {
  try {
    // 1. Validate bank exists
    const bank = await Bank.findById(this.bank);
    if (!bank) {
      return next(new AppError("Bank not found", 404));
    }

    let totalAmount = 0;
    let totalTdsDeduction = 0;
    let totalGstAmount = 0;

    // 2. Process branches sequentially to avoid race conditions
    for (const branchData of this.branches) {
      // Validate branch exists
      const branch = await Branch.findById(branchData.branch);
      if (!branch) {
        return next(new AppError(`Branch ${branchData.branch} not found`, 404));
      }

      // Convert amount based on transaction type
      const amount =
        this.type === "Credit" ? branchData.amount : -branchData.amount;
      totalAmount += amount;

      // Find branch's bank account
      const bankAccount = branch.accounts.find(
        (account) => account.bank.toString() === this.bank.toString()
      );

      if (!bankAccount) {
        return next(new AppError("Failed to fetch Bank Accounts", 400));
      }

      // TDS Calculation
      let branchTdsDeduction = 0;
      let branchGstAmount = 0;

      if (this.tdsType !== "no tds") {
        const tdsRate = parseFloat(this.tds) / 100;
        branchTdsDeduction = amount * tdsRate;
        totalTdsDeduction += branchTdsDeduction;
      }

      // GST Calculation
      if (this.gstType === "excl") {
        const gstRate = this.gstPercent / 100;
        branchGstAmount = amount * gstRate;
        totalGstAmount += branchGstAmount;
      }

      let finalBranchAmount = amount - branchTdsDeduction;

      // Update branch and bank account balances
      if (this.isGstDeduct) {
        finalBranchAmount = amount + branchGstAmount - branchTdsDeduction;
      }
      bankAccount.branchBalance += finalBranchAmount;
      branch.totalBranchBalance += finalBranchAmount;

      // Update branch data
      branchData.amount = Math.abs(finalBranchAmount);
      branchData.branchTotalAmt = Math.abs(amount);

      // Save branch updates
      await branch.save();
    }

    // 3. Update bank balance
    let finalBankAmount = totalAmount - totalTdsDeduction;

    if (this.isGstDeduct) {
      finalBankAmount = totalAmount + totalGstAmount - totalTdsDeduction;
    }
    bank.balance += finalBankAmount;

    // Update transaction amounts
    this.amount = Math.abs(finalBankAmount);
    this.totalAmt = Math.abs(totalAmount);
    this.tdsDeduction = totalTdsDeduction;
    this.gstAmount = totalGstAmount;

    // 4. Set formatted date
    this.formattedDate = this.date.toISOString().split("T")[0];

    // Save bank updates
    await bank.save();

    next();
  } catch (error) {
    next(new AppError("Failed to create transaction", 404));
  }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
