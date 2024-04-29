import { dataBaseCheckExisting } from "./general_controller.js"
import pool from "./database_controller.js";

export async function getVacancyById(req, res) {
    const vacancy = (await pool.execute(`SELECT * FROM vacancy WHERE vacancy_id = ${pool.escape(req.query.vacancy_id)}`))[0][0]
    return res.status(200).json({ status: 200, payload: vacancy })
}

export async function getAllVacancies(req, res) {
    // Проверка на наличие пагинации
    if (!req.query.page) {
        req.query.page = "1"
        if (req.originalUrl.endsWith("/getAllCavancies")) {
            req.originalUrl = req.originalUrl + "?page=1"
        }
        else {
            req.originalUrl = req.originalUrl + "&page=1"
        }
    }

    // Проверка на корректные поисковые запросы
    for (let key in req.query) {
        if (key != "page" && key != "min_salary" && key != "max_salary" && key != "min_exp" && key != "max_exp" && key != "search") {
            return res.status(200).json({ status: 404, payload: "Не найдено" })
        }
    }

    // Константа вакансий на каждой странице
    const vacanciesPerPage = 10

    // Определение количества страниц по данному запросу
    const vacanciesCount = (await pool.execute(`SELECT COUNT(*) as count FROM vacancy ${queryToSQL({...req.query})}`))[0][0].count
    let pageCount = Math.ceil(vacanciesCount / vacanciesPerPage)

    // Проверка на корректность номера введеной страницы
    if (parseInt(req.query.page) > pageCount) {
        return res.status(200).json({ status: 200, payload: { next: null, result: [] } })
    }

    // Формирование следующей ссылки
    let nextLink
    if (parseInt(req.query.page) + 1 <= pageCount) {
        nextLink = req.originalUrl.replace(/page=\d+/g, `page=${parseInt(req.query.page) + 1}`)
    }
    else {
        nextLink = null
    }

    // Получение вакансий конкретной страницы
    const foundVacancies = (await pool.execute(`SELECT * FROM vacancy ${queryToSQL({...req.query})} LIMIT ${(parseInt(req.query.page) - 1) * vacanciesPerPage}, ${vacanciesPerPage}`))[0]
    return res.status(200).json({ status: 200, payload: {next : nextLink, result: foundVacancies} })
}

export async function getUserVacancies(req, res) {
    const userVacancies = (await pool.execute(`SELECT * FROM vacancy WHERE user_id = ${pool.escape(req.session_data.user_id)}`))[0]
    return res.status(200).json({ status: 200, payload: userVacancies })
}

export async function addVacancy(req, res) {
    let checkDescriptionRes
    await dataBaseCheckExisting("vacancy", "description", req.body.description).then(function (result) {
        checkDescriptionRes = result[0][0]
    })

    if (checkDescriptionRes != null) {
        return res.status(200).json({ status: 409, payload: "Вакансия с таким описанием уже существует" })
    }

    if (checkValueMinMax(req.body.title, "заголовка", 10, 254) != "") {
        return res.status(200).json({ status: 409, payload: checkValueMinMax(req.body.title, "заголовка", 10, 254) })
    }
    if (checkValueMinMax(req.body.salary, "зарплаты", 1, 15) != "") {
        return res.status(200).json({ status: 409, payload: checkValueMinMax(req.body.salary, "зарплаты", 1, 15) })
    }
    if (checkValueMinMax(req.body.exp, "опыта работы", 1, 5) != "") {
        return res.status(200).json({ status: 409, payload: checkValueMinMax(req.body.exp, "опыта работы", 1, 5) })
    }
    if (checkValueMinMax(req.body.description, "описания", 1000, 50000) != "") {
        return res.status(200).json({ status: 409, payload: checkValueMinMax(req.body.description, "описания", 1000, 50000) })
    }
    if (checkSalary(req.body.salary) != "") {
        return res.status(200).json({ status: 409, payload: checkSalary(req.body.salary) })
    }
    if (checkExp(req.body.exp) != "") {
        return res.status(200).json({ status: 409, payload: checkExp(req.body.exp) })
    }

    pool.execute(`INSERT INTO vacancy SET title = ${pool.escape(req.body.title)}, salary = ${pool.escape(req.body.salary)}, experience = ${pool.escape(req.body.exp)}, description = ${pool.escape(req.body.description)}, user_id = ${pool.escape(req.session_data.user_id)}`)
    return res.status(200).json({ status: 200, payload: "Вакансия успешно добавлена" })
}

