import mongoose from "mongoose";
import Events from "../Models/eventModel.js";

export const budgetPlannerTotal = async (req) => {
  const { branch } = req.query;

  const filter = branch ? { branch: new mongoose.Types.ObjectId(branch) } : {};
  const events = await Events.find(filter);

  const total = events.reduce((acc, val) => val.amount + acc, 0);

  return { total };
};
