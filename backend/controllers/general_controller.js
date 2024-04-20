export async function dataBaseCheckExisting(table, column, value) {
    return pool.execute(`SELECT id FROM ${table} WHERE ${column} = ${pool.escape(value)}`)
}