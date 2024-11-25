import mongoose from "mongoose";

const bankToBankSchema = mongoose.Schema(
  {
    fromBank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bank",
      required: [true, "Bank to bank must have from bank"],
    },
    toBank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bank",
      required: [true, "Bank to bank must have to bank"],
    },
    fromBranch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: [true, "Bank to bank must have to from branch"],
    },
    toBranch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: [true, "Bank to bank must have to branch"],
    },
    amount: {
      type: Number,

      required: [true, "Bank to bank must have an amount"],
    },
  },
  { timestamps: true }
);

const BankToBank = mongoose.model("BankToBank", bankToBankSchema);

export default BankToBank;
