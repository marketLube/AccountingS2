import Transaction from "../Models/transactionModel.js";
import mongoose from "mongoose";

export const getTransactionTotal = async (req) => {
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
  ["type", "catagory", "particular", "bank", "gstType"].forEach((field) => {
    if (query[field]) {
      // Convert to ObjectId if needed
      if (["catagory", "particular", "bank"].includes(field)) {
        matchStage[field] = new mongoose.Types.ObjectId(query[field]);
      } else {
        matchStage[field] = query[field];
      }
    }
  });

  // Build the search query if `search` is provided
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
        { gstPercent: { $regex: searchRegex } },
        { gstType: { $regex: searchRegex } },
        { tds: { $regex: searchRegex } },
        { tdsType: { $regex: searchRegex } },
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

  if (branchId) {
    pipeline.push(
      { $unwind: "$branches" },
      {
        $match: {
          "branches.branch":
            mongoose.Types.ObjectId.createFromHexString(branchId),
        },
      },
      {
        $addFields: {
          calculatedAmount: {
            $cond: {
              if: { $eq: ["$type", "Credit"] },
              then: "$branches.amount",
              else: { $multiply: ["$branches.amount", -1] },
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$calculatedAmount" },
          totalCredit: {
            $sum: {
              $cond: [{ $eq: ["$type", "Credit"] }, "$branches.amount", 0],
            },
          },
          totalDebit: {
            $sum: {
              $cond: [{ $eq: ["$type", "Debit"] }, "$branches.amount", 0],
            },
          },
        },
      }
    );
  } else {
    pipeline.push(
      {
        $addFields: {
          calculatedAmount: {
            $cond: {
              if: { $eq: ["$type", "Credit"] },
              then: "$amount",
              else: { $multiply: ["$amount", -1] },
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$calculatedAmount" },
          totalCredit: {
            $sum: {
              $cond: [{ $eq: ["$type", "Credit"] }, "$amount", 0],
            },
          },
          totalDebit: {
            $sum: {
              $cond: [{ $eq: ["$type", "Debit"] }, "$amount", 0],
            },
          },
        },
      }
    );
  }

  try {
    const result = await Transaction.aggregate(pipeline);
    return result.length > 0
      ? {
          totalAmount: result[0].totalAmount,
          totalCredit: result[0].totalCredit,
          totalDebit: result[0].totalDebit,
        }
      : {
          totalAmount: 0,
          totalCredit: 0,
          totalDebit: 0,
        };
  } catch (error) {
    console.error("Aggregation error:", error);
  }
};
