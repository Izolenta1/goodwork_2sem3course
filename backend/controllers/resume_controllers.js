import pool from "./database_controller.js";

export async function getUserResume(req, res) {
    let user_resume = (await pool.execute(`SELECT * from resumes WHERE user_id = ${pool.escape(req.session_data.user_id)}`))[0][0]
    return res.status(200).json({status: 200, payload: user_resume})
}

export async function saveUserResume(req, res) {
    if (req.body.email.length == 0) {
        return res.status(200).json({status: 411, payload: "Длина почты должна быть больше 0"})
    }

    if (req.body.description.length == 0) {
        return res.status(200).json({status: 411, payload: "Длина резюме должна быть больше 0"})
    }

    if (req.body.email.length > 255) {
        return res.status(200).json({status: 409, payload: "Длина email не должна быть больше 255 символов"})
    }

    if (req.body.description.length > 50000) {
        return res.status(200).json({status: 409, payload: "Длина резюме не должна быть больше 50000 символов"})
    }

    if (regCheckEmail(req.body.email) != "") {
        return res.status(200).json({status: 409, payload: regCheckEmail(req.body.email)})
    }

    pool.execute(`INSERT INTO resumes SET email = ${pool.escape(req.body.email)}, description = ${pool.escape(req.body.description)}, user_id = ${pool.escape(req.session_data.user_id)}
                ON DUPLICATE KEY UPDATE email = ${pool.escape(req.body.email)}, description = ${pool.escape(req.body.description)}, user_id = ${pool.escape(req.session_data.user_id)}`)

    return res.status(200).json({status: 200, payload: "Резюме успешно сохранено"})
}







function regCheckEmail(email) {
    let emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    if (!emailRegex.test(email)) {
        return "Введите корректную почту"
    }
    return ""
}