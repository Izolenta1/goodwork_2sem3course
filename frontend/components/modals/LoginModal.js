import { useRef, useState } from "react"
import useClickOutside from "@/hooks/useClickOutside"
import styles from "@/styles/Header/Modals.module.css"

export default function LoginModal({ activeModal, setActiveModal }) {

    

    // Хук для отслеживания клика вне модального окна
    const modalRef = useRef(null)
    useClickOutside(modalRef, () => {
        if (activeModal == "Login") setTimeout(() => setActiveModal(""), 10)
    })

    return (
        // Темный фон
        <div className={`fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-[10] bg-[#000000D9] ${activeModal == "Login" ? styles.active : styles.disabled}`}>

            {/* Модальное окно */}
            <div ref={modalRef} className="w-[630px] flex flex-col gap-[20px] max920px:gap-[16px] bg-[#FFFFFF] p-[20px] ">

                {/* Заголовок */}
                <div className="flex flex-row justify-between items-center">

                    {/* Текст */}
                    <div className='flex flex-col gap-[8px]'>
                        <span className='text-[40px] leading-[40px] font-mulish font-[900] text-[#313131]'>Авторизация</span>
                        <div className='w-[140px] h-[6px] max920px:h-[3px] bg-[#FF6F0E]'></div>
                    </div>

                    {/* Кнопка закрытия окна */}
                    <button onClick={() => setActiveModal("")} className="w-[42px] h-[42px] bg-[#FF6F0E] rounded-[4px] flex justify-center items-center">
                        <span className="text-[16px] leading-[16px] font-[700] text-[#FFFFFF]">X</span>
                    </button>
                </div>

                {/* Враппер инпутов */}
                <div className="flex flex-col gap-[10px] p-[10px]">

                    {/* Поле логина */}
                    <div className="flex flex-col w-[320px] gap-[8px]">
                        <span className="text-[20px] leading-[20px] font-[500] font-mulish text-[#000000]">Логин <span className="text-[#FF5C35]">*</span></span>
                        <input className="relative w-full h-[30px] rounded-[8px] outline-none pl-[12px] bg-[#dddddd] text-[14px] leading-[14px] font-[500] font-mulish text-[#222231] opacity-50 placeholder:text-[#222231]" placeholder="Ваш логин"></input>
                    </div>

                    {/* Поле пароля */}
                    <div className="flex flex-col w-[320px] gap-[8px]">
                        <span className="text-[20px] leading-[20px] font-[500] font-mulish text-[#000000]">Пароль <span className="text-[#FF5C35]">*</span></span>
                        <input type="password" className="relative w-full h-[30px] rounded-[8px] outline-none pl-[12px] bg-[#dddddd] text-[14px] leading-[14px] font-[500] font-mulish text-[#222231] opacity-50 placeholder:text-[#222231]" placeholder="Ваш пароль"></input>
                    </div>
                </div>

                <span className="text-[16px] leading-[16px] font-[400] font-mulish text-[#000000] select-none">Нет аккаунта? <button onClick={() => setActiveModal("Register")} className="text-[#FF6F0E]">Зарегистрироваться</button></span>

                <button className="w-[195px] h-[45px] bg-[#FF6F0E] rounded-[6px] flex justify-center items-center text-[18px] leading-[18px] font-[700] font-mulish text-[#FFFFFF]">Войти</button>
            </div>
        </div>
    )
}