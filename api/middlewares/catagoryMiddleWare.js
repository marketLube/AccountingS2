import Catagory from "../Models/catagoryModel.js";
import Particulars from "../Models/particularsModel.js";
import Bank from "../Models/bankModel.js";
import Branch from "../Models/branchModel.js";
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

    // Convert branch name to ID if it's not already an ObjectId
    if (req.query.branch) {
      if (!mongoose.Types.ObjectId.isValid(req.query.branch)) {
        // It's a name, convert to ID
        const branchDoc = await Branch.findOne({ name: req.query.branch });
        if (branchDoc) {
          req.query.branchId = branchDoc._id.toString();
          delete req.query.branch; // Remove the original branch parameter
        } else {
          req.query.branchId = null; // Branch not found
          delete req.query.branch;
        }
      } else {
        // It's already an ObjectId, just rename the parameter
        req.query.branchId = req.query.branch;
        delete req.query.branch;
      }
    }

    // Fix GST parameter naming mismatch
    if (req.query.gst) {
      req.query.gstType = req.query.gst;
      delete req.query.gst;
    }

    next();
  } catch (error) {
    console.error("Error in categoryFilterMiddleware:", error);
    next();
  }
}
