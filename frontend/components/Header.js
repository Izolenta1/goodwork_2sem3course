import { useState } from "react";
import VacancySearchInput from "@/components/GeneralComponents/VacancySearchInput";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";

export default function Header() {
    const [activeModal, setActiveModal] = useState("")

    return (
        <>
            <header className="w-full flex flex-col">

                {/* Верхняя часть */}
                <div className="w-full flex justify-center bg-[#F3F3F3]">
                    <div className="w-[1140px] h-[110px] flex justify-between items-center">
                        <button className="w-[200px] text-[80px] leading-[80px] font-[700] font-mulish text-[#313131] text-start select-none">GW</button>
                        <VacancySearchInput />
                        <button onClick={() => setActiveModal("Login")} className="flex justify-center items-center bg-[#FF6F0E] rounded-[6px] w-[200px] h-[50px] text-[16px] leading-[16px] font-[700] font-mulish text-[#FFFFFF]">Войти</button>
                    </div>
                </div>

                {/* Нижняя часть */}
                <div className="w-full flex justify-center bg-[#313131]">
                    <div className="w-[1140px] h-[60px] flex justify-center items-center gap-[12px]">
                        <button className="text-[18px] leading-[18px] font-[500] font-mulish text-[#FFFFFF]">Главная</button>
                        <button className="text-[18px] leading-[18px] font-[500] font-mulish text-[#FFFFFF]">Вакансии</button>
                        <button className="text-[18px] leading-[18px] font-[500] font-mulish text-[#FFFFFF]">Личный кабинет</button>
                    </div>
                </div>
            </header>
            <LoginModal activeModal={activeModal} setActiveModal={setActiveModal} />
            <RegisterModal activeModal={activeModal} setActiveModal={setActiveModal} />
        </>
    );
}