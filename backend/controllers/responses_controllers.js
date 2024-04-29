import pool from "./database_controller.js";

export async function getResponseByID(req, res) {
    let checkResponseRes = (await pool.execute(`SELECT * FROM responses WHERE user_id = ${pool.escape(req.session_data.user_id)} AND vacancy_id = ${pool.escape(req.query.vacancy_id)}`))[0][0]
    return res.status(200).json({ status: 200, payload: checkResponseRes })
}

export function getVacancyResponses(req, res) {

}

export async function addResponse(req, res) {
    let checkResponseRes = await pool.execute(`SELECT * FROM responses WHERE user_id = ${pool.escape(req.session_data.user_id)} AND vacancy_id = ${pool.escape(req.body.vacancy_id)}`)

    if (checkResponseRes[0].length != 0) {
        pool.execute(`DELETE FROM responses WHERE user_id = ${pool.escape(req.session_data.user_id)} AND vacancy_id = ${pool.escape(req.body.vacancy_id)}`)
        return res.status(200).json({ status: 200, payload: "Отклик удален" })
    }
    else {
        pool.execute(`INSERT INTO responses SET user_id = ${pool.escape(req.session_data.user_id)}, vacancy_id = ${pool.escape(req.body.vacancy_id)}`)
        return res.status(200).json({ status: 200, payload: "Отклик добавлен" })
    }
}