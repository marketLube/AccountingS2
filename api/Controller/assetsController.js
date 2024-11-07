import Assets from "../Models/assetsModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";

export const getAllAssets = getAll(Assets);
export const getAssets = getOne(Assets);
export const createAssets = createOne(Assets);
export const updateAssets = updateOne(Assets);
export const deleteAssets = deleteOne(Assets);
