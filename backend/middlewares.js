import { getSessionInfo } from "./controllers/auth_controllers.js"

export async function authenticate_session(req, res, next) {
    if (!req.cookies.goodwork_session) {
        return res.status(200).json({status: 401, payload: "Unauthorized"})
    }

    let user_data = await getSessionInfo(req.cookies.goodwork_session)
    if (!user_data) {
        return res.status(200).json({status: 401, payload: "Unauthorized"})
    }

    req.session_data = {
        user_id: user_data.user_id,
        username: user_data.username,
        role: user_data.role
    }
    req.session_id = req.cookies.goodwork_session
    next()
}

export function checkRole(role) {
    return function(req, res, next) {
        if (req.session_data.role != role) {
            return res.status(200).send({status: 403, payload: "Forbidden"})
        }
        else {
            next()
        }
    }
}