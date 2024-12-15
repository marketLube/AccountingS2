import LiabilityAndOutstanding from "../Models/liabilityModel.js";
import Transaction from "../Models/transactionModel.js";
import catchAsync from "../Utilities/catchAsync.js";

export const balanceSheet = catchAsync(async (req, res, next) => {
  // Aggregate income and expenses for each month
  const balanceSheetStats = await Transaction.aggregate([
    {
      // Match transactions that fall within the current year
      $match: {
        date: {
          $gte: new Date(new Date().getFullYear(), 0, 1),
          $lte: new Date(new Date().getFullYear(), 11, 31),
        },
      },
    },
    {
      // Group transactions by month
      $group: {
        _id: { month: { $month: "$date" } },
        income: {
          $sum: {
            $cond: [{ $eq: ["$type", "Credit"] }, "$amount", 0],
          },
        },
        expense: {
          $sum: {
            $cond: [{ $eq: ["$type", "Debit"] }, "$amount", 0],
          },
        },
      },
    },
    {
      // Project fields for clarity and format
      $project: {
        _id: 0,
        month: "$_id.month",
        income: 1,
        expense: 1,
      },
    },
    {
      // Sort by month to ensure ordered output
      $sort: { month: 1 },
    },
  ]);

  // Calculate total liability and outstanding for each month
  const liabilityStats = await LiabilityAndOutstanding.aggregate([
    {
      // Match liabilities that fall within the current year
      $match: {
        date: {
          $gte: new Date(new Date().getFullYear(), 0, 1), // Start of current year
          $lte: new Date(new Date().getFullYear(), 11, 31), // End of current year
        },
      },
    },
    {
      // Group liabilities by month
      $group: {
        _id: { month: { $month: "$date" } }, // Group by month extracted from date
        liability: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$type", "liability"] },
                  { $ne: ["$status", "Paid"] },
                ],
              },
              "$amount",
              0,
            ],
          },
        },
        outstanding: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$type", "outstanding"] },
                  { $ne: ["$status", "Paid"] },
                ],
              },
              "$amount",
              0,
            ],
          },
        },
      },
    },
    {
      // Project fields for clarity and format
      $project: {
        _id: 0,
        month: "$_id.month",
        liability: 1,
        outstanding: 1,
      },
    },
    {
      // Sort by month to ensure ordered output
      $sort: { month: 1 },
    },
  ]);

  // Initialize all 12 months with zero values
  const allMonths = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    income: 0,
    expense: 0,
    liability: 0,
    outstanding: 0,
    profit: 0,
  }));

  // Merge the aggregated data into allMonths to ensure all months are included
  const result = allMonths.map((monthData) => {
    const foundMonth = balanceSheetStats.find(
      (data) => data.month === monthData.month
    );
    const foundLiabilityMonth = liabilityStats.find(
      (data) => data.month === monthData.month
    );

    // Calculate income, expense, liability, and outstanding
    const income = foundMonth ? foundMonth.income : 0;
    const expense = foundMonth ? foundMonth.expense : 0;
    const liability = foundLiabilityMonth ? foundLiabilityMonth.liability : 0;
    const outstanding = foundLiabilityMonth
      ? foundLiabilityMonth.outstanding
      : 0;

    // Calculate profit as income - expense
    const profit = income - expense;

    return {
      ...monthData,
      income,
      expense,
      liability,
      outstanding,
      profit,
    };
  });

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formattedResult = result.map((item) => ({
    month: monthNames[item.month - 1],
    income: item.income,
    expense: item.expense,
    liability: item.liability,
    outstanding: item.outstanding,
    profit: item.profit,
  }));

  // Get the current month index (0 = January, 11 = December)
  const currentMonthIndex = new Date().getMonth();

  // Rearrange the months to start with the current month and go backward
  const sortedResult = [
    ...formattedResult.slice(0, currentMonthIndex + 1).reverse(), // From start of the year up to the current month, reversed
    ...formattedResult.slice(currentMonthIndex + 1).reverse(), // From current month onward, reversed
  ];
  res.status(200).json({
    status: "Success",
    message: "Successfully fetched",
    formattedResult: sortedResult,
  });
});
