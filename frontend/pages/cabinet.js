import { useContext } from "react";
import Head from "next/head";
import MainContainer from "@/components/MainComponent";
import EmployeeWrapper from "@/components/EmployeeWrapper";
import EmployerWrapper from "@/components/EmployerWrapper";

export default function Cabinet({ UserRole }) {
    return (
        <>
            <Head>
                <title>Личный кабинет</title>
            </Head>
            <MainContainer>
                {UserRole == "employee" ? <EmployeeWrapper /> : <EmployerWrapper />}
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
            UserRole: verifyData.payload.role,
            key: verifyData.payload.role
        },
    }
}