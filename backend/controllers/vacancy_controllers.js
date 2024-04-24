import { dataBaseCheckExisting } from "./general_controller.js"
import pool from "./database_controller.js";

export function getVacancyById(req, res) {

}

export function getAllCavancies(req, res) {
    
}

export async function getUserVacancies(req, res) {
    const userVacancies = (await pool.execute(`SELECT * FROM vacancy WHERE user_id = ${pool.escape(req.session_data.user_id)}`))[0]
    return res.status(200).json({status: 200, payload: userVacancies})
}

export async function addVacancy(req, res) {
    let checkDescriptionRes
    await dataBaseCheckExisting("vacancy", "description", req.body.description).then(function(result) {
        checkDescriptionRes = result[0][0]
    })

    if (checkDescriptionRes != null) {
        return res.status(200).json({status: 409, payload: "Вакансия с таким описанием уже существует"})
    }

    if (checkValueMinMax(req.body.title, "заголовка", 10, 254) != "") {
        return res.status(200).json({status: 409, payload: checkValueMinMax(req.body.title, "заголовка", 10, 254)})
    }
    if (checkValueMinMax(req.body.salary, "зарплаты", 1, 15) != "") {
        return res.status(200).json({status: 409, payload: checkValueMinMax(req.body.salary, "зарплаты", 1, 15)})
    }
    if (checkValueMinMax(req.body.exp, "опыта работы", 1, 5) != "") {
        return res.status(200).json({status: 409, payload: checkValueMinMax(req.body.exp, "опыта работы", 1, 5)})
    }
    if (checkValueMinMax(req.body.description, "описания", 1000, 50000) != "") {
        return res.status(200).json({status: 409, payload: checkValueMinMax(req.body.description, "описания", 1000, 50000)})
    }
    if (checkSalary(req.body.salary) != "") {
        return res.status(200).json({status: 409, payload: checkSalary(req.body.salary)})
    }
    if (checkExp(req.body.exp) != "") {
        return res.status(200).json({status: 409, payload: checkExp(req.body.exp)})
    }

    pool.execute(`INSERT INTO vacancy SET title = ${pool.escape(req.body.title)}, salary = ${pool.escape(req.body.salary)}, experience = ${pool.escape(req.body.exp)}, description = ${pool.escape(req.body.description)}, user_id = ${pool.escape(req.session_data.user_id)}`)
    return res.status(200).json({status: 200, payload: "Вакансия успешно добавлена"})
}

export function updateVacancy(req, res) {
    
}

export function deleteVacancy(req, res) {
    
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