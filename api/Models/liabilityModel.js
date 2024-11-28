import mongoose from "mongoose";

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
  this.populate({ path: "branches.branch", select: "name" });
  next();
});

liabilityAndOutstandingSchema.pre("save", function (next) {
  this.formattedDate = this.date.toISOString().split("T")[0];
  next();
});

liabilityAndOutstandingSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update.branches && Array.isArray(update.branches)) {
    const totalAmount = update.branches.reduce(
      (acc, val) => acc + (val.amount || 0),
      0
    ); // Safely sum amounts
    update.amount = totalAmount; // Add calculated `amount` to the update object
  }

  if (update.date) {
    const date = new Date(update.date); // Ensure `update.date` is a valid date object
    if (!isNaN(date.getTime())) {
      update.formattedDate = date.toISOString().split("T")[0]; // Format date to `YYYY-MM-DD`
    } else {
      return next(new Error("Invalid date format provided"));
    }
  }

  this.setUpdate(update); // Safely set the updated object
  next();
});

// Handle save hooks
liabilityAndOutstandingSchema.pre("save", function (next) {
  this.amount = this.branches.reduce((acc, val) => val.amount + acc, 0);
  next();
});

const LiabilityAndOutstanding = mongoose.model(
  "Liability and outstanding",
  liabilityAndOutstandingSchema
);

export default LiabilityAndOutstanding;
