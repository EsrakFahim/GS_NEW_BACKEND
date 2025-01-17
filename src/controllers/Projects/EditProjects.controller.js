import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { apiErrorHandler } from "../../utils/apiErrorHandler.js";
import { Projects } from "../../models/Projects/Projects.model.js";

const EditProject = asyncHandler(async (req, res, next) => {
      try {
            const { id } = req.params; // Get project ID from request params

            const {
                  name,
                  description,
                  client,
                  projectType,
                  status,
                  startDate,
                  endDate,
                  projectManager,
                  team,
                  budget,
                  spent,
                  tech,
                  notes,
                  livePreview,
                  sourceFile,
                  isActive,
                  projectImages, // Array of image objects with URLs
            } = req.body;

            // Check if the project with the given ID exists
            const existingProject = await Projects.findById(id);
            if (!existingProject) {
                  throw new apiErrorHandler(404, "Project not found");
            }

            // Create an object to hold only the fields that need updating
            const updatedFields = {};

            if (name && name !== existingProject.name) updatedFields.name = name;
            if (description && description !== existingProject.description)
                  updatedFields.description = description;
            if (client && client !== existingProject.client)
                  updatedFields.client = client;
            if (projectType && projectType !== existingProject.projectType)
                  updatedFields.projectType = projectType;
            if (status && status !== existingProject.status)
                  updatedFields.status = status;
            if (startDate && startDate !== existingProject.startDate)
                  updatedFields.startDate = startDate;
            if (endDate && endDate !== existingProject.endDate)
                  updatedFields.endDate = endDate;
            if (projectManager && projectManager !== existingProject.projectManager)
                  updatedFields.projectManager = projectManager;
            if (team && JSON.stringify(team) !== JSON.stringify(existingProject.team))
                  updatedFields.team = Array.isArray(team) ? team : [team];
            if (budget !== undefined && budget !== existingProject.budget)
                  updatedFields.budget = budget;
            if (spent !== undefined && spent !== existingProject.spent)
                  updatedFields.spent = spent;
            if (tech && JSON.stringify(tech) !== JSON.stringify(existingProject.tech))
                  updatedFields.tech = Array.isArray(tech) ? tech : [tech];
            if (notes && notes !== existingProject.notes) updatedFields.notes = notes;
            if (livePreview && livePreview !== existingProject.livePreview)
                  updatedFields.livePreview = livePreview;
            if (sourceFile && sourceFile !== existingProject.sourceFile)
                  updatedFields.sourceFile = sourceFile;
            if (isActive !== undefined && isActive !== existingProject.isActive)
                  updatedFields.isActive = isActive;
            if (
                  projectImages &&
                  JSON.stringify(projectImages) !==
                  JSON.stringify(existingProject.files || [])
            ) {
                  updatedFields.files = projectImages; // Update project images
            }

            // If no fields need updating, return the existing project
            if (Object.keys(updatedFields).length === 0) {
                  return res
                        .status(200)
                        .json(
                              new apiResponse(200, "No changes detected", existingProject)
                        );
            }

            // Update the project with the new fields
            const updatedProject = await Projects.findByIdAndUpdate(
                  id,
                  updatedFields,
                  { new: true }
            );

            // Send the updated project data as the response
            return res
                  .status(200)
                  .json(
                        new apiResponse(200, "Project updated successfully", updatedProject)
                  );
      } catch (error) {
            throw new apiErrorHandler(500, error.message || "Server Error");
      }
});

export { EditProject };
