import { useState, useEffect } from "react";
import Link from "next/link";


export default function EmployerWrapper() {
    const [vacancies, setVacancies] = useState([])

    useEffect(() => {
        fetch("/api/vacancy/getUserVacancies")
        .then(response_data => response_data.json())
        .then(response_data => {
            setVacancies(response_data.payload)
        })
    }, [])

    return (
        <main className="grow flex flex-col items-center">

            {/* Враппер под 1140px для страницы работодателя */}
            <div className="w-[1140px] h-fit flex flex-col gap-[32px]">

                {/* Заголовок */}
                <div className='flex flex-col mt-[16px] gap-[8px]'>
                    <span className='text-[40px] leading-[40px] font-mulish font-[900] text-[#313131]'>Ваши вакансии</span>
                    <div className='w-[140px] h-[6px] bg-[#FF6F0E]'></div>
                </div>

                <Link href="/cabinet/vacancy/new" className="flex justify-center items-center bg-[#FF6F0E] rounded-[6px] w-[200px] h-[50px] text-[16px] leading-[16px] font-[700] font-mulish text-[#FFFFFF]">Создать вакансию</Link>

                {/* Враппер вакансий */}
                <div className="flex flex-col gap-[16px]">
                    {vacancies.map(vacancy => {})}
                </div>
            </div>
        </main>
    );
}