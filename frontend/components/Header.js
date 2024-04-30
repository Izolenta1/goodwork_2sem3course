import { useState, useContext } from "react";
import VacancySearchInput from "@/components/GeneralComponents/VacancySearchInput";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import { GlobalPageContext } from "@/context/globalPageContext";
import Heart from "@/svgs/Heart";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"

export default function Header() {
    const [activeModal, setActiveModal] = useState("")

    const {isAuth, userData, setIsAuth, setUserData} = useContext(GlobalPageContext)

    const router = useRouter();
    const pathname = usePathname()
    async function logout() {
        if (!isAuth) {
            return
        }

        // Выполнение запроса
        let url = `/auth/logout`
        const response = await fetch(url, {
            method: "POST"
        })
        const response_data = await response.json()

        if (response_data.status == 200) {
            setIsAuth(false)
            setUserData({user_id: null, username: null, role: null})

            if (pathname == "/") {
                router.refresh()
            }
            else {
                router.push(`/`)
            }
        }
    }

    return (
        <>
            <header className="w-full flex flex-col">

                {/* Верхняя часть */}
                <div className="w-full flex justify-center bg-[#F3F3F3]">
                    <div className="w-[1140px] max1200px:w-[95%] h-[110px] max750px:h-[80px] max450px:h-[120px] flex justify-between max920px:justify-center max920px:gap-[12px] items-center max450px:flex-col-reverse">
                        <Link href="/" className="max920px:hidden w-[200px] text-[80px] leading-[80px] font-[700] font-mulish text-[#313131] text-start select-none">GW</Link>
                        <VacancySearchInput />
                        {!isAuth 
                        ? <button onClick={() => setActiveModal("Login")} className="flex justify-center items-center bg-[#FF6F0E] rounded-[6px] w-[200px] h-[50px] max750px:w-[130px] max750px:h-[40px] max450px:w-[220px] text-[16px] leading-[16px] font-[700] font-mulish text-[#FFFFFF]">Войти</button> 
                        : userData.role == "employee" 
                        ? <div className="flex justify-between w-[200px] max750px:w-[130px] max450px:w-[220px]">
                            <Link href="/favourite" className="flex justify-center items-center bg-[#FF6F0E] rounded-[6px] w-[50px] h-[50px] max750px:w-[40px] max750px:h-[40px]">
                                <Heart className="w-[24px] h-[24px] max750px:w-[18px] max750px:h-[18px] fill-[#FFFFFF]" />
                            </Link>
                            <button onClick={() => logout()} className="flex justify-center items-center bg-[#FF6F0E] rounded-[6px] w-[140px] h-[50px] max750px:w-[80px] max750px:h-[40px] max450px:w-[170px] text-[16px] leading-[16px] font-[700] font-mulish text-[#FFFFFF]">Выйти</button>
                        </div>
                        : <button onClick={() => logout()} className="flex justify-center items-center bg-[#FF6F0E] rounded-[6px] w-[200px] h-[50px] max750px:w-[130px] max750px:h-[40px] max450px:w-[220px] text-[16px] leading-[16px] font-[700] font-mulish text-[#FFFFFF]">Выйти</button>}
                        
                    </div>
                </div>

                {/* Нижняя часть */}
                <div className="w-full flex justify-center bg-[#313131]">
                    <div className="w-[1140px] max1200px:w-[95%] h-[60px] max750px:h-[40px] flex justify-center items-center gap-[12px]">
                        <Link href="/" className="text-[18px] leading-[18px] max750px:text-[12px] max750px:leading-[12px] font-[500] font-mulish text-[#FFFFFF] hover:text-[#FF6F0E] select-none transition ease-in-out duration-300">Главная</Link>
                        <Link href="/vacancy" className="text-[18px] leading-[18px] max750px:text-[12px] max750px:leading-[12px] font-[500] font-mulish text-[#FFFFFF] hover:text-[#FF6F0E] select-none transition ease-in-out duration-300">Вакансии</Link>
                        {isAuth 
                        ? <Link href="/cabinet" className="text-[18px] leading-[18px] max750px:text-[12px] max750px:leading-[12px] font-[500] font-mulish text-[#FFFFFF] hover:text-[#FF6F0E] select-none transition ease-in-out duration-300">Личный кабинет</Link>
                        : <button onClick={() => setActiveModal("Login")} className="text-[18px] leading-[18px] max750px:text-[12px] max750px:leading-[12px] font-[500] font-mulish text-[#FFFFFF] select-none hover:text-[#FF6F0E] transition ease-in-out duration-300">Личный кабинет</button>}
                    </div>
                </div>
            </header>
            {!isAuth ? <><LoginModal activeModal={activeModal} setActiveModal={setActiveModal} /><RegisterModal activeModal={activeModal} setActiveModal={setActiveModal} /></>  : null}
        </>
    );
}