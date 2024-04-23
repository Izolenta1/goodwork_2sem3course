import { Router } from "express";

import { getUserResume } from "../controllers/resume_controllers.js";
import { saveUserResume } from "../controllers/resume_controllers.js";
import { authenticate_session, checkRole } from "../middlewares.js";

const router = Router()

router.get("/api/resume", authenticate_session, checkRole("employee"), (req, res) => {
    getUserResume(req, res)
})

router.post("/api/resume", authenticate_session, checkRole("employee"), (req, res) => {
    saveUserResume(req, res)
})

export default router