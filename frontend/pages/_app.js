import { useState, useEffect } from "react";
import "@/styles/globals.css";
import { GlobalPageContext } from "@/context/globalPageContext";

export default function App({ Component, pageProps }) {
    // Контекст авторизации
    const [isAuth, setIsAuth] = useState(false)
    const [userData, setUserData] = useState({ user_id: null, username: null, role: null })

    // Верификация сессии
    let authChecked = false
    useEffect(() => {
        const fetchAuth = async () => {
            let url = `/auth/verifySession`
            const response = await fetch(url, {
                method: "POST"
            })
            const auth_data = await response.json()

            if (auth_data.status == 200 && !isAuth) {
                setIsAuth(true)
                setUserData({ user_id: auth_data.payload.id, username: auth_data.payload.username, role: auth_data.payload.role })
            }
        }

        if (!authChecked) {
            fetchAuth()
            authChecked = true
        }
    }, [])

    return (
        <GlobalPageContext.Provider value={{
            isAuth,
            setIsAuth,
            userData,
            setUserData,
        }}>
            <Component {...pageProps} />
        </GlobalPageContext.Provider>
    );
}
