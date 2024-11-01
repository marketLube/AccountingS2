import Events from "../Models/eventModel.js";
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "./handlerFactory.js";

export const getAllEvents = getAll(Events);
export const getEvent = getOne(Events);
export const createEvent = createOne(Events);
export const updateEvent = updateOne(Events);
export const deleteEvent = deleteOne(Events);
