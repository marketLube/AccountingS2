import mongoose from "mongoose";
import Capital from "../Models/capitalModel.js";

export const getCapitalGrandTotal = async (req) => {
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
    // Parse dates and set to the start of the day for startDate and end of the day for endDate
    const startDate = new Date(query.startDate);
    const endDate = new Date(query.endDate);

    // Validate the dates
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error("Invalid date format for startDate or endDate");
    }

    // Ensure startDate is set to the start of the day
    startDate.setUTCHours(0, 0, 0, 0);

    // Ensure endDate is set to the end of the day
    endDate.setUTCHours(23, 59, 59, 999);

    // Build the matchStage query

    matchStage.date = {
      $gte: startDate,
      $lte: endDate,
    };
  }

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
        { invested: { $regex: searchRegex } },
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
    const result = await Capital.aggregate(pipeline);
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
