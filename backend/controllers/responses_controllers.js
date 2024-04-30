import pool from "./database_controller.js";

export async function getResponseByID(req, res) {
    let checkResponseRes = (await pool.execute(`SELECT * FROM responses WHERE user_id = ${pool.escape(req.session_data.user_id)} AND vacancy_id = ${pool.escape(req.query.vacancy_id)}`))[0][0]
    return res.status(200).json({ status: 200, payload: checkResponseRes })
}

export async function getVacancyResponses(req, res) {
    let checkResponseRes = (await pool.execute(`SELECT t1.*, t2.*, t3.username
                                                FROM responses t1
                                                LEFT JOIN resumes t2
                                                ON t1.user_id = t2.user_id
                                                LEFT JOIN users t3
                                                ON t1.user_id = t3.user_id
                                                WHERE t1.vacancy_id = ${req.query.vacancy_id}`))[0]
    return res.status(200).json({ status: 200, payload: checkResponseRes })
}

export async function addResponse(req, res) {
    let checkResponseRes = await pool.execute(`SELECT * FROM responses WHERE user_id = ${pool.escape(req.session_data.user_id)} AND vacancy_id = ${pool.escape(req.body.vacancy_id)}`)
    let checkResumeRes = await pool.execute(`SELECT * FROM resumes WHERE user_id = ${pool.escape(req.session_data.user_id)}`)

    if (checkResumeRes[0].length == 0) {
        return res.status(200).json({ status: 200, payload: "Нет резюме" })
    }

    if (checkResponseRes[0].length != 0) {
        pool.execute(`DELETE FROM responses WHERE user_id = ${pool.escape(req.session_data.user_id)} AND vacancy_id = ${pool.escape(req.body.vacancy_id)}`)
        return res.status(200).json({ status: 200, payload: "Отклик удален" })
    }
    else {
        pool.execute(`INSERT INTO responses SET user_id = ${pool.escape(req.session_data.user_id)}, vacancy_id = ${pool.escape(req.body.vacancy_id)}`)
        return res.status(200).json({ status: 200, payload: "Отклик добавлен" })
    }
}