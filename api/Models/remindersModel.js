import mongoose from "mongoose";
import { combineDateWithCurrentTime } from "../Utilities/helper.js";

const reminderSchema = mongoose.Schema(
  {
    purpose: {
      type: String,
      required: [true, "Reminder Must have a purpose"],
      minlength: [3, "Purpose must be at least 3 characters long"],
      maxlength: [50, "Purpose must be less than 50 characters long"],
    },
    catagory: {
      type: mongoose.Schema.ObjectId,
      ref: "Catagory",
      required: [true, "Reminder Must have a catagory"],
    },

    particular: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Particulars",
      required: [true, "Transaction Must have a Particular"],
    },
    amount: {
      type: Number,
      required: [true, "Reminder must have an amount"],
      min: [0, "Amount must be a positive number"],
    },
    remark: {
      type: String,
      trim: true,
      minlength: [3, "Remark must be at least 3 characters long"],
    },
    adminstatus: {
      type: String,
      enum: ["Approved", "Postponed"],
      required: [true, "Reminder must have a Status (Paid, Unpaid, Postponed)"],
    },
    accountstatus: {
      type: String,
      enum: ["Paid", "Unpaid"],
      required: [true, "Reminder must have a Status (Paid, Unpaid, Postponed)"],
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Reminder must have a branch"],
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

reminderSchema.pre("save", async function (next) {
  const combinedDateTime = combineDateWithCurrentTime(this.date);

  this.date = combinedDateTime.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  this.formattedDate = combinedDateTime.format("YYYY-MM-DD");

  next();
});
reminderSchema.pre("findOneAndUpdate", async function (next) {
  // Get the update object
  const update = this.getUpdate();

  // Check if the 'date' field exists in the update object
  if (update.date) {
    // Combine date with the current time
    const combinedDateTime = combineDateWithCurrentTime(update.date);

    // Update the date fields
    update.date = combinedDateTime.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    update.formattedDate = combinedDateTime.format("YYYY-MM-DD");
  }

  next();
});

const Reminder = mongoose.model("Reminder", reminderSchema);

export default Reminder;
