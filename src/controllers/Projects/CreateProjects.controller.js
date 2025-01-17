import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { apiErrorHandler } from "../../utils/apiErrorHandler.js";
import { Projects } from "../../models/Projects/Projects.model.js";

// Controller for creating a new project
const CreateProject = asyncHandler(async (req, res, next) => {
      // Destructure fields from request body
      const {
            name,
            description,
            client = "",
            projectType,
            status,
            startDate,
            endDate = null,
            projectManager,
            team,
            budget = 0,
            spent = 0,
            tech,
            notes = "",
            livePreview = null,
            sourceFile = null,
            isActive = true,
            projectImages = [],
      } = req.body;

      // Validate required fields
      if (!name || !description || !projectType || !status || !projectManager || !startDate || !team || !tech) {
            return next(new apiErrorHandler(400, "Please provide all required fields"));
      }

      // Check if a project with the same name already exists
      const existingProject = await Projects.findOne({ name });
      if (existingProject) {
            return next(new apiErrorHandler(400, "Project already exists"));
      }

      // Parse `team` and `tech` if they were sent as strings
      const parsedTeam = typeof team === "string" ? JSON.parse(team) : team;
      const parsedTech = typeof tech === "string" ? JSON.parse(tech) : tech;

      // Create the new project
      const newProject = await Projects.create({
            name,
            description,
            client,
            projectType,
            status,
            startDate,
            endDate,
            projectManager,
            team: Array.isArray(parsedTeam) ? parsedTeam : [parsedTeam], // Save the array of team members directly
            budget,
            spent,
            tech: Array.isArray(parsedTech) ? parsedTech : [parsedTech], // Save the array of tech stack directly
            files: projectImages, // Save the array of Cloudinary image URLs directly
            notes,
            livePreview,
            sourceFile,
            isActive,
      });

      // Send a success response
      return res
            .status(201)
            .json(new apiResponse(201, newProject, "Project created successfully"));
});

export { CreateProject };
