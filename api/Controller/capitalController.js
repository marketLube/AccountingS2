import Capital from "../Models/capitalModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";

export const getAllCapital = getAll(Capital);
export const getCapital = getOne(Capital);
export const createCapital = createOne(Capital);
export const updateCapital = updateOne(Capital);
export const deleteCapital = deleteOne(Capital);
