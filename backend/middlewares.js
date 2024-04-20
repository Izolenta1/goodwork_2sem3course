export async function authenticate_session(req, res, next) {
    if (!req.cookies.mna_session) {
        return res.status(200).json({status: 401, payload: "Unauthorized"})
    }

    let user_data = await getSessionInfo(req.cookies.mna_session)
    if (!user_data) {
        return res.status(200).json({status: 401, payload: "Unauthorized"})
    }

    req.tokenData = {
        id: user_data.user_id,
        user: user_data.login,
        role: user_data.roleonsite
    }
    req.session_id = req.cookies.mna_session
    next()
}