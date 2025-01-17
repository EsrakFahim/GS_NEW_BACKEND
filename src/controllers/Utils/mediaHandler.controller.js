import { apiErrorHandler } from "../../utils/apiErrorHandler.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadFileCloudinary } from "../../FileHandler/Upload.js";

const mediaUploader = asyncHandler(async (req, res) => {

      console.log(req.files);
      // Check if project image is uploaded
      const uploadedMediaPath = req.files.media[0].path;

      if (!uploadedMediaPath)
            throw new apiErrorHandler(
                  400,
                  "Validation Error",
                  "Please upload an image or video file"
            );

      const mediaUploaded =
            await uploadFileCloudinary(uploadedMediaPath);

      if (!mediaUploaded)
            throw new apiErrorHandler(
                  500,
                  "Internal Server Error",
                  "Error uploading an image or video file"
            );

      return res
            .status(200)
            .json(
                  new apiResponse(
                        200,
                        mediaUploaded,
                        "Media uploaded successfully"
                  )
            );
});

export { mediaUploader };