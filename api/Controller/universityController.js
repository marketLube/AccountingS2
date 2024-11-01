import University from "../Models/universityModel.js";
import catchAsync from "../Utilities/catchAsync.js";
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "./handlerFactory.js";

export const getTotalReceivable = catchAsync(async (req, res, next) => {
  const stats = await University.aggregate([
    {
      $facet: {
        totalReceived: [
          {
            $match: { status: "Received" }, // Match "Received" status
          },
          {
            $group: {
              _id: null,
              total: {
                $sum: {
                  $multiply: [
                    { $divide: ["$commition", 100] }, // Divide commition by 100
                    "$courseFee", // Multiply by courseFee
                  ],
                },
              },
            },
          },
        ],
        totalPending: [
          {
            $match: { status: { $ne: "Received" } }, // Not equal to "Received"
          },
          {
            $group: {
              _id: null,
              total: {
                $sum: {
                  $multiply: [
                    { $divide: ["$commition", 100] }, // Divide commition by 100
                    "$courseFee", // Multiply by courseFee
                  ],
                },
              },
            },
          },
        ],
      },
    },
  ]);

  // Send the result as a response
  res.status(200).json({
    status: "success",
    data: {
      totalReceived: stats[0].totalReceived[0]?.total || 0, // Total received
      totalPending: stats[0].totalPending[0]?.total || 0, // Total pending
    },
  });
});

export const getAllUniv = getAll(University);
export const getUniversity = getOne(University);
export const updateUniversity = updateOne(University);
export const createUniversity = createOne(University);
export const deleteUniversity = deleteOne(University);
