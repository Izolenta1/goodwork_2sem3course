import express from "express";
import cookieParser from "cookie-parser";

import auth_routes from "./routes/auth_routes.js"

/**
 * Переменная, содержащая объект сервера
 */
const app = express();

app.use(express.json());
app.use(cookieParser())

app.use(auth_routes)

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