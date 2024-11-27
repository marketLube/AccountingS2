import mongoose from "mongoose";
import Events from "../Models/eventModel.js";

export const budgetPlannerTotal = async (req) => {
  const { branch, search } = req.query;

  const filter = {};

  // Add branch filter if specified
  if (branch) {
    filter.branch = new mongoose.Types.ObjectId(branch);
  }

  // Add search filter if specified
  if (search && typeof search === "string" && search.trim() !== "") {
    const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const searchRegex = new RegExp(search, "i");

    // Build the search query
    const searchQuery = {
      $or: [
        { formattedDate: { $regex: searchRegex } },
        { property: { $regex: searchRegex } },
        { purpose: { $regex: searchRegex } },
        { remark: { $regex: searchRegex } },
        { type: { $regex: searchRegex } },
        {
          status: {
            $regex: `^${escapedSearch.substring(0, 4)}`,
            $options: "i",
          },
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$amount" },
              regex: search,
              options: "i",
            },
          },
        },
      ],
    };

    Object.assign(filter, searchQuery); // Combine search filter with other filters
  }

  // Query the database
  const events = await Events.find(filter);

  // Calculate the total
  const total = events.reduce((acc, val) => val.amount + acc, 0);

  return { total };
};
