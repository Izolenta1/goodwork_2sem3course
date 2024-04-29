import pool from "./database_controller.js";

export async function getAllComments(req, res) {
    let comments = (await pool.execute(`SELECT t1.*, t2.username
                                        FROM feedbacks t1
                                        LEFT JOIN users t2
                                        ON t1.user_id = t2.user_id
                                        WHERE t1.vacancy_id = ${req.query.vacancy_id}`))[0]
    return res.status(200).json({ status: 200, payload: comments })
}

export async function addComment(req, res) {
    if (checkValueMinMax(req.body.comment, "отзыва", 50, 1000) != "") {
        return res.status(200).json({ status: 409, payload: checkValueMinMax(req.body.comment, "отзыва", 50, 1000) })
    }

    const insertID = (await pool.execute(`INSERT INTO feedbacks SET comment = ${pool.escape(req.body.comment)}, user_id = ${pool.escape(req.session_data.user_id)}, vacancy_id = ${pool.escape(req.body.vacancy_id)}`))[0].insertId
    return res.status(200).json({ status: 200, payload: {feedback_id: insertID, comment: req.body.comment, username: req.session_data.username} })
}





// Вспомогательные функции
function checkValueMinMax(value, name, min, max) {
    if (value.length < min) {
        return `Длина поля ${name} не должна быть меньше ${min}`
    }
    if (value.length > max) {
        return `Длина поля ${name} не должна быть больше ${max}`
    }

    return ""
}