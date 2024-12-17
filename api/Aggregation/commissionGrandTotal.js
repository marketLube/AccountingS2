import commission from "../Models/universityModel.js";
import mongoose from "mongoose";
import { matchDates, matchField } from "./features/matchingObj.js";

export const commissionGrandTotal = async (req) => {
  const query = { ...req.query };
  const branchId = req.query.branchId;

  delete query.page;
  delete query.limit;

  // Base pipeline for filtering
  const pipeline = [];

  // Match stage based on query parameters
  const matchStage = {};

  if (
    query.search &&
    typeof query.search === "string" &&
    query.search.trim() !== ""
  ) {
    const escapedSearch = query.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const searchRegex = new RegExp(query.search, "i");
    const searchQuery = {
      $or: [
        { formattedDate: { $regex: searchRegex } },
        { type: { $regex: searchRegex } },
        {
          status: {
            $regex: `^${escapedSearch.substring(0, 4)}`,
            $options: "i",
          },
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$amount" },
              regex: query.search,
              options: "i",
            },
          },
        },
        // Add other `$expr` cases for numeric fields if necessary
      ],
    };
    Object.assign(matchStage, searchQuery);
  }

  // Add match stage if there are any conditions
  if (Object.keys(matchStage).length > 0) {
    pipeline.push({ $match: matchStage });
  }

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
      }
    );
  }

  // Add a group stage to calculate totals
  pipeline.push({
    $group: {
      _id: null,
      totalExcludingPending: {
        $sum: {
          $cond: [
            { $ne: ["$status", "Pending"] }, // If status is not "Paid"
            "$courseFee",
            0,
          ],
        },
      },
      totalPending: {
        $sum: {
          $cond: [
            { $eq: ["$status", "Pending"] }, // If status is "Paid"
            "$courseFee",
            0,
          ],
        },
      },
    },
  });

  try {
    const result = await commission.aggregate(pipeline);
    return result.length > 0
      ? {
          totalExcludingPending: result[0].totalExcludingPending || 0,
          totalPending: result[0].totalPending || 0,
        }
      : { totalExcludingPending: 0, totalPending: 0 };
  } catch (error) {
    console.error("Aggregation error:", error);
    throw error;
  }
};
