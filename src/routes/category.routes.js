import { createCategory, fetchAllCategories, fetchCategory } from "../controllers/catergory.controller.js";

import { Router } from "express";

const router = Router();

router.route("/add").post(createCategory);
router.route("/get").get(fetchAllCategories);
router.route("/:id").get(fetchCategory);

export default router;