import bcrypt, { hash } from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

import { dataBaseCheckExisting } from "./general_controller.js";
import pool from "./database_controller.js";

/**
 * @description Функция для логина пользователя
 * @param {object} req - Объект запроса
 * @param {object} res - Объекта ответа
 */
export async function login(req, res) {
    if (req.body.username.length == 0) {
        return res.status(200).json({status: 411, payload: "Длина логина должна быть больше 0"})
    }

    if (req.body.password.length == 0) {
        return res.status(200).json({status: 411, payload: "Длина пароля должна быть больше 0"})
    }

    let checkUsernameRes
    await dataBaseCheckExisting("users", "username", req.body.username).then(function(result) {
        checkUsernameRes = result[0][0]
    })
    if (checkUsernameRes == null) {
        return res.status(200).json({status: 409, payload: "Неправильный логин или пароль"})
    }

    const hashedpassDBraw = await pool.execute(`SELECT password FROM users WHERE username = ${pool.escape(req.body.username)}`)
    const hashedpassDB = hashedpassDBraw[0][0].password

    try {
        if (await bcrypt.compare(req.body.password, hashedpassDB)) {
            let user_data = (await pool.execute(`SELECT user_id from users WHERE username = ${pool.escape(req.body.username)}`))[0][0]
            let user_id = user_data.user_id
            let session_id = uuidv4()
            pool.execute(`INSERT INTO sessions SET uuid = ${pool.escape(session_id)}, user_id = ${pool.escape(user_id)}`)
            
            res.cookie("goodwork_session", session_id, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 1000 * 60 * 259200
            })
            return res.status(200).json({status: 200, payload: {user_id: user_id, username: user_data.username, role: user_data.role}})
        }
        else {
            return res.status(200).json({status: 401, payload: "Неправильный логин или пароль"})
        }
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({status: 500, payload: "Ошибка сервера"})
    }
}

/**
 * @description Функция для регистрации пользователя
 * @param {object} req - Объект запроса
 * @param {object} res - Объекта ответа
 */
export async function register(req, res) {
    let checkUsernameRes
    await dataBaseCheckExisting("users", "username", req.body.username).then(function(result) {
        checkUsernameRes = result[0][0]
    })
    if (checkUsernameRes != null) {
        return res.status(200).json({status: 409, payload: "Данный логин уже существует"})
    }

    if (regCheckUsername(req.body.username) != "") {
        return res.status(200).json({status: 409, payload: regCheckUsername(req.body.username)})
    }
    if (req.body.password != req.body.repeated) {
        return res.status(200).json({status: 409, payload: "Пароли не совпадают"})
    }
    if (regCheckPassword(req.body.password) != "") {
        return res.status(200).json({status: 409, payload: regCheckPassword(req.body.password)})
    }
    if (regCheckPassword(req.body.repeated) != "") {
        return res.status(200).json({status: 409, payload: regCheckPassword(req.body.repeated)})
    }
    if (req.body.role != "employee" && req.body.role != "employer") {
        return res.status(200).json({status: 409, payload: "Не выбрана роль"})
    }

    try {
        const hashedpass = await bcrypt.hash(req.body.password, 10)
        let insertID = (await pool.execute(`INSERT INTO users (username, password, role) VALUES (${pool.escape(req.body.username)}, ${pool.escape(hashedpass)}, ${pool.escape(req.body.role)});`))[0].insertId

        let session_id = uuidv4()
        pool.execute(`INSERT INTO sessions SET uuid = ${pool.escape(session_id)}, user_id = ${pool.escape(insertID)}`)

        res.cookie("goodwork_session", session_id, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 259200
        })
        return res.status(200).json({status: 200, payload: "Аккаунт успешно создан"})
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({status: 500, payload: "Ошибка сервера"})
    }
}

/**
 * @description Функция для верификации сессии
 * @param {object} req - Объект запроса
 * @param {object} res - Объекта ответа
 */
export async function verifySession(req, res) {
    let payload = {
        user_id: req.session_data.user_id,
        username: req.session_data.username,
        role: req.session_data.role
    }
    return res.status(200).json({status: 200, payload: payload})
}

/**
 * @description Функция для выхода из аккаунт (удаление сессии из куки)
 * @param {object} req - Объект запроса
 * @param {object} res - Объекта ответа
 */
export function logout(req, res) {
    pool.execute(`DELETE FROM sessions WHERE uuid = ${pool.escape(req.session_id)}`)
    res.clearCookie("goodwork_session")
    return res.status(200).json({status: 200, payload: "Session deleted"})
}






/**
 * @description Функция для проверки логина пользователя
 * @param {string} username - Строка пользователя
 */
function regCheckUsername(username) {
    let usernameRegex = /^[a-zA-Z][a-zA-Z0-9-_]+$/;
    if (!usernameRegex.test(username)) {
        return "Логин должен содержать только латинские буквы"
    }
    if (!(username.length <= 20)) {
        return "Логин должен быть не длинее 20 символов"
    }
    if (!(username.length > 3)) {
        return "Логин должен быть не короче 3 символов"
    }
    return ""
}

/**
 * @description Функция для проверки пароля
 * @param {string} password - Строка пароля
 */
function regCheckPassword(password) {
    if (!(password.length > 6)) {
        return "Длина пароля должна быть больше 6 символов"
    }
    if (password.length > 64) {
        return "Длина пароля не должна быть больше 64 символов"
    }
    return ""
}

/**
 * @description Функция для получения информации по id сессии. Экспортируется в middleware
 * @param {string} session_id - Строка сессии
 */
export async function getSessionInfo(session_id) {
    let user_data = (await pool.execute(`SELECT sessions.*, users.username, users.role FROM sessions JOIN users ON sessions.user_id = users.user_id WHERE sessions.uuid = ${pool.escape(session_id)}`))[0][0]
    return user_data
}