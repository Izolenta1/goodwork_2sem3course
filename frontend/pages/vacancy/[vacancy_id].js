import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import MainContainer from "@/components/MainComponent";
import Heart from "@/svgs/Heart";

export default function Vacancy({ vacancyData, isResponseSet, isfavouriteSet }) {
    const [btnErrorText, setBtnErrorText] = useState("")
    const [commentErrorText, setCommentErrorText] = useState("")

    // Функция добавления/удаления отклика
    const [isResponse, setResponse] = useState(isResponseSet)
    function addRemoveResponse() {
        setBtnErrorText("")
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
                if (response_data.status == 401) {
                    setBtnErrorText("Для отклика необходима авторизация")
                }
                if (response_data.status == 403) {
                    setBtnErrorText("Отклик доступен только для соискателя")
                }
            })
    }

    // Функция добавления/удаления избранной вакансии
    const [isFavourite, setFavourite] = useState(isfavouriteSet)
    function addRemoveFavourite() {
        setBtnErrorText("")
        const form = {
            vacancy_id: vacancyData.vacancy_id,
        }

        // Выполнение запроса
        let url = `/api/favourite`
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(form)
        })
            .then(response_data => response_data.json())
            .then(response_data => {
                if (response_data.payload == "Избранная удалена") {
                    setFavourite(false)
                }
                if (response_data.payload == "Избранная добавлена") {
                    setFavourite(true)
                }
                if (response_data.status == 401) {
                    setBtnErrorText("Для избранного необходима авторизация")
                }
                if (response_data.status == 403) {
                    setBtnErrorText("Избранное доступно только для соискателя")
                }
            })
    }

    const [comment, setComment] = useState("")
    const commentRef = useRef(null)
    useEffect(() => {
        if (commentRef.current) {
            commentRef.current.style.height = commentRef.current.scrollHeight + 'px';
        }
    }, [comment])

    // Функция отправки отзыва
    function addFeedback() {
        setCommentErrorText("")
        const form = {
            comment: comment,
            vacancy_id: vacancyData.vacancy_id,
        }

        // Выполнение запроса
        let url = `/api/vacancy/feedback`
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(form)
        })
            .then(response_data => response_data.json())
            .then(response_data => {
                switch (response_data.status) {
                    case 200:
                        console.log("ok")
                        break
                    case 401:
                        setCommentErrorText("Для отзыва необходима авторизация")
                        break
                    case 403:
                        setCommentErrorText("Отзывы доступны только соискателям")
                        break
                    default:
                        setCommentErrorText(response_data.payload)
                        break
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

                            <div className="flex flex-col gap-[12px]">
                                <div className="flex gap-[12px]">
                                    <button onClick={addRemoveResponse} className={`h-[50px] w-[150px] flex justify-center items-center ${isResponse ? "bg-[#313131]" : "bg-[#53BB6A]"} rounded-[4px] text-[16px] leading-[16px] font-mulish font-[600] text-[#FFFFFF] transition ease-in-out duration-300`} title={isResponse ? "Удалить отклик" : "Откликнуться"}>Откликнуться</button>
                                    <button onClick={addRemoveFavourite} className={`h-[50px] w-[50px] flex justify-center items-center ${isFavourite ? "bg-[#313131]" : "bg-[#53BB6A]"} rounded-[4px] transition ease-in-out duration-300`} title={isFavourite ? "Удалить из избранного" : "Добавить в избранное"}><Heart className="w-[24px] h-[24px] fill-[#FFFFFF]" /></button>
                                </div>
                                <span className={`text-[16px] leading-[16px] font-[500] font-mulish text-[#FF5C35]`}>{btnErrorText}</span>
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

                        {/* Отзывы о вакансии */}
                        <div className="flex flex-col gap-[32px]">

                            {/* Заголовок */}
                            <div className='flex flex-col mt-[16px] gap-[8px]'>
                                <span className='text-[40px] leading-[40px] font-mulish font-[900] text-[#313131]'>Отзывы о вакансии</span>
                                <div className='w-[140px] h-[6px] bg-[#FF6F0E]'></div>
                            </div>

                            {/* Поле комментария */}
                            <div className="flex flex-col gap-[8px]">
                                <span className="text-[20px] leading-[20px] font-[500] font-mulish text-[#000000]">Текст отзыва <span className="text-[#FF5C35]">*</span></span>
                                <textarea ref={commentRef} value={comment} onChange={(e) => setComment(e.target.value)} className="relative w-full min-h-[200px] rounded-[8px] outline-none p-[12px] bg-[#dddddd] text-[14px] leading-[18px] font-[500] font-mulish text-[#222231] opacity-50 resize-none" placeholder="Текст отзыва"></textarea>
                                {commentErrorText != "" ? <span className={`text-[16px] leading-[16px] font-[500] font-mulish text-[#FF5C35]`}>{commentErrorText}</span> : null}
                                <button onClick={addFeedback} className="h-[50px] w-[150px] flex justify-center items-center bg-[#FF6F0E] rounded-[4px] text-[16px] leading-[16px] font-mulish font-[600] text-[#FFFFFF]">Отправить</button>
                            </div>
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

    // Проверка на добавленное в отклик
    let responseURL = `http://localhost:3001/api/response?vacancy_id=${context.params.vacancy_id}`
    const responseRes = await fetch(responseURL, {
        method: "GET",
        headers: {
            cookie: context.req.headers.cookie
        }
    })
    const responseData = await responseRes.json()

    let isResponseSet = false
    if (responseData.payload) {
        if (responseData.status == 200) {
            isResponseSet = true
        }
    }
    else {
        isResponseSet = false
    }

    // Проверка на добавленное в избранное
    let favouriteURL = `http://localhost:3001/api/favourite?vacancy_id=${context.params.vacancy_id}`
    const favouriteRes = await fetch(favouriteURL, {
        method: "GET",
        headers: {
            cookie: context.req.headers.cookie
        }
    })
    const favouriteData = await favouriteRes.json()

    let isfavouriteSet = false
    if (favouriteData.payload) {
        if (favouriteData.status == 200) {
            isfavouriteSet = true
        }
    }
    else {
        isfavouriteSet = false
    }

    return {
        props: {
            vacancyData,
            isResponseSet,
            isfavouriteSet,
            key: JSON.stringify(context.params.vacancy_id),
        },
    }
}