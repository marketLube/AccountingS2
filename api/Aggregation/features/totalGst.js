import catchAsync from "../../Utilities/catchAsync.js";
import Transaction from "../../Models/transactionModel.js";

export const calculateGSTTotals = catchAsync(async (req, res, next) => {
  const totals = await Transaction.aggregate([
    {
      $addFields: {
        // Calculate GST value based on gstPercent
        gstValue: {
          $cond: [
            { $in: ["$gstType", ["incl", "excl"]] }, // Only calculate GST for 'incl' and 'excl'
            {
              $multiply: [
                "$amount",
                { $divide: [{ $toDouble: "$gstPercent" }, 100] },
              ],
            },
            0, // No GST for 'no-gst'
          ],
        },
      },
    },
    {
      $group: {
        _id: "$gstType", // Group by GST type
        totalAmount: {
          $sum: {
            $switch: {
              branches: [
                {
                  case: { $eq: ["$_id", "incl"] },
                  then: { $subtract: ["$amount", "$gstValue"] }, // Remove GST from inclusive
                },
                {
                  case: { $eq: ["$_id", "excl"] },
                  then: { $add: ["$amount", "$gstValue"] }, // Add GST to exclusive
                },
                {
                  case: { $eq: ["$_id", "no-gst"] },
                  then: "$amount", // No adjustment for no-gst
                },
              ],
              default: 0,
            },
          },
        },
      },
    },
    {
      $project: {
        gstType: "$_id",
        totalAmount: 1,
        _id: 0,
      },
    },
  ]);

  res.status(200).json({
    message: "Successfully fetched",
    status: "Success",
    totals,
  });
});
