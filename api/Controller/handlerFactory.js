// handlerFactory.js
import catchAsync from "../Utilities/catchAsync.js";
import AppError from "../Utilities/appError.js";
import APIFeatures from "../APIFeatures/APIFeatures.js";
import { idChecker } from "../APIFeatures/idChecker.js";
import totalChecker from "../APIFeatures/totalChecker.js";

export const getAll = (Model) => {
  return catchAsync(async (req, res, next) => {
    idChecker(req.query);

    let filter = {};
    const features = new APIFeatures(Model, Model.find(filter), req.query);

    features
      .filter()
      .sort()
      .limitFields()
      .paginate(await Model.countDocuments())
      .filterByBranch()
      .filterByDateRange()
      .gstType()
      .search();

    const docs = await features.query;
    const total = await totalChecker(Model, req);

    res.status(200).json({
      status: "success",
      results: docs.length,
      summery: total,
      data: docs,
    });
  });
};

export const getOne = (Model, type = "id") => {
  return catchAsync(async (req, res, next) => {
    const validTypes = ["id", "email", "phone"];
    if (!validTypes.includes(type)) {
      return next(new AppError(`Invalid identifier type: ${type}`, 400));
    }

    let query;
    switch (type) {
      case "id":
        query = Model.findById(req.params.id);
        break;
      case "email":
        query = Model.findOne({ email: req.params.email });
        break;
      case "phone":
        query = Model.findOne({ phone: req.params.phone });
        break;
    }

    const data = await query.select("-password");

    if (!data) {
      return next(new AppError(`No document found with this ${type}`, 404));
    }

    res.status(200).json({
      status: "success",
      data,
    });
  });
};

export const createOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    if (!doc) {
      return next(new AppError("Failed to create document", 400));
    }

    res.status(201).json({
      status: "success",
      data: doc,
    });
  });
};

export const updateOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
};

export const deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
};
