import mongoose from "mongoose";
import { combineDateWithCurrentTime } from "../Utilities/helper.js";

const assetsSchema = mongoose.Schema(
  {
    item: {
      type: String,
      required: [true, "Assets must have item name"],
    },
    amount: {
      type: Number,
      required: [true, "Asset must have an amount"],
      min: [0, "Amount must be a positive number"],
    },
    remark: {
      type: String,
      trim: true,
      minlength: [3, "Remark must be at least 3 characters long"],
    },
    type: {
      type: String,
      enum: ["Fixed", "Temp"],
      required: [true, "Asset must have a type (Fixed, Temp)"],
    },
    purchasedBy: {
      type: String,
      required: [true, "Asset must have a type (Credit, Debit)"],
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Asset must have a branch"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    formattedDate: {
      type: String,
    },
  },
  { timestamps: true }
);

assetsSchema.pre("save", async function (next) {
  const combinedDateTime = combineDateWithCurrentTime(this.date);
  this.date = combinedDateTime.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  this.formattedDate = combinedDateTime.format("YYYY-MM-DD");

  next();
});

const Assets = mongoose.model("Asset", assetsSchema);
export default Assets;
