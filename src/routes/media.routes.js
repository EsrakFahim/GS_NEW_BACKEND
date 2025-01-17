import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { mediaUploader } from "../controllers/Utils/mediaHandler.controller.js";

const router = Router();

router.route("/upload").post(
      upload.fields([
            {
                  name: "media", // The key expected in the form data
                  maxCount: 1, // Limits the number of files to 1
            },
      ]),
      mediaUploader // Controller handling the logic for project upload
);

export default router;