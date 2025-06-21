import Catagory from "../Models/catagoryModel.js";
import Particulars from "../Models/particularsModel.js";
import Bank from "../Models/bankModel.js";
import mongoose from "mongoose";

export default async function categoryFilterMiddleware(req, res, next) {
  try {
    // Convert category name to ID if it's not already an ObjectId
    if (req.query.catagory) {
      if (!mongoose.Types.ObjectId.isValid(req.query.catagory)) {
        // It's a name, convert to ID
        const catagoryDoc = await Catagory.findOne({
          name: req.query.catagory,
        });
        if (catagoryDoc) {
          req.query.catagory = catagoryDoc._id.toString();
        } else {
          req.query.catagory = null; // Category not found
        }
      }
    }

    // Convert particular name to ID if it's not already an ObjectId
    if (req.query.particular) {
      if (!mongoose.Types.ObjectId.isValid(req.query.particular)) {
        // It's a name, convert to ID
        const particularDoc = await Particulars.findOne({
          name: req.query.particular,
        });
        if (particularDoc) {
          req.query.particular = particularDoc._id.toString();
        } else {
          req.query.particular = null; // Particular not found
        }
      }
    }

    // Convert bank name to ID if it's not already an ObjectId
    if (req.query.bank) {
      if (!mongoose.Types.ObjectId.isValid(req.query.bank)) {
        // It's a name, convert to ID
        const bankDoc = await Bank.findOne({ name: req.query.bank });
        if (bankDoc) {
          req.query.bank = bankDoc._id.toString();
        } else {
          req.query.bank = null; // Bank not found
        }
      }
    }

    next();
  } catch (error) {
    console.error("Error in categoryFilterMiddleware:", error);
    next();
  }
}
