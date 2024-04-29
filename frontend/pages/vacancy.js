import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import MainContainer from "@/components/MainComponent";
import Link from "next/link";
import Dropdowns from "@/components/VacancyComponents/Dropdowns";
import Check from "@/svgs/Check";
import VacancyCell from "@/components/VacancyComponents/VacancyCell";
import LoadingScreen from "@/components/GeneralComponents/LoadingScreen"
import { useRouter } from "next/navigation"

export default function Vacancy({ VacanciesList, VacanciesNext, FilterParams }) {
    const [vacanciestList, setVacanciesList] = useState(VacanciesList)
    const [vacanciesNext, setVacanciesNext] = useState(VacanciesNext)

    const loadingLastElement = useRef(null)
    const observer = useRef(null)
    const loadedRef = useRef(false);
    let callback = async function (entries, observer) {
        if (entries[0].isIntersecting) {
            if (vacanciesNext != null) {
                const newVacancyData = await fetch(vacanciesNext)
                const response = await newVacancyData.json()

                setVacanciesList(currentVacancyList => [...currentVacancyList, ...response.payload.result])
                setVacanciesNext(response.payload.next)
            }
            else {
                loadingLastElement.current.classList.add("hidden")
            }
        }
    }

    useEffect(() => {
        if (loadedRef.current) return
        loadedRef.current = true;

        observer.current = new IntersectionObserver(callback)
        observer.current.observe(loadingLastElement.current)
    }, [])

    // Велосипед для обновления обсервера. Если удалить, то будет фетчить по одной и той же ссылке
    useEffect(() => {
        loadingLastElement.current.classList.remove("hidden")

        observer.current.disconnect()
        observer.current = new IntersectionObserver(callback)
        observer.current.observe(loadingLastElement.current)
    }, [vacanciesNext])

    useEffect(() => {
        window.addEventListener("beforeunload", function () { window.scrollTo(0, 0); })
    }, [])

    // Функция применения фильтра
    const router = useRouter();
    function applyFilter() {
        let min_salary = document.getElementById("min_salary")
        let max_salary = document.getElementById("max_salary")
        let min_exp = document.getElementById("min_exp")
        let max_exp = document.getElementById("max_exp")

        let new_url = new URL(`http://localhost:3000/vacancy`);

        if (min_salary.value) {
            new_url.searchParams.append('min_salary', min_salary.value)
        }
        if (max_salary.value) {
            new_url.searchParams.append('max_salary', max_salary.value)
        }
        if (min_exp.value) {
            new_url.searchParams.append('min_exp', min_exp.value)
        }
        if (max_exp.value) {
            new_url.searchParams.append('max_exp', max_exp.value)
        }

        router.push(`${new_url.pathname}${new_url.search}`)
    }

    return (
        <>
            <Head>
                <title>Вакансии</title>
            </Head>
            <MainContainer>
                <main className="grow flex flex-col items-center">

                    {/* Враппер под 1140px для новой вакансии */}
                    <div className="w-[1140px] h-fit flex flex-col gap-[32px]">

                        {/* Заголовок */}
                        <div className='flex flex-col mt-[16px] gap-[8px]'>
                            <span className='text-[40px] leading-[40px] font-mulish font-[900] text-[#313131]'>Вакансии</span>
                            <div className='w-[140px] h-[6px] bg-[#FF6F0E]'></div>
                        </div>

                        {/* Настройки фильтра */}
                        <div className="flex flex-row gap-[12px]">

                            {/* Кнопка очистки фильтра */}
                            <Link href={`/vacancy`} title="Очистить фильтр" className="h-[40px] w-[40px] flex justify-center items-center bg-[#FF6F0E] rounded-[4px]">
                                <span className="text-[16px] leading-[16px] font-[700] text-[#FFFFFF]">X</span>
                            </Link>

                            {/* Дропдауны */}
                            <Dropdowns FilterParams={FilterParams} />

                            {/* Кнопка применения фильтра */}
                            <button onClick={applyFilter} className="h-[40px] w-[100px] flex justify-center items-center bg-[#FF6F0E] rounded-[4px]" title="Применить">
                                <span className="max580px:hidden text-[16px] leading-[16px] font-mulish font-[600] text-[#FFFFFF]">Применить</span>
                                <Check className="hidden max580px:block w-[14px] h-[14px] fill-[#FFFFFF]" />
                            </button>
                        </div>

                        {/* Враппер вакансий */}
                        <div className="flex flex-col gap-[16px]">
                            {vacanciestList.length > 0 
                            ? vacanciestList.map(vacancy => <VacancyCell key={vacancy.vacancy_id} vacancy_id={vacancy.vacancy_id} title={vacancy.title} salary={vacancy.salary} exp={vacancy.experience} description={vacancy.description} />)
                            : <span className="text-[24px] leading-[24px] self-center font-mulish font-[900] text-[#313131]">Вакансии не найдены</span>}
                        </div>

                        {/* Блок с загрузкой. Обсервится для подгрузки контента */}
                        <div ref={loadingLastElement} className="w-full h-[100px] max920px:h-[50px] mt-[24px]">
                            <LoadingScreen />
                        </div>
                    </div>
                </main>
            </MainContainer>
        </>
    );
}

export async function getServerSideProps(context) {
    let new_url = new URL(`http://localhost:3001/api/vacancy/getAllCavancies`);
    let FilterParams = {}
    if (context.query.min_salary) {
        new_url.searchParams.append('min_salary', context.query.min_salary)
        FilterParams["min_salary"] = context.query.min_salary
    }
    if (context.query.max_salary) {
        new_url.searchParams.append('max_salary', context.query.max_salary)
        FilterParams["max_salary"] = context.query.max_salary
    }
    if (context.query.min_exp) {
        new_url.searchParams.append('min_exp', context.query.min_exp)
        FilterParams["min_exp"] = context.query.min_exp
    }
    if (context.query.max_exp) {
        new_url.searchParams.append('max_exp', context.query.max_exp)
        FilterParams["max_exp"] = context.query.max_exp
    }

    const vacanciesRes = await fetch(new_url.href)
    const vacanciesData = await vacanciesRes.json()

    let VacanciesList = vacanciesData.payload.result
    let VacanciesNext = vacanciesData.payload.next

    return {
        props: {
            VacanciesList,
            VacanciesNext,
            FilterParams,
            key: JSON.stringify(context.query),
        },
    }
}