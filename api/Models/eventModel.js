import mongoose from "mongoose";
import AppError from "../Utilities/appError.js";
import { combineDateWithCurrentTime } from "../Utilities/helper.js";

const eventSchema = mongoose.Schema(
  {
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: [true, "Branch is required for event"],
    },
    property: {
      type: String,
      required: [true, "Event property is required"],
    },
    amount: {
      type: Number,
      required: [true, "Event amount is required"],
    },
    totalAmount: {
      type: Number,
    },
    pastUpdatedAmount: {
      type: Number,
    },
    formattedDate: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },

  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Create a compound index on branch and property
// Using collation for case-insensitive uniqueness while preserving original case
eventSchema.index(
  { branch: 1, property: 1 },
  {
    unique: true,
    collation: { locale: "en", strength: 2 },
  }
);

eventSchema.virtual("percentageDifference").get(function () {
  const difference = this.amount - this.pastUpdatedAmount;
  const percentageDifference = (difference / this.pastUpdatedAmount) * 100;
  return percentageDifference < 0
    ? `-${Math.abs(percentageDifference).toFixed(2)}%`
    : `+${percentageDifference.toFixed(2)}%`;
});

eventSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const docToUpdate = await this.model.findOne(this.getQuery());
    const updateData = this.getUpdate();

    if (
      docToUpdate &&
      updateData.amount &&
      docToUpdate.amount !== updateData.amount
    ) {
      this.set({ pastUpdatedAmount: docToUpdate.amount });
    }
    this.totalAmount -= docToUpdate.amount;
    this.totalAmount += updateData.amount;

    next();
  } catch (error) {
    next(new AppError("Error in finding document", 500));
  }
});

eventSchema.pre("save", async function (next) {
  const Event = this.constructor; // Reference to the model

  if (!this.isNew) {
    // For updates, find the previous version to adjust the total property amount correctly
    const previousEvent = await Event.findById(this._id);

    if (previousEvent) {
      // Subtract previous amount from total, then add updated amount for the same property
      const totalAmountForProperty = await Event.aggregate([
        { $match: { property: this.property } },
        { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
      ]);

      this.totalAmount =
        totalAmountForProperty[0].totalAmount -
        previousEvent.amount +
        this.amount;
    } else {
      this.totalAmount = this.amount;
    }
  } else {
    // For new documents, calculate total amount for this property type
    const totalAmountForProperty = await Event.aggregate([
      { $match: { property: this.property } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);

    this.totalAmount =
      totalAmountForProperty[0]?.totalAmount + this.amount || this.amount;
  }
  await Event.updateMany(
    { property: this.property },
    { totalAmount: this.totalAmount }
  );

  this.pastUpdatedAmount = this.amount;
  next();
});

eventSchema.pre("save", function (next) {
  const combinedDateTime = combineDateWithCurrentTime(this.date);
  this.date = combinedDateTime.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  this.formattedDate = combinedDateTime.format("YYYY-MM-DD");
  next();
});

const Events = mongoose.model("Events", eventSchema);

export default Events;
