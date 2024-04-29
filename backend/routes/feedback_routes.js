import { Router } from "express";

// Контроллеры
import { getAllComments } from "../controllers/feedback_controllers.js";
import { addComment } from "../controllers/feedback_controllers.js";

// Миддлваеры
import { authenticate_session, checkRole } from "../middlewares.js";

const router = Router()

router.get("/api/vacancy/feedback", (req, res) => {
    getAllComments(req, res)
})

router.post("/api/vacancy/feedback", authenticate_session, checkRole("employee"), (req, res) => {
    addComment(req, res)
})

export default router