import bcrypt, { hash } from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

import { dataBaseCheckExisting } from "./general_controller.js";
import pool from "./database_controller.js";

export async function login(req, res) {
    if (req.body.login.length == 0) {
        return res.status(200).json({status: 411, payload: "Login length must be more than 0"})
    }

    if (req.body.password.length == 0) {
        return res.status(200).json({status: 411, payload: "Password length must be more than 0"})
    }

    let checkLoginNVRes
    await dataBaseCheckExisting("usersnv", "login", req.body.login).then(function(result) {
        checkLoginNVRes = result[0][0]
    })
    if (checkLoginNVRes != null) {
        return res.status(200).json({status: 409, payload: "Login exist in not verified"})
    }

    let checkLoginRes
    await dataBaseCheckExisting("users", "login", req.body.login).then(function(result) {
        checkLoginRes = result[0][0]
    })
    if (checkLoginRes == null) {
        return res.status(200).json({status: 409, payload: "Login does not exist"})
    }

    const hashedpassDBraw = await pool.execute(`SELECT hashedpass FROM users WHERE login = ${pool.escape(req.body.login)}`)
    const hashedpassDB = hashedpassDBraw[0][0].hashedpass

    try {
        if (await bcrypt.compare(req.body.password, hashedpassDB)) {
            let user_data = (await pool.execute(`SELECT id from users WHERE login = ${pool.escape(req.body.login)}`))[0][0]
            let user_id = user_data.id
            let session_id = uuidv4()
            pool.execute(`INSERT INTO sessions SET id = ${pool.escape(session_id)}, user_id = ${pool.escape(user_id)}`)
            
            res.cookie("mna_session", session_id, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 1000 * 60 * 259200
            })
            return res.status(200).json({status: 200, payload: {id: user_id, login: user_data.login, role: user_data.roleonsite}})
        }
        else {
            return res.status(200).json({status: 401, payload: "Wrong password"})
        }
    }
    catch (e) {
        logger.fatal(e, true)
        return res.status(200).json({status: 500, payload: "Server error"})
    }
}

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
    if (regCheckPassword(req.body.password) != "") {
        return res.status(200).json({status: 409, payload: regCheckPassword(req.body.password)})
    }
    if (regCheckPassword(req.body.passwordRepeat) != "") {
        return res.status(200).json({status: 409, payload: regCheckPassword(req.body.passwordRepeat)})
    }
    if (req.body.role != "employee" || req.body.role != "employer") {
        return res.status(200).json({status: 409, payload: "Не выбрана роль"})
    }
    if (req.body.password != req.body.passwordRepeat) {
        return res.status(200).json({status: 409, payload: "Пароли не совпадают"})
    }

    try {
        const hashedpass = await bcrypt.hash(req.body.password, 10)
        pool.execute(`INSERT INTO users (username, password, role) VALUES (${pool.escape(req.body.username)}, ${pool.escape(hashedpass)}, ${pool.escape(req.body.role)});`)

        // let user_data = (await pool.execute(`SELECT id from users WHERE login = ${pool.escape(req.body.login)}`))[0][0]
        // let user_id = user_data.id
        // let session_id = uuidv4()
        // pool.execute(`INSERT INTO sessions SET id = ${pool.escape(session_id)}, user_id = ${pool.escape(user_id)}`)

        // res.cookie("goodwork_session", session_id, {
        //     httpOnly: true,
        //     sameSite: "strict",
        //     maxAge: 1000 * 60 * 259200
        // })
        return res.status(200).json({status: 200, payload: "Аккаунт успешно создан"})
    }
    catch {
        return res.status(200).json({status: 500, payload: "Ошибка сервера"})
    }
}

export async function verifySession(req, res) {
    pool.execute(`UPDATE sessions SET created_at = CURRENT_TIMESTAMP() WHERE id = ${pool.escape(req.session_id)}`)
    let payload = {
        id: req.tokenData.id,
        user: req.tokenData.user,
        role: req.tokenData.role
    }
    return res.status(200).json({status: 200, payload: payload})
}

export function logout(req, res) {
    pool.execute(`DELETE FROM sessions WHERE id = ${pool.escape(req.session_id)}`)
    res.clearCookie("mna_session")
    return res.status(200).json({status: 200, payload: "Session deleted"})
}







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

function regCheckPassword(password) {
    if (!(password.length > 6)) {
        return "Длина пароля должна быть больше 6 символов"
    }
    return ""
}