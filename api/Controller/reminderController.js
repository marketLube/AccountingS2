import Reminder from "../Models/remindersModel.js";
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "./handlerFactory.js";

import { reminderReport } from "./Reports/reminderReport.js";
import catchAsync from "../Utilities/catchAsync.js";
import AppError from "../Utilities/appError.js";
import APIFeatures from "../APIFeatures/APIFeatures.js";

export const downloadReminder = catchAsync(async (req, res, next) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return next(new AppError("Please provide start and end dates", 400));
  }
  const features = new APIFeatures(Reminder, Reminder.find({}), req.query);

  features.filter().sort().filterByBranch().filterByDateRange();

  const reminders = await features.query;

  const filteredReminders = reminders.map((obj) => {
    const plainObj = obj.toObject();
    plainObj.catagory = plainObj.catagory.name;
    plainObj.particular = plainObj.particular.name;
    plainObj.branch = plainObj.branchName;
    delete plainObj.updatedAt;
    delete plainObj.createdAt;
    delete plainObj._id;
    delete plainObj.remark;
    return plainObj;
  });

  reminderReport(filteredReminders, res, startDate, endDate);
});

export const getAllReminder = getAll(Reminder);
export const getReminder = getOne(Reminder);
export const createReminder = createOne(Reminder);
export const updateReminder = updateOne(Reminder);
export const deleteReminder = deleteOne(Reminder);
