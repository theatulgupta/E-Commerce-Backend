import { createAccount, signIn } from "../controllers/user.controller.js";

import { Router } from "express";

const router = Router();

router.route("/createAccount").post(createAccount);
router.route("/signIn").post(signIn);

export default router;