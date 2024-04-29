import { Router } from "express";

// Контроллеры
import { getResponseByID } from "../controllers/responses_controllers.js";
import { getVacancyResponses } from "../controllers/responses_controllers.js";
import { addResponse } from "../controllers/responses_controllers.js";

// Миддлваеры
import { authenticate_session, checkRole } from "../middlewares.js";

const router = Router()

router.get("/api/response", authenticate_session, (req, res) => {
    getResponseByID(req, res)
})

router.get("/api/vacancy/response", authenticate_session, checkRole("employer"), (req, res) => {
    getVacancyResponses(req, res)
})

router.post("/api/response", authenticate_session, (req, res) => {
    addResponse(req ,res)
})

export default router