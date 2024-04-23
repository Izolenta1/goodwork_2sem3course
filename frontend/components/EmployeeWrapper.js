import { useState, useRef, useEffect } from "react";

export default function EmployeeWrapper() {
    const [email, setEmail] = useState("")
    const descriptionRef = useRef(null)

    const [saveInfo, setSaveInfo] = useState("")
    const [isError, setError] = useState(false)

    function sendResumeForm() {
        const form = {
            email: email,
            description: descriptionRef.current.innerText,
        }

        // Выполнение запроса
        let url = `/api/resume`
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

    useEffect(() => {
        // Выполнение запроса
        let url = `/api/resume`
        fetch(url, {
            method: "GET"
        })
            .then(response_data => response_data.json())
            .then(response_data => {
                if (response_data.status == 200) {
                    setEmail(response_data.payload.email)
                    descriptionRef.current.innerHTML = response_data.payload.description
                }
            })
    }, [])

    return (
        <main className="grow flex flex-col items-center">

            {/* Враппер под 1140px для страницы соискателя */}
            <div className="w-[1140px] h-fit flex flex-col gap-[32px]">

                {/* Заголовок */}
                <div className='flex flex-col mt-[16px] gap-[8px]'>
                    <span className='text-[40px] leading-[40px] font-mulish font-[900] text-[#313131]'>Ваше резюме</span>
                    <div className='w-[140px] h-[6px] bg-[#FF6F0E]'></div>
                </div>

                {/* Поле почты для связи */}
                <div className="flex flex-col gap-[8px]">
                    <span className="text-[20px] leading-[20px] font-[500] font-mulish text-[#000000]">Почта для связи <span className="text-[#FF5C35]">*</span></span>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="relative w-full h-[30px] rounded-[8px] outline-none pl-[12px] bg-[#dddddd] text-[14px] leading-[14px] font-[500] font-mulish text-[#222231] opacity-50 placeholder:text-[#222231]" placeholder="Ваша почта"></input>
                </div>

                {/* Поле для резюме */}
                <div className="flex flex-col gap-[8px]">
                    <span className="text-[20px] leading-[20px] font-[500] font-mulish text-[#000000]">Текст резюме <span className="text-[#FF5C35]">*</span></span>
                    <div ref={descriptionRef} className="relative w-full min-h-[600px] rounded-[8px] outline-none p-[12px] bg-[#dddddd] text-[14px] leading-[18px] font-[500] font-mulish text-[#222231] opacity-50 placeholder:text-[#222231]" contentEditable></div>
                </div>

                {/* Текст ошибки */}
                {saveInfo == "" ? null : <span className={`text-[16px] leading-[16px] font-[500] font-mulish ${isError ? "text-[#FF5C35]" : "text-[#53BB6A]"} `}>{saveInfo}</span>}

                <button onClick={() => sendResumeForm()} className="w-[195px] h-[45px] bg-[#FF6F0E] rounded-[6px] flex justify-center items-center text-[18px] leading-[18px] font-[700] font-mulish text-[#FFFFFF]">Сохранить</button>
            </div>
        </main>
    );
}