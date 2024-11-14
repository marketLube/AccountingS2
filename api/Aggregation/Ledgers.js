import Transaction from "../Models/transactionModel.js";
import LiabilityAndOutstanding from "../Models/liabilityModel.js";
import catchAsync from "../Utilities/catchAsync.js";
import mongoose from "mongoose";

export const getAllLedgers = catchAsync(async (req, res, next) => {
  const { branchId, startDate, endDate, status } = req.query;

  try {
    // Base match stages
    const dateMatch = {};
    if (startDate && endDate) {
      dateMatch.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const branchMatch = branchId
      ? { "branches.branch": new mongoose.Types.ObjectId(branchId) }
      : {};

    // Transaction Aggregation Pipeline
    const transactionPipeline = [
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
        $group: {
          _id: {
            particularId: { $ifNull: ["$particular", null] },
            particularName: { $ifNull: ["$particularInfo.name", "Unknown"] },
            type: { $ifNull: ["$type", "Unknown"] },
          },
          total: { $sum: { $ifNull: ["$branches.amount", 0] } },
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
        },
      },
      {
        $addFields: {
          netAmount: { $subtract: ["$totalCredit", "$totalDebit"] },
        },
      },
    ];

    // Liability and Outstanding Aggregation Pipeline
    const liabilityPipeline = [
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

    // Execute both pipelines separately
    const transactionData = await Transaction.aggregate(transactionPipeline);
    const liabilityData = await LiabilityAndOutstanding.aggregate(
      liabilityPipeline
    );

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
        },
        liabilityOutstanding: {
          totalLiability: 0,
          totalOutstanding: 0,
        },
      });
    });

    liabilityData.forEach((item) => {
      const key = item.particularId.toString();
      if (!particularMap.has(key)) {
        particularMap.set(key, {
          particularId: item.particularId,
          particularName: item.particularName || "Unknown",
          transactions: {
            totalCredit: 0,
            totalDebit: 0,
            netAmount: 0,
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

    res.status(200).json({
      message: "Successfully fetched",
      status: "Success",
      data: {
        particulars: Array.from(particularMap.values()).map((item) => ({
          ...item,
          balance:
            (item.transactions.netAmount || 0) -
            (item.liabilityOutstanding.totalLiability || 0) +
            (item.liabilityOutstanding.totalOutstanding || 0),
        })),
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
