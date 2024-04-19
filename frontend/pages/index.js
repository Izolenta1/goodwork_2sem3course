import Head from "next/head";
import MainContainer from "@/components/MainComponent";

export default function Index() {
    return (
        <>
            <Head>
                <title>Главная</title>
            </Head>
            <MainContainer>
                <main className="grow flex flex-col items-center">
                    {/* Враппер под 1140px для страницы корзины */}
                    <div className="w-[1140px]  h-fit flex flex-col gap-[32px] max920px:gap-[16px]">

                        {/* Заголовок */}
                        <div className='flex flex-col mt-[16px] gap-[8px]'>
                            <span className='text-[40px] leading-[40px] font-mulish font-[900] text-[#313131]'>Good work</span>
                            <div className='w-[140px] h-[6px] bg-[#FF6F0E]'></div>
                        </div>

                        <span className="text-[24px] leading-[42px] font-[600] font-mulish text-[#000000]">
                            Работа составляет большую часть жизни почти каждого из нас. Но ничто не вечно: случается, что однажды приходится менять место работы и с головой погружаться в поиски вакансий — хочется ведь найти хорошую альтернативу текущей должности.
                            <br></br><br></br>
                            Однако зачастую при смене работы мы задумываемся не только о смене компании, но и об изменении профессиональной деятельности. И именно в эти моменты возникает вопрос: «Как теперь найти хорошую работу в Москве? А главное, какой должна быть эта работа?»
                            <br></br><br></br>
                            Добро пожаловать на "Good Work" - ваше надежное онлайн-решение для поиска работы! Мы понимаем, как важно найти не просто работу, а именно ту, которая будет соответствовать вашим навыкам, интересам и карьерным целям.
                        </span>

                    </div>
                </main>
            </MainContainer>
        </>
    );
}