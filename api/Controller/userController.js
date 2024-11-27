import express from "express";
import { deleteOne, getAll, getOne, updateOne } from "./handlerFactory.js";
import User from "../Models/userModel.js";

const router = express.Router();

export const getAllUsers = getAll(User);
export const getUser = getOne(User);
export const updateUser = updateOne(User);
export const deleteUser = deleteOne(User);

export default router;
