import pool from "./database_controller.js";

export async function getFavouriteByID(req, res) {
    let checkFavouriteRes = (await pool.execute(`SELECT * FROM favourites WHERE user_id = ${pool.escape(req.session_data.user_id)} AND vacancy_id = ${pool.escape(req.query.vacancy_id)}`))[0][0]
    return res.status(200).json({ status: 200, payload: checkFavouriteRes })
}

export function getUserFavourites(req, res) {

}

export async function addFavourite(req, res) {
    let checkFavouriteRes = await pool.execute(`SELECT * FROM favourites WHERE user_id = ${pool.escape(req.session_data.user_id)} AND vacancy_id = ${pool.escape(req.body.vacancy_id)}`)

    if (checkFavouriteRes[0].length != 0) {
        pool.execute(`DELETE FROM favourites WHERE user_id = ${pool.escape(req.session_data.user_id)} AND vacancy_id = ${pool.escape(req.body.vacancy_id)}`)
        return res.status(200).json({ status: 200, payload: "Избранная удалена" })
    }
    else {
        pool.execute(`INSERT INTO favourites SET user_id = ${pool.escape(req.session_data.user_id)}, vacancy_id = ${pool.escape(req.body.vacancy_id)}`)
        return res.status(200).json({ status: 200, payload: "Избранная добавлена" })
    }
}