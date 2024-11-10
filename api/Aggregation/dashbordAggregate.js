import Transaction from "../Models/transactionModel.js";
import LiabilityAndOutstanding from "../Models/liabilityModel.js";
import catchAsync from "../Utilities/catchAsync.js";

export const getTotals = catchAsync(async (req, res, next) => {
  const { thisMonth } = req.query;

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
      result.transactions.totalCredit = item.total;
    } else if (item.type === "Debit") {
      result.transactions.totalDebit = item.total;
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