export async function updateVacancy(req, res) {
    let checkDescriptionRes = await pool.execute(`SELECT * FROM vacancy WHERE description = ${pool.escape(req.body.description)}`)

    if (checkDescriptionRes[0].length != 0) {
        if (checkDescriptionRes[0].length > 1 || checkDescriptionRes[0][0].vacancy_id != req.body.vacancy_id) {
            return res.status(200).json({ status: 409, payload: "Вакансия с таким описанием уже существует" })
        }
    }

    if (checkValueMinMax(req.body.title, "заголовка", 10, 254) != "") {
        return res.status(200).json({ status: 409, payload: checkValueMinMax(req.body.title, "заголовка", 10, 254) })
    }
    if (checkValueMinMax(req.body.salary, "зарплаты", 1, 15) != "") {
        return res.status(200).json({ status: 409, payload: checkValueMinMax(req.body.salary, "зарплаты", 1, 15) })
    }
    if (checkValueMinMax(req.body.exp, "опыта работы", 1, 5) != "") {
        return res.status(200).json({ status: 409, payload: checkValueMinMax(req.body.exp, "опыта работы", 1, 5) })
    }
    if (checkValueMinMax(req.body.description, "описания", 1000, 50000) != "") {
        return res.status(200).json({ status: 409, payload: checkValueMinMax(req.body.description, "описания", 1000, 50000) })
    }
    if (checkSalary(req.body.salary) != "") {
        return res.status(200).json({ status: 409, payload: checkSalary(req.body.salary) })
    }
    if (checkExp(req.body.exp) != "") {
        return res.status(200).json({ status: 409, payload: checkExp(req.body.exp) })
    }

    pool.execute(`UPDATE vacancy SET title = ${pool.escape(req.body.title)}, salary = ${pool.escape(req.body.salary)}, experience = ${pool.escape(req.body.exp)}, description = ${pool.escape(req.body.description)} WHERE user_id = ${pool.escape(req.session_data.user_id)} AND vacancy_id = ${pool.escape(req.body.vacancy_id)}`)
    return res.status(200).json({ status: 200, payload: "Вакансия успешно обновлена" })
}

export function deleteVacancy(req, res) {
    pool.execute(`DELETE FROM vacancy WHERE user_id = ${pool.escape(req.session_data.user_id)} AND vacancy_id = ${pool.escape(req.body.vacancy_id)}`)
    return res.status(200).json({ status: 200, payload: "Вакансия успешно обновлена" })
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

function checkSalary(value) {
    let num_reg = /^\d+$/
    if (!num_reg.test(value)) {
        return `Зарплата должна содержать только цифры`
    }

    let number = parseInt(value)
    if (number < 0) {
        return `Зарплата не должна быть меньше ${0}`
    }
    if (number > 100000000) {
        return `Зарплата не должна быть больше ${100000000}`
    }

    return ""
}

function checkExp(value) {
    let num_reg = /^\d+$/
    if (!num_reg.test(value)) {
        return `Опыт должен содержать только цифры`
    }

    let number = parseInt(value)
    if (number < 0) {
        return `Опыт не должен быть меньше ${0}`
    }
    if (number > 50) {
        return `Опыт не должен быть больше ${50}`
    }

    return ""
}

function queryToSQL(query) {
    delete query.page

    let paramsArray = []
    for (let key in query) {
        paramsArray.push(paramToSQL(key, query[key]))
    }

    if (paramsArray.length > 0) {
        return `WHERE ${paramsArray.join(" AND ")}`
    }

    return ``
}

function paramToSQL(param, value) {
    switch (param) {
        case "min_salary":
            return `salary >= ${pool.escape(value)}`
            break;
        case "max_salary":
            return `salary <= ${pool.escape(value)}`
            break;
        case "min_exp":
            return `experience >= ${pool.escape(value)}`
            break;
        case "max_exp":
            return `experience <= ${pool.escape(value)}`
            break;
        case "search":
            return `title LIKE ${pool.escape(`%${value}%`)}`
            break
    }
}