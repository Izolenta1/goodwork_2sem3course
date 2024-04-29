import pool from "./database_controller.js";

export function getAllComments(req, res) {

}

export function addComment(req, res) {
    if (checkValueMinMax(req.body.comment, "отзыва", 50, 1000) != "") {
        return res.status(200).json({ status: 409, payload: checkValueMinMax(req.body.comment, "отзыва", 50, 1000) })
    }

    // pool.execute(`INSERT INTO feedbacks SET user_id = ${pool.escape(req.session_data.user_id)}, vacancy_id = ${pool.escape(req.body.vacancy_id)}`)
    // return res.status(200).json({ status: 200, payload: "Избранная добавлена" })
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