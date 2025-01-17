import { asyncHandler } from "../../../utils/asyncHandler.js";
import { apiResponse } from "../../../utils/apiResponse.js";
import { apiErrorHandler } from "../../../utils/apiErrorHandler.js";
import { About } from "../../../models/Pages/About/About.model.js";

// Controller to edit an existing About entry
const editAboutItems = asyncHandler(async (req, res) => {
      const {
            title,
            description,
            whyWeTitle,
            whyWeDescription,
            benefits,
            isActive,
            whyWeImage,
            images,
      } = req.body;

      try {
            // Find the existing About entry
            const existingAbout = await About.findOne();
            if (!existingAbout) {
                  throw new apiErrorHandler(404, "About page entry not found.");
            }

            // Update fields only if new values are provided
            existingAbout.title = title || existingAbout.title;
            existingAbout.description = description || existingAbout.description;
            existingAbout.whyWeTitle = whyWeTitle || existingAbout.whyWeTitle;
            existingAbout.whyWeDescription = whyWeDescription || existingAbout.whyWeDescription;

            // Update benefits array only if provided
            if (benefits) {
                  // Update existing benefits or add new ones
                  const updatedBenefits = benefits.map((benefit) => {
                        // If `_id` exists, find and update the matching benefit
                        const existingBenefit = existingAbout.benefits.find(
                              (b) => b._id.toString() === benefit._id
                        );
                        if (existingBenefit) {
                              return {
                                    ...existingBenefit.toObject(),
                                    ...benefit, // Override existing fields with new values
                              };
                        }
                        // If `_id` does not exist, add it as a new benefit
                        return benefit;
                  });

                  existingAbout.benefits = updatedBenefits;
            }

            // Update images array only if provided
            if (images) {
                  // Replace the existing images with the provided array
                  existingAbout.images = images;
            }

            // Update whyWeImage if provided
            if (whyWeImage) {
                  existingAbout.whyWeImage = whyWeImage;
            }

            // Update isActive field if provided
            if (isActive !== undefined) {
                  existingAbout.isActive = isActive;
            }

            // Save the updated About entry
            const updatedAbout = await existingAbout.save();

            // Send success response
            return res
                  .status(200)
                  .json(
                        new apiResponse(
                              200,
                              updatedAbout,
                              "About item updated successfully."
                        )
                  );
      } catch (error) {
            // Handle any errors that occur during the process
            throw new apiErrorHandler(500, error.message);
      }
});

export { editAboutItems };
