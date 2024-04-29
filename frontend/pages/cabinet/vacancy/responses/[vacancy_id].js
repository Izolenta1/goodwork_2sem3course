import Head from "next/head";
import MainContainer from "@/components/MainComponent";

export default function Favourite({ ResumesList }) {
    return (
        <>
            <Head>
                <title>Отклики вакансии </title>
            </Head>
            <MainContainer>
                <main className="grow flex flex-col items-center">

                    {/* Враппер под 1140px для новой вакансии */}
                    <div className="w-[1140px] h-fit flex flex-col gap-[32px]">

                        {/* Заголовок */}
                        <div className='flex flex-col mt-[16px] gap-[8px]'>
                            <span className='text-[40px] leading-[40px] font-mulish font-[900] text-[#313131]'>Отклики вакансии </span>
                            <div className='w-[140px] h-[6px] bg-[#FF6F0E]'></div>
                        </div>

                        {/* Враппер откликов */}
                        <div className="flex flex-col gap-[16px]">
                            
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

    const resumesRes = await fetch("http://localhost:3001/api/vacancy/response", {
        method: "GET",
        headers: {
            cookie: context.req.headers.cookie
        }
    })
    const resumesData = await resumesRes.json()

    return {
        props: {
            ResumesList: resumesData.payload,
        },
    }
}