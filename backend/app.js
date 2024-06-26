import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

import auth_routes from "./routes/auth_routes.js"
import resume_routes from "./routes/resume_routes.js";
import vacancy_router from "./routes/vacancy_routes.js";
import responses_router from "./routes/responses_routes.js";
import favourites_routes from "./routes/favourites_routes.js";
import feedback_routes from "./routes/feedback_routes.js";

/**
 * Переменная, содержащая объект сервера
 */
const app = express();

app.use(express.json());
app.use(cookieParser())

let cors_options = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200,
    methods: "GET, POST"
}
app.use(cors(cors_options))

// Подключение маршрутов
app.use(auth_routes)
app.use(resume_routes)
app.use(vacancy_router)
app.use(responses_router)
app.use(favourites_routes)
app.use(feedback_routes)

/**
 * Номер порта
 * @type {int}
 */
const PORT = 3001;

/**
 * @name listen
 * @description
 * Вызов функции запуска сервера
 */
app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);