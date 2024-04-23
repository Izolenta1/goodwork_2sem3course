import { useContext } from "react";
import Head from "next/head";
import MainContainer from "@/components/MainComponent";
import { GlobalPageContext } from "@/context/globalPageContext";
import EmployeeWrapper from "@/components/EmployeeWrapper";
import EmployerWrapper from "@/components/EmployerWrapper";

export default function Cabinet() {
    const {userData} = useContext(GlobalPageContext)

    return (
        <>
            <Head>
                <title>Личный кабинет</title>
            </Head>
            <MainContainer>
                {userData.role == "employee" ? <EmployeeWrapper /> : <EmployerWrapper />}
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

    return {
        props: {

        },
    }
}