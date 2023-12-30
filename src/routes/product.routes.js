import { createProduct, fetchAllProducts, fetchProductsByCategory } from "../controllers/product.controller.js";

import { Router } from "express";

const router = Router();

router.route("/add").post(createProduct);
router.route("/get").get(fetchAllProducts);
router.route("/:id").get(fetchProductsByCategory);

export default router;