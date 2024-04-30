import Head from "next/head";
import MainContainer from "@/components/MainComponent";
import ResponseCell from "@/components/ResponsesComponents/ResponseCell";

export default function Responses({ VacancyData, ResumesList }) {
    let title = `Отклики вакансии «${VacancyData.title}»`
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <MainContainer>
                <main className="grow flex flex-col items-center">

                    {/* Враппер под 1140px для новой вакансии */}
                    <div className="w-[1140px] h-fit flex flex-col gap-[32px]">

                        {/* Заголовок */}
                        <div className='flex flex-col mt-[16px] gap-[8px]'>
                            <span className='text-[40px] leading-[40px] font-mulish font-[900] text-[#313131]'>Отклики вакансии «{VacancyData.title}»</span>
                            <div className='w-[140px] h-[6px] bg-[#FF6F0E]'></div>
                        </div>

                        {/* Враппер откликов */}
                        <div className="flex flex-col gap-[16px]">
                            {ResumesList.length > 0
                                ? ResumesList.map(resume => <ResponseCell key={resume.response_id} email={resume.email} description={resume.description} />)
                                : <span className="text-[24px] leading-[24px] self-center font-mulish font-[900] mb-[12px] text-[#313131]">Отклики отсутствуют</span>}
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

    if (verifyData.payload.role != "employer") {
        return {
            redirect: {
                destination: '/401',
                permanent: false,
            },
        }
    }

    const vacancyRes = await fetch(`http://localhost:3001/api/vacancy/getVacancyById?vacancy_id=${context.params.vacancy_id}`)
    const vacancyData = await vacancyRes.json()

    const resumesRes = await fetch(`http://localhost:3001/api/vacancy/response?vacancy_id=${context.params.vacancy_id}`, {
        method: "GET",
        headers: {
            cookie: context.req.headers.cookie
        }
    })
    const resumesData = await resumesRes.json()

    return {
        props: {
            VacancyData: vacancyData.payload,
            ResumesList: resumesData.payload,
        },
    }
}