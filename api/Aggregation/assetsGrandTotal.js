import mongoose from "mongoose";
import Assets from "../Models/assetsModel.js";

export const getAssetsTotal = async (req) => {
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
      fixedTotal: {
        $sum: {
          $cond: [
            { $eq: ["$type", "Fixed"] }, // If type is "Fixed"
            "$amount",
            0,
          ],
        },
      },
      tempTotal: {
        $sum: {
          $cond: [
            { $eq: ["$type", "Temp"] }, // If type is "Temp"
            "$amount",
            0,
          ],
        },
      },
      overallTotal: {
        $sum: "$amount", // Sum of all amounts
      },
    },
  });

  try {
    const result = await Assets.aggregate(pipeline);
    return result.length > 0
      ? {
          fixedTotal: result[0].fixedTotal || 0,
          tempTotal: result[0].tempTotal || 0,
          overallTotal: result[0].overallTotal || 0,
        }
      : { fixedTotal: 0, tempTotal: 0, overallTotal: 0 };
  } catch (error) {
    console.error("Aggregation error:", error);
    throw error;
  }
};
