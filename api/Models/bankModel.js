import mongoose from "mongoose";
import cron from "node-cron";

const bankSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Bank must have a name"],
      unique: [true, "Bank name must be unique"],
    },
    balance: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    lastMonthBalance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Bank = mongoose.model("Bank", bankSchema);

// Function to update the last month's bank balances
const updateLastMonthBankBalances = async () => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Fetch all banks
    const banks = await Bank.find().session(session);

    // Prepare bulk operations
    const bulkOps = banks.map((bank) => ({
      updateOne: {
        filter: { _id: bank._id },
        update: { $set: { lastMonthBalance: bank.balance } },
      },
    }));

    // Execute bulk update
    await Bank.bulkWrite(bulkOps, { session });

    // Commit the transaction
    await session.commitTransaction();
    console.log("Last month's bank balances updated successfully.");
  } catch (error) {
    // If an error occurred, abort the transaction
    await session.abortTransaction();
    console.error("Error updating last month's bank balances:", error);
  } finally {
    // End the session
    session.endSession();
  }
};

cron.schedule("0 0 1 * *", async () => {
  console.log("Running Cron Job: Updating last month's bank balances...");
  await updateLastMonthBankBalances();
});

export default Bank;
