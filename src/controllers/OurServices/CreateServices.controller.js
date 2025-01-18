import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { apiErrorHandler } from "../../utils/apiErrorHandler.js";
import { OurServices } from "../../models/OurServices/OurServices.model.js";

const CreateServices = asyncHandler(async (req, res, next) => {
      try {
            // Destructure fields from the request body
            let {
                  title,
                  subtitle, // Coming from frontend
                  description,
                  serviceType,
                  status,
                  includingServices,
                  isFeatured,
                  showcaseImages,
                  coverImage,
            } = req.body;

            // Map subtitle to subTitle for schema compatibility
            const subTitle = subtitle;

            // Validate required fields
            if (
                  !title ||
                  !subTitle ||
                  !description ||
                  !serviceType ||
                  !status ||
                  !includingServices ||
                  isFeatured === undefined
            ) {
                  return next(
                        new apiErrorHandler(res, 400, "Please provide all required fields")
                  );
            }

            // Validate images
            if (!coverImage || !Array.isArray(showcaseImages) || showcaseImages.length === 0) {
                  return next(
                        new apiErrorHandler(
                              res,
                              400,
                              "Please provide a cover image and at least one showcase image"
                        )
                  );
            }

            // Prepare the service object
            const serviceData = {
                  title,
                  subTitle, // Mapped field
                  description,
                  serviceType,
                  status,
                  includingServices,
                  isFeatured,
                  showcaseImages,
                  coverImage,
            };

            // Attempt to create the service in the database
            const service = await OurServices.create(serviceData);

            if (!service) {
                  return next(
                        new apiErrorHandler(res, 500, "Failed to create the service")
                  );
            }

            // Return success response
            return res
                  .status(201)
                  .json(
                        new apiResponse(201, "Service created successfully", service)
                  );
      } catch (error) {
            console.error("Error in CreateServices controller:", error); // Log error for debugging
            return next(new apiErrorHandler(res, 500, "Server error"));
      }
});

export { CreateServices };
