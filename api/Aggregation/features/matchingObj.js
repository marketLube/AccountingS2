import mongoose from "mongoose";
export function matchField(arr, query, matchStage = {}) {
  // Add other query parameters to match stage
  arr.forEach((field) => {
    if (query[field]) {
      // Validate and convert ObjectId fields
      if (mongoose.Types.ObjectId.isValid(query[field])) {
        matchStage[field] = new mongoose.Types.ObjectId(query[field]);
      } else {
        throw new Error(`${field} is not a valid ObjectId`);
      }
    }
  });

  return matchStage;
}
export function matchDates(query, matchStage = {}) {
  if (query.startDate && query.endDate) {
    const start = new Date(query.startDate);
    const end = new Date(query.endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return next(new Error("Invalid date format for startDate or endDate"));
    }

    start.setUTCHours(0, 0, 0, 0);
    end.setUTCHours(23, 59, 59, 999);

    matchStage.date = { $gte: start, $lte: end };
  }

  return matchStage;
}
