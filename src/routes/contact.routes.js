import { Router } from "express";
import { createContact } from "../controllers/Contact/Contact.controllers.js";
import { getContact } from "../controllers/Contact/ContactGet.controllers.js";
import { updateContact } from "../controllers/Contact/updateContact.controller.js";


const router = Router();

router.route("/social").post(createContact);
router.route("/social").get(getContact);
router.route("/social/update/:id").put(updateContact);



export default router;