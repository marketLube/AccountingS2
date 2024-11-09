import mongoose from "mongoose";
import { combineDateWithCurrentTime } from "../Utilities/helper.js";

const capitalSchema = mongoose.Schema(
  {
    invested: {
      type: String,
      required: [true, "Capital must have Invested property name"],
    },
    amount: {
      type: Number,
      required: [true, "Capital must have an amount"],
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
      required: [true, "Capital must have a type (Fixed, Temp)"],
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Capital must have a branch"],
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

capitalSchema.pre("save", async function (next) {
  const combinedDateTime = combineDateWithCurrentTime(this.date);
  this.date = combinedDateTime.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  this.formattedDate = combinedDateTime.format("YYYY-MM-DD");

  next();
});

const Capital = mongoose.model("Capital", capitalSchema);
export default Capital;
