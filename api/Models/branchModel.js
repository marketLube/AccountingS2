import mongoose from "mongoose";
import Bank from "./bankModel.js";
import AppError from "../Utilities/appError.js";

const branchSchema = mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      required: [true, "Branch must have a name"],
      unique: [true, "Branch Names must be unique"],
    },
    totalBranchBalance: {
      type: Number,
      default: 0,
    },
    accounts: [
      {
        bank: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Bank",
        },
        branchBalance: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);
//Only for newly created branches its adding all bank accounts to this branch
branchSchema.pre("save", async function (next) {
  if (!this.isNew) return next(); // Only run this on new documents
  try {
    const banks = await Bank.find({});
    this.accounts = banks.map((bank) => ({
      bank: bank._id,
      branchBalance: 0,
    }));
    next();
  } catch (err) {
    return next(new AppError("Something went wrong while adding banks"));
  }
});

const Branch = mongoose.model("Branch", branchSchema);

export default Branch;
