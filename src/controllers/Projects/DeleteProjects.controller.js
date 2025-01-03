import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { apiErrorHandler } from "../../utils/apiErrorHandler.js";
import { Projects } from "../../models/Projects/Projects.model.js";
import mongoose from "mongoose";

const deleteProjects = asyncHandler(async (req, res) => {
      const { id } = req.params; // Get project ID from request params

      try {
            const project = await Projects.findByIdAndDelete(new mongoose.Types.ObjectId(id));

            if (!project) {
                  throw new apiErrorHandler(res, 404, "Project not found");
            }

            return res
                  .status(200)
                  .json(
                        new apiResponse(
                              200,
                              project,
                              "Project deleted successfully"
                        )
                  );
      } catch (error) {
            throw new apiErrorHandler(500, error.message);
      }
});

export { deleteProjects };
