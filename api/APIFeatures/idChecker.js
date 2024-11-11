import mongoose from "mongoose";

export function idChecker(queryObj) {
  if (queryObj.catagory) {
    try {
      queryObj.catagory = mongoose.Types.ObjectId.createFromHexString(
        queryObj.catagory
      );
    } catch (error) {
      console.error("Invalid category ID format:", error.message);
    }
  }

  if (queryObj.particular) {
    try {
      queryObj.particular = mongoose.Types.ObjectId.createFromHexString(
        queryObj.particular
      );
    } catch (error) {
      console.error("Invalid category ID format:", error.message);
    }
  }
  if (queryObj.bank) {
    try {
      queryObj.bank = mongoose.Types.ObjectId.createFromHexString(
        queryObj.bank
      );
    } catch (error) {
      console.error("Invalid category ID format:", error.message);
    }
  }

  return queryObj;
}
