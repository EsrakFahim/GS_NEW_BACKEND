import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { apiErrorHandler } from "../../utils/apiErrorHandler.js";
import { OurServices } from "../../models/OurServices/OurServices.model.js";
import mongoose from "mongoose";

const DeleteService = asyncHandler(async (req, res, next) => {
      try {
            const id = req.params.id;

            console.log(id);

            // Check if service ID is provided
            if (!id) {
                  throw new apiErrorHandler(res, 400, "Service ID is required");
            }

            // Check if the service with the given ID exists
            const existingService = await OurServices.findById(id);

            if (!existingService) {
                  throw new apiErrorHandler(
                        res,
                        404,
                        "Service not found or already deleted"
                  );
            }

            // Delete the service
            await OurServices.findByIdAndDelete(new mongoose.Types.ObjectId(id));

            return res
                  .status(200)
                  .json(
                        new apiResponse(200, "Service deleted successfully", {})
                  );
      } catch (error) {
            throw new apiErrorHandler(res, 500, error.message);
      }
});

export { DeleteService };
