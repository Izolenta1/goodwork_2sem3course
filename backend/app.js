/**
 * @namespace backend.app
 * @memberOf backend
 * @description
 * Модуль, содержащий методы для запуска сервера приложения
 */

import express from "express";

/**
 * Переменная, содержащая объект сервера
 */
const app = express();

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