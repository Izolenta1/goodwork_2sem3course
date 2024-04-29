import VacancySearchInput from "@/components/GeneralComponents/VacancySearchInput";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full h-fit flex justify-center bg-[#313131] py-[24px] mt-[16px]">

            {/* Враппер для основного содержимого под 1140px */}
            <div className="w-[1140px] flex flex-row justify-between items-center">

                {/* Навигация */}
                <div className="w-[150px] h-fit flex flex-col items-start gap-[16px]">
                    <span className="text-[24px] leading-[24px] font-mulish font-[600] text-[#FFFFFF]">Навигация</span>
                    <Link href="/" className="text-[16px] leading-[16px] font-mulish font-[400] text-[#FFFFFF] text-start hover:text-[#FF6F0E] select-none transition ease-in-out duration-300">Главная</Link>
                    <Link href="/vacancy" className="text-[16px] leading-[16px] font-mulish font-[400] text-[#FFFFFF] text-start hover:text-[#FF6F0E] select-none transition ease-in-out duration-300">Вакансии</Link>
                    <Link href="/cabinet" className="text-[16px] leading-[16px] font-[400] font-mulish text-[#FFFFFF] hover:text-[#FF6F0E] select-none transition ease-in-out duration-300">Личный кабинет</Link>
                </div>

                <VacancySearchInput />

                <span className="w-[150px] text-[80px] leading-[80px] font-[700] font-mulish text-[#FFFFFF] text-end select-none">GW</span>
            </div>
        </footer>
    );
}