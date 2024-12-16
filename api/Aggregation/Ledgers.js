import Transaction from "../Models/transactionModel.js";
import LiabilityAndOutstanding from "../Models/liabilityModel.js";
import catchAsync from "../Utilities/catchAsync.js";
import mongoose from "mongoose";

export const getAllLedgers = catchAsync(async (req, res, next) => {
  const {
    branchId,
    startDate,
    endDate,
    status,
    catagory,
    page = 1,
    limit = 32,
  } = req.query;

  try {
    // Parse pagination values
    const pageNumber = parseInt(page, 10);
    const pageLimit = parseInt(limit, 10);
    const skip = (pageNumber - 1) * pageLimit;

    if (pageNumber < 1 || pageLimit < 1) {
      return res.status(400).json({
        status: "error",
        message: "Invalid pagination parameters",
      });
    }
    const query = req.query;

    // Base match stages
    const matchStage = {};
    const dateMatch = {};

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

    const catagoryMatch = catagory
      ? { catagory: new mongoose.Types.ObjectId(catagory) }
      : {};

    const branchMatch = branchId
      ? { "branches.branch": new mongoose.Types.ObjectId(branchId) }
      : {};

    // Transaction Aggregation Pipeline
    const transactionPipeline = [
      { $match: catagoryMatch },
      { $match: matchStage },
      { $match: dateMatch },
      { $unwind: { path: "$branches", preserveNullAndEmptyArrays: true } },
      { $match: branchMatch },
      {
        $lookup: {
          from: "particulars",
          let: { particularId: "$particular" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$particularId"] } } },
          ],
          as: "particularInfo",
        },
      },
      {
        $unwind: { path: "$particularInfo", preserveNullAndEmptyArrays: true },
      },
      {
        $addFields: {
          tdsPercentage: {
            $convert: {
              input: {
                $replaceAll: { input: "$tds", find: "%", replacement: "" },
              },
              to: "double",
              onError: 0,
            },
          },
        },
      },
      {
        $addFields: {
          tdsAmount: {
            $cond: {
              if: { $gt: ["$tdsPercentage", 0] },
              then: {
                $multiply: [
                  "$branches.branchTotalAmt",
                  { $divide: ["$tdsPercentage", 100] },
                ],
              },
              else: 0,
            },
          },
        },
      },
      {
        $group: {
          _id: {
            particularId: { $ifNull: ["$particular", null] },
            particularName: { $ifNull: ["$particularInfo.name", "Unknown"] },
            type: { $ifNull: ["$type", "Unknown"] },
            tdsType: "$tdsType",
          },
          total: { $sum: { $ifNull: ["$branches.amount", 0] } },
          totalTds: { $sum: { $ifNull: ["$tdsAmount", 0] } },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: {
            particularId: "$_id.particularId",
            particularName: "$_id.particularName",
          },
          transactions: {
            $push: {
              type: "$_id.type",
              tdsType: "$_id.tdsType",
              total: { $ifNull: ["$total", 0] },
              totalTds: { $ifNull: ["$totalTds", 0] },
              count: { $ifNull: ["$count", 0] },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          particularId: "$_id.particularId",
          particularName: "$_id.particularName",
          totalCredit: {
            $reduce: {
              input: {
                $filter: {
                  input: "$transactions",
                  as: "item",
                  cond: { $eq: ["$$item.type", "Credit"] },
                },
              },
              initialValue: 0,
              in: { $add: ["$$value", "$$this.total"] },
            },
          },
          totalDebit: {
            $reduce: {
              input: {
                $filter: {
                  input: "$transactions",
                  as: "item",
                  cond: { $eq: ["$$item.type", "Debit"] },
                },
              },
              initialValue: 0,
              in: { $add: ["$$value", "$$this.total"] },
            },
          },
          tdsPayable: {
            $reduce: {
              input: {
                $filter: {
                  input: "$transactions",
                  as: "item",
                  cond: { $eq: ["$$item.tdsType", "Payable"] },
                },
              },
              initialValue: 0,
              in: { $add: ["$$value", "$$this.totalTds"] },
            },
          },
          tdsReceivable: {
            $reduce: {
              input: {
                $filter: {
                  input: "$transactions",
                  as: "item",
                  cond: { $eq: ["$$item.tdsType", "Receivable"] },
                },
              },
              initialValue: 0,
              in: { $add: ["$$value", "$$this.totalTds"] },
            },
          },
        },
      },
      {
        $addFields: {
          netAmount: { $subtract: ["$totalCredit", "$totalDebit"] },
        },
      },
    ];

    // Overall Totals Aggregation Pipeline
    const overallTotalsPipeline = [
      { $match: catagoryMatch },
      { $match: matchStage },
      { $match: dateMatch },
      { $unwind: { path: "$branches", preserveNullAndEmptyArrays: true } },
      { $match: branchMatch },
      {
        $group: {
          _id: null,
          totalCredit: {
            $sum: {
              $cond: [
                { $eq: ["$type", "Credit"] },
                { $ifNull: ["$branches.amount", 0] },
                0,
              ],
            },
          },
          totalDebit: {
            $sum: {
              $cond: [
                { $eq: ["$type", "Debit"] },
                { $ifNull: ["$branches.amount", 0] },
                0,
              ],
            },
          },
        },
      },
    ];

    // Liability and Outstanding Aggregation Pipeline
    const liabilityPipeline = [
      { $match: catagoryMatch },
      { $match: { ...dateMatch, status: status || { $ne: "Paid" } } },
      { $unwind: { path: "$branches", preserveNullAndEmptyArrays: true } },
      { $match: branchMatch },
      {
        $lookup: {
          from: "particulars",
          let: { particularId: "$particular" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$particularId"] } } },
          ],
          as: "particularInfo",
        },
      },
      {
        $unwind: { path: "$particularInfo", preserveNullAndEmptyArrays: true },
      },
      {
        $group: {
          _id: null,
          totalLiability: {
            $sum: {
              $cond: [
                { $eq: ["$type", "liability"] },
                { $ifNull: ["$branches.amount", 0] },
                0,
              ],
            },
          },
          totalOutstanding: {
            $sum: {
              $cond: [
                { $eq: ["$type", "outstanding"] },
                { $ifNull: ["$branches.amount", 0] },
                0,
              ],
            },
          },
        },
      },
    ];

    // Liability Details Pipeline
    const liabilityDetailsPipeline = [
      { $match: catagoryMatch },
      { $match: { ...dateMatch, status: status || { $ne: "Paid" } } },
      { $unwind: { path: "$branches", preserveNullAndEmptyArrays: true } },
      { $match: branchMatch },
      {
        $lookup: {
          from: "particulars",
          let: { particularId: "$particular" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$particularId"] } } },
          ],
          as: "particularInfo",
        },
      },
      {
        $unwind: { path: "$particularInfo", preserveNullAndEmptyArrays: true },
      },
      {
        $group: {
          _id: {
            particularId: "$particular",
            particularName: "$particularInfo.name",
            type: "$type",
          },
          total: { $sum: "$branches.amount" },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: {
            particularId: "$_id.particularId",
            particularName: "$_id.particularName",
          },
          amounts: {
            $push: {
              type: "$_id.type",
              total: { $ifNull: ["$total", 0] },
              count: { $ifNull: ["$count", 0] },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          particularId: "$_id.particularId",
          particularName: { $ifNull: ["$_id.particularName", "Unknown"] },
          totalLiability: {
            $reduce: {
              input: {
                $filter: {
                  input: "$amounts",
                  as: "item",
                  cond: { $eq: ["$$item.type", "liability"] },
                },
              },
              initialValue: 0,
              in: { $add: ["$$value", "$$this.total"] },
            },
          },
          totalOutstanding: {
            $reduce: {
              input: {
                $filter: {
                  input: "$amounts",
                  as: "item",
                  cond: { $eq: ["$$item.type", "outstanding"] },
                },
              },
              initialValue: 0,
              in: { $add: ["$$value", "$$this.total"] },
            },
          },
        },
      },
    ];

    // Execute all pipelines
    const [
      transactionData,
      overallTotalsData,
      liabilityTotalsData,
      liabilityDetailsData,
    ] = await Promise.all([
      Transaction.aggregate(transactionPipeline),
      Transaction.aggregate(overallTotalsPipeline),
      LiabilityAndOutstanding.aggregate(liabilityPipeline),
      LiabilityAndOutstanding.aggregate(liabilityDetailsPipeline),
    ]);

    // Extract overall totals
    const overallTotals = {
      totalCredit: overallTotalsData[0]?.totalCredit || 0,
      totalDebit: overallTotalsData[0]?.totalDebit || 0,
      totalLiability: liabilityTotalsData[0]?.totalLiability || 0,
      totalOutstanding: liabilityTotalsData[0]?.totalOutstanding || 0,
    };

    // Combine data by particular
    const particularMap = new Map();

    transactionData.forEach((item) => {
      particularMap.set(item.particularId.toString(), {
        particularId: item.particularId,
        particularName: item.particularName || "Unknown",
        transactions: {
          totalCredit: item.totalCredit || 0,
          totalDebit: item.totalDebit || 0,
          netAmount: item.netAmount || 0,
          tdsPayable: item.tdsPayable || 0,
          tdsReceivable: item.tdsReceivable || 0,
        },
        liabilityOutstanding: {
          totalLiability: 0,
          totalOutstanding: 0,
        },
      });
    });

    liabilityDetailsData.forEach((item) => {
      const key = item.particularId.toString();
      if (!particularMap.has(key)) {
        particularMap.set(key, {
          particularId: item.particularId,
          particularName: item.particularName || "Unknown",
          transactions: {
            totalCredit: 0,
            totalDebit: 0,
            netAmount: 0,
            tdsPayable: 0,
            tdsReceivable: 0,
          },
          liabilityOutstanding: {
            totalLiability: 0,
            totalOutstanding: 0,
          },
        });
      }
      const record = particularMap.get(key);
      record.liabilityOutstanding.totalLiability = item.totalLiability || 0;
      record.liabilityOutstanding.totalOutstanding = item.totalOutstanding || 0;
    });

    // Convert Map to Array and apply pagination
    const particulars = Array.from(particularMap.values()).map((item) => ({
      ...item,
      balance:
        (item.transactions.netAmount || 0) -
        (item.liabilityOutstanding.totalLiability || 0) +
        (item.liabilityOutstanding.totalOutstanding || 0),
    }));

    const totalRecords = particulars.length;
    const paginatedData = particulars.slice(skip, skip + pageLimit);

    res.status(200).json({
      message: "Successfully fetched",
      status: "Success",
      data: {
        totalRecords,
        totalPages: Math.ceil(totalRecords / pageLimit),
        currentPage: pageNumber,
        particulars: paginatedData,
        overallTotals, // Add the overall totals to the response
        liabilityDetails: liabilityDetailsData, // Optional: include full liability details
      },
    });
  } catch (error) {
    console.error("Error in getAllLedgers:", error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Internal server error",
    });
  }
});
