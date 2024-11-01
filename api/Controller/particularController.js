import Particulars from "../Models/particularsModel.js";
import {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
} from "./handlerFactory.js";

export const getAllParticulars = getAll(Particulars);
export const getParticulars = getOne(Particulars);
export const createParticulars = createOne(Particulars);
export const deleteParticulars = deleteOne(Particulars);
export const updateParticulars = updateOne(Particulars);
