import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { apiErrorHandler } from "../../utils/apiErrorHandler.js";
import { OurServices } from "../../models/OurServices/OurServices.model.js";
import mongoose from "mongoose";

const DeleteService = asyncHandler(async (req, res, next) => {
      try {
            const { id } = req.params;

            console.log("Received ID:", id);

            // Check if service ID is provided
            if (!id) {
                  throw new apiErrorHandler(400, "Service ID is required");
            }

            // Validate the ID format
            if (!mongoose.Types.ObjectId.isValid(id)) {
                  throw new apiErrorHandler(400, "Invalid Service ID");
            }

            // Check if the service with the given ID exists
            const existingService = await OurServices.findById(id);

            console.log("Existing service:", existingService);

            if (!existingService) {
                  throw new apiErrorHandler(404, "Service not found or already deleted");
            }

            // Delete the service
            await OurServices.findByIdAndDelete(id);

            return res
                  .status(200)
                  .json(new apiResponse(200, "Service deleted successfully", {}));
      } catch (error) {
            console.error("Error deleting service:", error);
            throw new apiErrorHandler(500, "Error deleting service");
      }
});

export { DeleteService };
