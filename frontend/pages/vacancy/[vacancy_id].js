import { useState } from "react";
import Head from "next/head";
import MainContainer from "@/components/MainComponent";
import Heart from "@/svgs/Heart";

export default function Vacancy({ vacancyData, isResponseSet }) {

    // Функция добавления/удаления отклика
    const [isResponse, setResponse] = useState(isResponseSet)
    function addRemoveResponse() {
        const form = {
            vacancy_id: vacancyData.vacancy_id,
        }

        // Выполнение запроса
        let url = `/api/response`
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(form)
        })
            .then(response_data => response_data.json())
            .then(response_data => {
                if (response_data.payload == "Отклик удален") {
                    setResponse(false)
                }
                if (response_data.payload == "Отклик добавлен") {
                    setResponse(true)
                }
            })
    }

    return (
        <>
            <Head>
                <title>{vacancyData.title}</title>
            </Head>
            <MainContainer>
                <main className="grow flex flex-col items-center">

                    {/* Враппер под 1140px для новой вакансии */}
                    <div className="w-[1140px] h-fit flex flex-col gap-[32px]">

                        {/* Заголовок */}
                        <div className='flex flex-col mt-[16px] gap-[8px]'>
                            <span className='text-[40px] leading-[40px] font-mulish font-[900] text-[#313131]'>{vacancyData.title}</span>
                            <div className='w-[140px] h-[6px] bg-[#FF6F0E]'></div>
                        </div>

                        {/* Краткие характеристики и кнопки */}
                        <div className="flex flex-col gap-[20px]">
                            <div className="flex flex-col gap-[4px]">
                                <span className='text-[24px] leading-[24px] font-mulish font-[600] text-[#313131]'>Зарплата: <span className="font-[900]">{vacancyData.salary} рублей</span></span>
                                <span className='text-[24px] leading-[24px] font-mulish font-[600] text-[#313131]'>Необходимо лет опыта: <span className="font-[900]">{vacancyData.experience == 0 ? "Без опыта" : vacancyData.experience}</span></span>
                            </div>

                            <div className="flex gap-[12px]">
                                <button onClick={addRemoveResponse} className={`h-[50px] w-[150px] flex justify-center items-center ${isResponse ? "bg-[#313131]" : "bg-[#53BB6A]"} rounded-[4px] text-[16px] leading-[16px] font-mulish font-[600] text-[#FFFFFF] transition ease-in-out duration-300`} title={isResponse ? "Удалить отклик" : "Откликнуться"}>Откликнуться</button>
                                <button className="h-[50px] w-[50px] flex justify-center items-center bg-[#53BB6A] rounded-[4px]"><Heart className="w-[24px] h-[24px] fill-[#FFFFFF]" /></button>
                            </div>
                        </div>

                        {/* Описание вакансии */}
                        <div className="flex flex-col gap-[32px]">

                            {/* Заголовок */}
                            <div className='flex flex-col mt-[16px] gap-[8px]'>
                                <span className='text-[40px] leading-[40px] font-mulish font-[900] text-[#313131]'>Описание</span>
                                <div className='w-[140px] h-[6px] bg-[#FF6F0E]'></div>
                            </div>

                            <span className="text-[24px] leading-[32px] font-mulish font-[400] text-[#000000] whitespace-pre-wrap">{vacancyData.description}</span>
                        </div>
                    </div>
                </main>
            </MainContainer>
        </>
    );
}

export async function getServerSideProps(context) {
    const vacancyRes = await fetch(`http://localhost:3001/api/vacancy/getVacancyById?vacancy_id=${context.params.vacancy_id}`)
    const vacancyData = (await vacancyRes.json())["payload"]

    let responseURL = `http://localhost:3001/api/response?vacancy_id=${context.params.vacancy_id}`
    const responseRes = await fetch(responseURL, {
        method: "GET",
        headers: {
            cookie: context.req.headers.cookie
        }
    })
    const responseData = await responseRes.json()

    let isResponseSet
    if (responseData.payload) {
        isResponseSet = true
    }
    else {
        isResponseSet = false
    }

    return {
        props: {
            vacancyData,
            isResponseSet,
            key: JSON.stringify(context.params.vacancy_id),
        },
    }
}