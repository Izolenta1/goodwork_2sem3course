import pool from "./database_controller.js";

export async function dataBaseCheckExisting(table, column, value) {
    return pool.execute(`SELECT user_id FROM ${table} WHERE ${column} = ${pool.escape(value)}`)
}