import { addToCart, getCart, removeFromCart } from "../controllers/cart.controller.js";

import { Router } from "express";

const router = Router();

router.route("/add").post(addToCart);
router.route("/:userId").post(getCart);
router.route("/remove").delete(removeFromCart);

export default router;