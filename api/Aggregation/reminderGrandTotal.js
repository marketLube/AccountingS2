import mongoose from "mongoose";
import Reminder from "../Models/remindersModel.js";

export const getReminderGrandTotal = async (req) => {
  const query = { ...req.query };
  const branchId = req.query.branch;

  delete query.page;
  delete query.limit;

  // Base pipeline for filtering
  const pipeline = [];

  // Match stage based on query parameters
  const matchStage = {};

  // Handle date range if present
  if (query.startDate && query.endDate) {
    matchStage.date = {
      $gte: new Date(query.startDate),
      $lte: new Date(query.endDate),
    };
  }

  // Add other query parameters to match stage
  ["type", "catagory", "particular", "status"].forEach((field) => {
    if (query[field]) {
      if (["catagory", "particular"].includes(field)) {
        // Validate and convert ObjectId fields
        if (mongoose.Types.ObjectId.isValid(query[field])) {
          matchStage[field] = new mongoose.Types.ObjectId(query[field]);
        } else {
          throw new Error(`${field} is not a valid ObjectId`);
        }
      } else {
        matchStage[field] = query[field];
      }
    }
  });

  // Add branch-specific filtering
  if (branchId) {
    if (!mongoose.Types.ObjectId.isValid(branchId)) {
      throw new Error("branchId is not a valid ObjectId");
    }
    matchStage.branch = new mongoose.Types.ObjectId(branchId);
  }

  // Add match stage if there are any conditions
  if (Object.keys(matchStage).length > 0) {
    pipeline.push({ $match: matchStage });
  }

  // Add a group stage to calculate totals
  pipeline.push({
    $group: {
      _id: null,
      totalExcludingPaid: {
        $sum: {
          $cond: [
            { $ne: ["$status", "Paid"] }, // If status is not "Paid"
            "$amount",
            0,
          ],
        },
      },
      totalPaid: {
        $sum: {
          $cond: [
            { $eq: ["$status", "Paid"] }, // If status is "Paid"
            "$amount",
            0,
          ],
        },
      },
    },
  });

  try {
    const result = await Reminder.aggregate(pipeline);
    return result.length > 0
      ? {
          totalExcludingPaid: result[0].totalExcludingPaid || 0,
          totalPaid: result[0].totalPaid || 0,
        }
      : { totalExcludingPaid: 0, totalPaid: 0 };
  } catch (error) {
    console.error("Aggregation error:", error);
    throw error;
  }
};
