import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import MainContainer from "@/components/MainComponent";

export default function Edit({ VacancyID, VacancyData }) {
    const [title, setTitle] = useState("")
    const [salary, setSalary] = useState("")
    const [exp, setExp] = useState("")
    const [description, setDescription] = useState("")
    const descriptionRef = useRef(null)

    const [saveInfo, setSaveInfo] = useState("")
    const [isError, setError] = useState(false)

    function handleDescriptonChange(e) {
        setDescription(e.target.value)
        if (descriptionRef.current) {
            descriptionRef.current.style.height = descriptionRef.current.scrollHeight + 'px';
        }
    }

    function sendVacancyForm() {
        const form = {
            vacancy_id: VacancyID,
            title: title,
            salary: salary,
            exp: exp,
            description: description,
        }

        // Выполнение запроса
        let url = `/api/vacancy/updateVacancy`
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(form)
        })
            .then(response_data => response_data.json())
            .then(response_data => {
                if (response_data.status != 200) {
                    setSaveInfo(response_data.payload)
                    setError(true)
                }
                else {
                    setSaveInfo(response_data.payload)
                    setError(false)
                }
            })
    }

    // Инициализация полей
    useEffect(() => {
        setTitle(VacancyData.title)
        setSalary(VacancyData.salary)
        setExp(VacancyData.experience)

        setDescription(VacancyData.description)
    }, [])

    useEffect(() => {
        if (descriptionRef.current) {
            descriptionRef.current.style.height = descriptionRef.current.scrollHeight + 'px';
        }
    }, [description])

    return (
        <>
            <Head>
                <title>Редактировать вакансию</title>
            </Head>
            <MainContainer>
                <main className="grow flex flex-col items-center">

                    {/* Враппер под 1140px для редактирование вакансии */}
                    <div className="w-[1140px] max1200px:w-[95%] h-fit flex flex-col gap-[32px] max750px:gap-[16px]">

                        {/* Заголовок */}
                        <div className='flex flex-col mt-[16px] gap-[8px]'>
                            <span className='text-[40px] leading-[40px] max750px:text-[18px] max750px:leading-[18px] font-mulish font-[900] text-[#313131]'>Редактирование вакансии</span>
                            <div className='w-[140px] h-[6px] max750px:h-[3px] bg-[#FF6F0E]'></div>
                        </div>

                        {/* Поле заголовка */}
                        <div className="flex flex-col gap-[8px]">
                            <span className="text-[20px] leading-[20px] max750px:text-[16px] max750px:leading-[16px] font-[500] font-mulish text-[#000000]">Заголовок вакансии <span className="text-[#FF5C35]">*</span></span>
                            <input value={title} onChange={(e) => setTitle(e.target.value)} className="relative w-full h-[30px] rounded-[8px] outline-none pl-[12px] bg-[#dddddd] text-[14px] leading-[14px] font-[500] font-mulish text-[#222231] opacity-50" placeholder="Python разработчик"></input>
                        </div>

                        {/* Поле зарплаты */}
                        <div className="flex flex-col gap-[8px]">
                            <span className="text-[20px] leading-[20px] max750px:text-[16px] max750px:leading-[16px] font-[500] font-mulish text-[#000000]">Предлагаемая зарплата <span className="text-[#FF5C35]">*</span></span>
                            <input value={salary} onChange={(e) => setSalary(e.target.value)} className="relative w-full h-[30px] rounded-[8px] outline-none pl-[12px] bg-[#dddddd] text-[14px] leading-[14px] font-[500] font-mulish text-[#222231] opacity-50" placeholder="250000"></input>
                        </div>

                        {/* Поле опыта */}
                        <div className="flex flex-col gap-[8px]">
                            <span className="text-[20px] leading-[20px] max750px:text-[16px] max750px:leading-[16px] font-[500] font-mulish text-[#000000]">Необходимый опыт работы <span className="text-[#FF5C35]">*</span></span>
                            <input value={exp} onChange={(e) => setExp(e.target.value)} className="relative w-full h-[30px] rounded-[8px] outline-none pl-[12px] bg-[#dddddd] text-[14px] leading-[14px] font-[500] font-mulish text-[#222231] opacity-50" placeholder="6"></input>
                        </div>

                        {/* Поле для вакансии */}
                        <div className="flex flex-col gap-[8px]">
                            <span className="text-[20px] leading-[20px] max750px:text-[16px] max750px:leading-[16px] font-[500] font-mulish text-[#000000]">Текст вакансии <span className="text-[#FF5C35]">*</span></span>
                            <textarea ref={descriptionRef} value={description} onChange={handleDescriptonChange} className="relative w-full min-h-[600px] rounded-[8px] outline-none p-[12px] bg-[#dddddd] text-[14px] leading-[18px] font-[500] font-mulish text-[#222231] opacity-50 resize-none" placeholder="Текст вакансии"></textarea>
                        </div>

                        {/* Текст ошибки */}
                        {saveInfo == "" ? null : <span className={`text-[16px] leading-[16px] max750px:text-[14px] max750px:leading-[14px] font-[500] font-mulish ${isError ? "text-[#FF5C35]" : "text-[#53BB6A]"} `}>{saveInfo}</span>}

                        <button onClick={() => sendVacancyForm()} className="w-[195px] h-[45px] max750px:w-[135px] max750px:h-[32px] bg-[#FF6F0E] rounded-[6px] flex justify-center items-center text-[18px] leading-[18px] max750px:text-[12px] max750px:leading-[12px] font-[700] font-mulish text-[#FFFFFF]">Обновить</button>
                    </div>
                </main>
            </MainContainer>
        </>
    );
}

export async function getServerSideProps(context) {
    let verifyURL = `http://localhost:3001/auth/verifySession`
    const verifyRes = await fetch(verifyURL, {
        method: "POST",
        headers: {
            cookie: context.req.headers.cookie
        }
    })
    const verifyData = await verifyRes.json()

    if (verifyData.status == 401) {
        return {
            redirect: {
                destination: '/401',
                permanent: false,
            },
        }
    }

    if (verifyData.payload.role != "employer") {
        return {
            redirect: {
                destination: '/401',
                permanent: false,
            },
        }
    }

    const vacanciesRes = await fetch("http://localhost:3001/api/vacancy/getUserVacancies", {
        method: "GET",
        headers: {
            cookie: context.req.headers.cookie
        }
    })
    const vacanciesData = await vacanciesRes.json()

    let result_array = vacanciesData.payload.filter(vacancy => vacancy.vacancy_id == context.params.vacancy_id)
    if (result_array.length == 0) {
        return {
            redirect: {
                destination: '/401',
                permanent: false,
            },
        }
    }

    return {
        props: {
            VacancyID: context.params.vacancy_id,
            VacancyData: result_array[0],
            key: context.params.vacancy_id,
        },
    }
}