import Transaction from "../Models/transactionModel.js";
import LiabilityAndOutstanding from "../Models/liabilityModel.js";
import catchAsync from "../Utilities/catchAsync.js";
import Branch from "../Models/branchModel.js";

export const getTotals = catchAsync(async (req, res, next) => {
  const { thisMonth, branch } = req.query;

  // Calculate current month's date range
  let dateFilter = {};
  if (thisMonth?.toLowerCase() === "yes") {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    dateFilter = {
      date: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    };
  }

  const [transactionTotals, liabilityOutstandingTotals] = await Promise.all([
    // Transaction aggregation
    Transaction.aggregate([
      {
        $facet: {
          creditDebitTotals: [
            {
              $match: dateFilter,
            },
            {
              $group: {
                _id: "$type",
                total: { $sum: "$amount" },
              },
            },
            {
              $project: {
                _id: 0,
                type: "$_id",
                total: 1,
              },
            },
          ],
        },
      },
    ]),

    // Liability and Outstanding aggregation
    LiabilityAndOutstanding.aggregate([
      {
        $facet: {
          liabilityOutstandingTotals: [
            {
              $match: {
                ...dateFilter, // Include your date filter if applicable
                status: { $ne: "Paid" }, // Exclude entries with status "Paid"
              },
            },
            {
              $group: {
                _id: "$type",
                total: { $sum: "$amount" },
              },
            },
            {
              $project: {
                _id: 0,
                type: "$_id",
                total: 1,
              },
            },
          ],
        },
      },
    ]),
  ]);

  // Process the results
  const result = {
    transactions: {
      totalCredit: 0,
      totalDebit: 0,
    },
    liabilityAndOutstanding: {
      totalLiability: 0,
      totalOutstanding: 0,
    },
  };

  // Process transaction totals
  transactionTotals[0].creditDebitTotals.forEach((item) => {
    if (item.type === "Credit") {
      result.transactions.totalCredit = Math.abs(item.total);
    } else if (item.type === "Debit") {
      result.transactions.totalDebit = Math.abs(item.total);
    }
  });

  // Process liability and outstanding totals
  liabilityOutstandingTotals[0].liabilityOutstandingTotals.forEach((item) => {
    if (item.type === "liability") {
      result.liabilityAndOutstanding.totalLiability = item.total;
    } else if (item.type === "outstanding") {
      result.liabilityAndOutstanding.totalOutstanding = item.total;
    }
  });

  res
    .status(200)
    .json({ status: "Success", message: "Successfully fetched", result });
});

export const getBranchTotalsForChart = catchAsync(async (req, res, next) => {
  const { thisMonth } = req.query;

  // Calculate current month's date range if needed
  let dateFilter = {};
  if (thisMonth?.toLowerCase() === "yes") {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    dateFilter = {
      date: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    };
  }

  const branchTotals = await Branch.aggregate([
    // First match active branches
    {
      $match: {
        isActive: true,
      },
    },
    // Lookup transactions for each branch
    {
      $lookup: {
        from: "transactions",
        let: { branchId: "$_id" },
        pipeline: [
          {
            $match: {
              $and: [
                {
                  $expr: {
                    $in: ["$$branchId", "$branches.branch"],
                  },
                },
                dateFilter, // This will be empty if isMonthAll is not "yes"
              ],
            },
          },
          {
            $unwind: "$branches",
          },
          {
            $match: {
              $expr: {
                $eq: ["$branches.branch", "$$branchId"],
              },
            },
          },
        ],
        as: "branchTransactions",
      },
    },
    // Calculate totals for each branch
    {
      $project: {
        name: 1,
        totalBranchBalance: 1,
        totalCredit: {
          $reduce: {
            input: {
              $filter: {
                input: "$branchTransactions",
                as: "transaction",
                cond: { $eq: ["$$transaction.type", "Credit"] },
              },
            },
            initialValue: 0,
            in: { $add: ["$$value", "$$this.branches.amount"] },
          },
        },
        totalExpense: {
          $reduce: {
            input: {
              $filter: {
                input: "$branchTransactions",
                as: "transaction",
                cond: { $eq: ["$$transaction.type", "Debit"] },
              },
            },
            initialValue: 0,
            in: { $add: ["$$value", "$$this.branches.amount"] },
          },
        },
      },
    },
    // Add calculated profit field
    {
      $addFields: {
        profit: {
          $subtract: ["$totalCredit", "$totalExpense"],
        },
      },
    },
    // Sort by branch name
    {
      $sort: {
        name: 1,
      },
    },
    // Calculate grand totals
    {
      $group: {
        _id: null,
        branches: {
          $push: {
            name: "$name",
            totalCredit: "$totalCredit",
            totalExpense: "$totalExpense",
            profit: "$profit",
            totalBranchBalance: "$totalBranchBalance",
          },
        },
        grandTotalCredit: { $sum: "$totalCredit" },
        grandTotalExpense: { $sum: "$totalExpense" },
        grandTotalProfit: { $sum: "$profit" },
      },
    },
    // Final project to structure the response
    {
      $project: {
        _id: 0,
        branches: 1,
        summary: {
          grandTotalCredit: "$grandTotalCredit",
          grandTotalExpense: "$grandTotalExpense",
          grandTotalProfit: "$grandTotalProfit",
        },
      },
    },
  ]);

  const result = branchTotals[0] || {
    branches: [],
    summary: {
      grandTotalCredit: 0,
      grandTotalExpense: 0,
      grandTotalProfit: 0,
    },
  };

  res.status(200).json({
    status: "success",
    message:
      thisMonth?.toLowerCase() === "yes"
        ? "Current month totals fetched successfully"
        : "All time totals fetched successfully",
    data: result,
  });
});
