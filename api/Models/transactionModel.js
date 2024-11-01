import mongoose from "mongoose";
import Bank from "./bankModel.js";
import Branch from "./branchModel.js";
import AppError from "../Utilities/appError.js";

const transactionSchema = mongoose.Schema(
  {
    catagory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Catagory",
      required: [true, "Transaction Must have a Catagory"],
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
      maxlength: [30, "Purpose name must be less than 50 characters long"],
    },
    bank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bank",
      required: [true, "Bank must have a name"],
    },
    remark: {
      type: String,
      trim: true,
      minlength: [3, "Description must be at least 3 characters long"],
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
      },
    ],
  },
  { timestamps: true }
);

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

        if (!bankAccount)
          return next(new AppError("Failed to fetch Bank Account", 404));

        // Update existing bank account balance
        bankAccount.branchBalance += amount;

        // Update total branch balance
        branch.totalBranchBalance += amount;

        // Save branch updates
        await branch.save();
      })
    );

    // 3. Update bank balance
    bank.balance += totalAmount;

    // Save bank updates
    await bank.save();

    // 4. Set formatted date
    this.formattedDate = this.date.toISOString().split("T")[0];

    next();
  } catch (error) {
    next(new AppError("Failed to create transaction", 404));
  }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
