import { Router } from "express";

// Контроллеры
import { login } from "../controllers/auth_controllers.js";
import { register } from "../controllers/auth_controllers.js";
import { verifySession } from "../controllers/auth_controllers.js";
import { logout } from "../controllers/auth_controllers.js";

// Миддлваеры
import { authenticate_session } from "../middlewares.js";

const router = Router()

router.post("/auth/login", (req, res) => {
    login(req, res)
})

router.post("/auth/register", (req, res) => {
    register(req, res)
})

router.post("/auth/verifySession", authenticate_session, (req, res) => {
    verifySession(req, res)
})

router.post("/auth/logout", authenticate_session, (req, res) => {
    logout(req, res)
})

export default router