import Head from "next/head";
import MainContainer from "@/components/MainComponent";
import VacancyCell from "@/components/VacancyComponents/VacancyCell";

export default function Favourite({ VacanciesList }) {
    return (
        <>
            <Head>
                <title>Избранные вакансии</title>
            </Head>
            <MainContainer>
                <main className="grow flex flex-col items-center">

                    {/* Враппер под 1140px для новой вакансии */}
                    <div className="w-[1140px] h-fit flex flex-col gap-[32px]">

                        {/* Заголовок */}
                        <div className='flex flex-col mt-[16px] gap-[8px]'>
                            <span className='text-[40px] leading-[40px] font-mulish font-[900] text-[#313131]'>Избранные вакансии</span>
                            <div className='w-[140px] h-[6px] bg-[#FF6F0E]'></div>
                        </div>

                        {/* Враппер избранных вакансий */}
                        <div className="flex flex-col gap-[16px]">
                            {VacanciesList.length > 0
                                ? VacanciesList.map(vacancy => <VacancyCell key={vacancy.vacancy_id} vacancy_id={vacancy.vacancy_id} title={vacancy.title} salary={vacancy.salary} exp={vacancy.experience} description={vacancy.description} />)
                                : <span className="text-[24px] leading-[24px] self-center font-mulish font-[900] text-[#313131]">Вакансии не найдены</span>}
                        </div>
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

    if (verifyData.payload.role != "employee") {
        return {
            redirect: {
                destination: '/401',
                permanent: false,
            },
        }
    }

    const vacanciesRes = await fetch("http://localhost:3001/api/vacancy/favourite", {
        method: "GET",
        headers: {
            cookie: context.req.headers.cookie
        }
    })
    const vacanciesData = await vacanciesRes.json()

    return {
        props: {
            VacanciesList: vacanciesData.payload,
        },
    }
}