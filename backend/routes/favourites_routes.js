import { Router } from "express";

// Контроллеры
import { getFavouriteByID } from "../controllers/favourites_controllers.js";
import { getUserFavourites } from "../controllers/favourites_controllers.js";
import { addFavourite } from "../controllers/favourites_controllers.js";

// Миддлваеры
import { authenticate_session, checkRole } from "../middlewares.js";

const router = Router()

router.get("/api/favourite", authenticate_session, (req, res) => {
    getFavouriteByID(req, res)
})

router.get("/api/vacancy/favourite", authenticate_session, checkRole("employee"), (req, res) => {
    getUserFavourites(req, res)
})

router.post("/api/favourite", authenticate_session, checkRole("employee"), (req, res) => {
    addFavourite(req, res)
})

export default router