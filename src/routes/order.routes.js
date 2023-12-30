import { createOrder, fetchAllOrders, updateOrderStatus } from "../controllers/order.controller.js";

import { Router } from "express";

const router = Router();

router.route("/create").post(createOrder);
router.route("/:user").get(fetchAllOrders);
router.route("/updateStatus").put(updateOrderStatus);

export default router;