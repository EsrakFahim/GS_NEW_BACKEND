import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { apiErrorHandler } from "../../utils/apiErrorHandler.js";
import { TeamMember } from "../../models/TeamMember/TeamMember.model.js";

const removeTeamMember = asyncHandler(async (req, res) => {
      const { id } = req.params;

      if (!id) {
            throw new apiErrorHandler(res, 400, "Team member ID is required");
      }


      try {
            const existingTeamMember = await TeamMember.findById(id);

            if (!existingTeamMember) {
                  throw new apiErrorHandler(
                        res,
                        404,
                        "Team member not found or already removed"
                  );
            }

            const deletedTeamMember = await TeamMember.findByIdAndDelete(id);

            if (!deletedTeamMember) {
                  throw new apiErrorHandler(
                        res,
                        500,
                        "Failed to remove team member"
                  );
            }

            return res
                  .status(200)
                  .json(
                        new apiResponse(
                              true,
                              "Team member removed successfully",
                              deletedTeamMember
                        )
                  );
      } catch (error) {
            throw new apiErrorHandler(res, 500, error.message);
      }
});

export { removeTeamMember };
