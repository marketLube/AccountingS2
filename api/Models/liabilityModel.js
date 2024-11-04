import mongoose from "mongoose";
import { combineDateWithCurrentTime } from "../Utilities/helper.js";

const liabilityAndOutstandingSchema = mongoose.Schema(
  {
    catagory: {
      type: mongoose.Schema.ObjectId,
      ref: "Catagory",
      required: [true, "Liability/Outstanding Must have a Catagory"],
    },

    particular: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Particulars",
      required: [true, "Liability/Outstanding Must have a Particular"],
    },
    type: {
      type: String,
      enum: ["liability", "outstanding"],
      required: [
        true,
        "Entry type must be either 'liability' or 'outstanding'",
      ],
    },

    purpose: {
      type: String,
      required: [true, "Liability/Outstanding must have a purpose"],
      minlength: [3, "Purpose must be at least 3 characters long"],
      maxlength: [60, "Purpose must be less than 20 characters long"],
    },

    amount: {
      type: Number,
      min: [0, "Amount must be a positive number"],
    },

    remark: {
      type: String,
      trim: true,
      minlength: [3, "Remark must be at least 3 characters long"],
    },

    status: {
      type: String,
      enum: ["Paid", "Unpaid", "Postponed", "Pending"],
      required: [
        true,
        "Liability/Outstanding must have a status ('Paid', 'Unpaid', 'Postponed', or 'Pending')",
      ],
    },
    branches: {
      type: [
        {
          branch: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branch",
            required: [
              true,
              "Liability/Outstanding must have at least one branch",
            ],
          },
          amount: {
            type: Number,
            required: [
              true,
              "Liability/Outstanding must have at least one branch and amount",
            ],
          },
        },
      ],
      required: [
        true,
        "Liability/Outstanding must have at least one branch entry",
      ],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "Liability/Outstanding must contain at least one branch entry",
      },
    },
    formattedDate: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
liabilityAndOutstandingSchema.pre(/^find/, function (next) {
  this.populate({
    path: "particular",
    select: "name",
  });
  next();
});

liabilityAndOutstandingSchema.pre("save", function (next) {
  this.amount = this.branches.reduce((acc, val) => val.amount + acc, 0);
  next();
});
liabilityAndOutstandingSchema.pre("save", function (next) {
  const combinedDateTime = combineDateWithCurrentTime(this.date);
  this.date = combinedDateTime.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  this.formattedDate = combinedDateTime.format("YYYY-MM-DD");
  next();
});

const LiabilityAndOutstanding = mongoose.model(
  "Liability and outstanding",
  liabilityAndOutstandingSchema
);

export default LiabilityAndOutstanding;
