import APIFeatures from "../APIFeatures/APIFeatures.js";
import Liability from "../Models/liabilityModel.js"; // Corrected spelling from Liablity to Liability
import AppError from "../Utilities/appError.js";
import catchAsync from "../Utilities/catchAsync.js";

import {
  getAll,
  getOne,
  updateOne,
  createOne,
  deleteOne,
} from "./handlerFactory.js";
import { liabilityReport } from "./Reports/liabilityReport.js";

export const downloadLiability = catchAsync(async (req, res, next) => {
  const { type } = req.query;
  const text = type === "liability" ? "Liability" : "Outstanding";
  const { startDate, endDate } = req.query;
  if (!startDate || !endDate) {
    return next(new AppError("Please provide start and end date", 400));
  }
  const features = new APIFeatures(Liablity, Liablity.find({}), req.query);

  features.filter().sort().filterByBranch().filterByDateRange();

  const liability = await features.query;

  const filteredLiability = liability.map((obj) => {
    const plainObj = obj.toObject();
    plainObj.catagory = plainObj.catagory.name;
    plainObj.particular = plainObj.particular.name;
    delete plainObj.updatedAt;
    delete plainObj.createdAt;
    delete plainObj._id;
    delete plainObj.remark;
    return plainObj;
  });
  if (!liability) {
    return next(new AppError("Liability not found", 404));
  }
  liabilityReport(filteredLiability, res, startDate, endDate, text);
});

export const getTotal = catchAsync(async (req, res, next) => {
  const statsArr = await Liability.aggregate([
    {
      $group: {
        _id: null, // Required to use _id, set to null if not grouping by a field
        totalOutstanding: {
          $sum: {
            $cond: [{ $eq: ["$type", "outstanding"] }, "$amount", 0], // Sum amounts where type is outstanding
          },
        },
        totalLiability: {
          $sum: {
            $cond: [{ $eq: ["$type", "liability"] }, "$amount", 0], // Sum amounts where type is liability
          },
        },
      },
    },
  ]);
  const stats = statsArr[0] || {};

  res.status(200).json({
    status: "Success",
    message: "Successfully fetched the total details",
    liability: stats?.totalLiability,
    outstanding: stats?.totalOutstanding,
  });
});

export const getAllLiability = getAll(Liability);
export const getLiability = getOne(Liability);
export const updateLiability = updateOne(Liability);
export const createLiability = createOne(Liability);
export const deleteLiability = deleteOne(Liability);
