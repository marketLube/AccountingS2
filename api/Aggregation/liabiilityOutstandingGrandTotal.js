import mongoose from "mongoose";
import LiabilityAndOutstanding from "../Models/liabilityModel.js";

export const getLiabilityOutstandingTotal = async (req) => {
  const query = { ...req.query };
  const branchId = req.query.branchId;

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

  // Add match stage if there are any conditions
  if (Object.keys(matchStage).length > 0) {
    pipeline.push({ $match: matchStage });
  }

  if (branchId) {
    if (!mongoose.Types.ObjectId.isValid(branchId)) {
      throw new Error("branchId is not a valid ObjectId");
    }

    pipeline.push(
      // Unwind branches array to work with individual branch entries
      { $unwind: "$branches" },
      // Match specific branch
      {
        $match: {
          "branches.branch": new mongoose.Types.ObjectId(branchId),
        },
      },
      // Group to sum the amounts by branch
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$branches.amount" },
        },
      }
    );
  } else {
    // For non-branch specific calculations
    pipeline.push(
      // Group to sum the total amounts
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      }
    );
  }

  try {
    const result = await LiabilityAndOutstanding.aggregate(pipeline);
    return result.length > 0
      ? { totalAmount: result[0].totalAmount }
      : { totalAmount: 0 };
  } catch (error) {
    console.error("Aggregation error:", error);
    throw error;
  }
};
