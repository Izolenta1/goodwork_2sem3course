import { Router } from "express";

// Контроллеры
import { getVacancyById } from "../controllers/vacancy_controllers.js";
import { getAllVacancies } from "../controllers/vacancy_controllers.js";
import { getUserVacancies } from "../controllers/vacancy_controllers.js";
import { addVacancy } from "../controllers/vacancy_controllers.js";
import { updateVacancy } from "../controllers/vacancy_controllers.js";
import { deleteVacancy } from "../controllers/vacancy_controllers.js";

// Миддлваеры
import { authenticate_session, checkRole } from "../middlewares.js";

const router = Router()

router.get("/api/vacancy/getVacancyById", (req, res) => {
    getVacancyById(req, res)
})

router.get("/api/vacancy/getAllCavancies", (req, res) => {
    getAllVacancies(req, res)
})

router.get("/api/vacancy/getUserVacancies", authenticate_session, checkRole("employer"), (req, res) => {
    getUserVacancies(req, res)
})

router.post("/api/vacancy/addVacancy", authenticate_session, checkRole("employer"), (req, res) => {
    addVacancy(req, res)
})

router.post("/api/vacancy/updateVacancy", authenticate_session, checkRole("employer"), (req, res) => {
    updateVacancy(req, res)
})

router.post("/api/vacancy/deleteVacancy", authenticate_session, checkRole("employer"), (req, res) => {
    deleteVacancy(req, res)
})

export default router