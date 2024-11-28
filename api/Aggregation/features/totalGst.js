import Transaction from "@/api/Models/transactionModel";
import catchAsync from "@/api/Utilities/catchAsync.js";

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
    const startDate = new Date(query.startDate);
    const endDate = new Date(query.endDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error("Invalid date format for startDate or endDate");
    }

    startDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCHours(23, 59, 59, 999);

    matchStage.date = {
      $gte: startDate,
      $lte: endDate,
    };
  }

  // Add other query parameters to match stage
  ["type", "catagory", "particular", "bank", "gstType"].forEach((field) => {
    if (query[field]) {
      if (["catagory", "particular", "bank"].includes(field)) {
        matchStage[field] = new mongoose.Types.ObjectId(query[field]);
      } else {
        matchStage[field] = query[field];
      }
    }
  });

  // Additional Filters
  if (query.minAmount) {
    matchStage.amount = matchStage.amount || {};
    matchStage.amount.$gte = Number(query.minAmount);
  }

  if (query.maxAmount) {
    matchStage.amount = matchStage.amount || {};
    matchStage.amount.$lte = Number(query.maxAmount);
  }

  if (query.tdsType) {
    matchStage.tdsType = query.tdsType;
  }

  if (query.gstPercent) {
    matchStage.gstPercent = query.gstPercent;
  }

  // Search query for text-based fields
  if (query.search && typeof query.search === "string" && query.search.trim()) {
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
          $expr: {
            $regexMatch: {
              input: { $toString: "$amount" },
              regex: query.search,
              options: "i",
            },
          },
        },
      ],
    };

    Object.assign(matchStage, searchQuery);
  }

  // Add match stage if there are any conditions
  if (Object.keys(matchStage).length > 0) {
    pipeline.push({ $match: matchStage });
  }

  // Branch-specific calculations
  if (branchId) {
    pipeline.push(
      { $unwind: "$branches" },
      {
        $match: {
          "branches.branch": mongoose.Types.ObjectId(branchId),
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

  // Execute pipeline
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
