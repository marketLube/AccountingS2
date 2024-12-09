import LiabilityAndOutstanding from "../Models/liabilityModel.js";
import mongoose from "mongoose";
import { matchDates, matchField } from "./features/matchingObj.js";

export const getLiabilityOutstandingTotal = async (req) => {
  const query = { ...req.query };
  const branchId = req.query.branchId;

  delete query.page;
  delete query.limit;

  // Base pipeline for filtering
  const pipeline = [];

  // Match stage based on query parameters
  const matchStage = {};
  const matchingArr = ["catagory", "particular"];

  matchField(matchingArr, req.query, matchStage);
  matchDates(query, matchStage);
  matchStage.type = query.type;

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
        { purpose: { $regex: searchRegex } },
        { remark: { $regex: searchRegex } },
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
    const result = await LiabilityAndOutstanding.aggregate(pipeline);
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
