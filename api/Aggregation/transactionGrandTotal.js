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

  // Add match stage if there are any conditions
  if (Object.keys(matchStage).length > 0) {
    pipeline.push({ $match: matchStage });
  }

  if (branchId) {
    pipeline.push(
      // Unwind branches array to work with individual branch entries
      { $unwind: "$branches" },
      // Match specific branch
      {
        $match: {
          "branches.branch": new mongoose.Types.ObjectId(branchId),
        },
      },
      // Add calculated amount based on type
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
      // Group to sum the calculated amounts
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
    // For non-branch specific calculations
    pipeline.push(
      // Add calculated amount based on type
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
      // Group to sum the calculated amounts
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
    throw error;
  }
};
