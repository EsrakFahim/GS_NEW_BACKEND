
import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { apiErrorHandler } from "../../utils/apiErrorHandler.js";
import { Contact } from "../../models/Contact/contact.model.js";

/**
 * Update contact data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateContact = asyncHandler(async (req, res) => {
      try {
            const { id } = req.params; // Assuming the contact ID is passed in the URL
            const updates = req.body; // Fields to update

            console.log("Updating contact with ID:", id, "updates:", updates);

            // Validate the updates object
            if (!Object.keys(updates).length) {
                  throw new apiErrorHandler(400, "No updates provided.");
            }

            // Fetch the existing contact
            const existingContact = await Contact.findById(id);

            if (!existingContact) {
                  throw new apiErrorHandler(404, "Contact not found.");
            }

            // Update only the fields that have changed
            Object.keys(updates).forEach((key) => {
                  if (existingContact[key] !== updates[key]) {
                        existingContact[key] = updates[key];
                  }
            });

            // Save the updated contact
            const updatedContact = await existingContact.save();

            return res
                  .status(200)
                  .json(
                        new apiResponse(
                              200,
                              updatedContact,
                              "Contact updated successfully",
                        )
                  );
      } catch (error) {
            console.error("Error updating contact:", error);
            throw new apiErrorHandler(500, "Error updating contact.");
      }
});


export { updateContact };