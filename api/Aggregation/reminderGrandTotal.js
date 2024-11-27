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

  // Add other query parameters to match stage
  ["type", "catagory", "particular", "adminstatus", "accountstatus"].forEach(
    (field) => {
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
    }
  );

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
            { $ne: ["$accountstatus", "Paid"] }, // If accountstatus is not "Paid"
            "$amount",
            0,
          ],
        },
      },
      totalPaid: {
        $sum: {
          $cond: [
            { $eq: ["$accountstatus", "Paid"] }, // If accountstatus is "Paid"
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
