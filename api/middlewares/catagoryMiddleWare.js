import Catagory from "../Models/catagoryModel.js";
import Particulars from "../Models/particularsModel.js";
import Bank from "../Models/bankModel.js";
import Branch from "../Models/branchModel.js";
import mongoose from "mongoose";

export default async function categoryFilterMiddleware(req, res, next) {
  try {
    console.log("Original query parameters:", req.query);
    console.log("Decoded parameters:", {
      catagory: decodeURIComponent(req.query.catagory || ""),
      particular: decodeURIComponent(req.query.particular || ""),
      branch: decodeURIComponent(req.query.branch || ""),
      bank: decodeURIComponent(req.query.bank || ""),
    });
    // Convert category name to ID if it's not already an ObjectId
    if (req.query.catagory) {
      if (!mongoose.Types.ObjectId.isValid(req.query.catagory)) {
        // It's a name, convert to ID (decode first in case of URL encoding)
        const categoryName = decodeURIComponent(req.query.catagory);
        const catagoryDoc = await Catagory.findOne({
          name: categoryName,
        });
        if (catagoryDoc) {
          req.query.catagory = catagoryDoc._id.toString();
          console.log(
            `Category '${catagoryDoc.name}' converted to ID: ${req.query.catagory}`
          );
        } else {
          console.log(`Category '${req.query.catagory}' not found`);
          delete req.query.catagory; // Category not found, remove filter
        }
      }
    }

    // Convert particular name to ID if it's not already an ObjectId
    if (req.query.particular) {
      if (!mongoose.Types.ObjectId.isValid(req.query.particular)) {
        // It's a name, convert to ID, but consider category context (decode first)
        const particularName = decodeURIComponent(req.query.particular);
        let particularQuery = { name: particularName };

        // If category is also being filtered, ensure particular belongs to that category
        if (req.query.catagory) {
          particularQuery.catagory = req.query.catagory;
        }

        const particularDoc = await Particulars.findOne(particularQuery);
        if (particularDoc) {
          req.query.particular = particularDoc._id.toString();
          console.log(
            `Particular '${particularDoc.name}' converted to ID: ${req.query.particular}`
          );
        } else {
          console.log(
            `Particular '${particularName}' not found${
              req.query.catagory
                ? ` in category ID '${req.query.catagory}'`
                : ""
            }`
          );
          delete req.query.particular; // Particular not found, remove filter
        }
      }
    }

    // Convert bank name to ID if it's not already an ObjectId
    if (req.query.bank) {
      if (!mongoose.Types.ObjectId.isValid(req.query.bank)) {
        // It's a name, convert to ID (decode first)
        const bankName = decodeURIComponent(req.query.bank);
        const bankDoc = await Bank.findOne({ name: bankName });
        if (bankDoc) {
          req.query.bank = bankDoc._id.toString();
        } else {
          delete req.query.bank; // Bank not found, remove filter
        }
      }
    }

    // Convert branch name to ID if it's not already an ObjectId
    if (req.query.branch) {
      if (!mongoose.Types.ObjectId.isValid(req.query.branch)) {
        // It's a name, convert to ID (decode first)
        const branchName = decodeURIComponent(req.query.branch);
        const branchDoc = await Branch.findOne({ name: branchName });
        if (branchDoc) {
          req.query.branchId = branchDoc._id.toString();
          delete req.query.branch; // Remove the original branch parameter
        } else {
          delete req.query.branch; // Branch not found, remove filter
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

    console.log("Processed query parameters:", req.query);
    next();
  } catch (error) {
    console.error("Error in categoryFilterMiddleware:", error);
    next();
  }
}
