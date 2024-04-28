import { useState, useRef, useEffect } from "react"
import useClickOutside from "@/hooks/useClickOutside"
import Arrow from "@/svgs/Arrow"
import styles from '/styles/VacancyComponents/Dropdowns.module.css'

export default function Dropdowns({ FilterParams }) {
    const [isSalaryDD, setSalaryDD] = useState(false)
    const [isExpDD, setExpDD] = useState(false)

    const [fromSalary, setFromSalary] = useState("")
    const [toSalary, setToSalary] = useState("")
    const [fromExp, setFromExp] = useState("")
    const [toExp, setToExp] = useState("")

    const salaryDDRef = useRef(null)
    useClickOutside(salaryDDRef, () => {
        if (isSalaryDD) setTimeout(() => setSalaryDD(false), 10)
    }, "mouseup")

    const expDDRef = useRef(null)
    useClickOutside(expDDRef, () => {
        if (isExpDD) setTimeout(() => setExpDD(false), 10)
    }, "mouseup")

    function inputFromSalary(event) {
        setFromSalary(event.target.value.replace(/\D/g, ''))
    }

    function inputToSalary(event) {
        setToSalary(event.target.value.replace(/\D/g, ''))
    }

    function inputFromExp(event) {
        setFromExp(event.target.value.replace(/\D/g, ''))
    }

    function inputToExp(event) {
        setToExp(event.target.value.replace(/\D/g, ''))
    }

    // Инициализация значений в фильтре, если таковы были заданы
    useEffect(() => {
        if (FilterParams.min_salary) {
            setFromSalary(FilterParams.min_salary)
        }
        if (FilterParams.max_salary) {
            setToSalary(FilterParams.max_salary)
        }
        if (FilterParams.min_exp) {
            setFromExp(FilterParams.min_exp)
        }
        if (FilterParams.max_exp) {
            setToExp(FilterParams.max_exp)
        }
    }, [FilterParams])

    return (
        <div className="relative flex flex-row gap-[12px]">

            {/* Кнопка Дропдаун зарплаты */}
            <button onClick={() => setSalaryDD(!isSalaryDD)} className="relative w-[150px] h-[40px] max920px:h-[32px] max920px:w-[100px] flex flex-row gap-[10px] justify-between items-center px-[8px] border-[2px] border-[#F3F3F3] rounded-[4px]">
                <span className="text-[18px] leading-[18px] max920px:text-[14px] max920px:leading-[14px] font-mulish font-[600] text-[#404040]">Зарплата</span>
                <Arrow svg_className={`${isSalaryDD ? "rotate-[-90deg]" : "rotate-90"} w-[20px] h-[20px] max920px:w-[14px] max920px:h-[14px] transition ease-in-out duration-300`} path_className="fill-[#000000]" />
            </button>

            {/* Кнопка Дропдаун опыта */}
            <button onClick={() => setExpDD(!isExpDD)} className="relative w-[150px] h-[40px] max920px:h-[32px] max920px:w-[100px] flex flex-row gap-[10px] justify-between items-center px-[8px] border-[2px] border-[#F3F3F3] rounded-[4px]">
                <span className="text-[18px] leading-[18px] max920px:text-[14px] max920px:leading-[14px] font-mulish font-[600] text-[#404040]">Опыт</span>
                <Arrow svg_className={`${isExpDD ? "rotate-[-90deg]" : "rotate-90"} w-[20px] h-[20px] max920px:w-[14px] max920px:h-[14px] transition ease-in-out duration-300`} path_className="fill-[#000000]" />
            </button>

            {/* Поле дропдауна зарплаты */}
            <div ref={salaryDDRef} className={`absolute flex flex-col gap-[20px] w-full z-[2] h-fit p-[12px] mt-[50px] max920px:mt-[42px] bg-[#FFFFFF] border-[2px] border-[#F3F3F3] rounded-[4px] ${isSalaryDD ? styles.active : styles.disabled}`}>

                {/* Заголовок */}
                <div className='flex flex-col gap-[8px]'>
                    <span className='text-[24px] leading-[24px] max920px:text-[18px] max920px:leading-[18px] font-mulish font-[900] text-[#313131]'>Зарплата</span>
                    <div className='w-[50px] h-[4px] max920px:h-[2px] bg-[#FF6F0E]'></div>
                </div>

                {/* Инпуты зарплаты */}
                <div className="flex gap-[12px]">
                    <div className="flex flex-col gap-[12px]">
                        <span className="text-[14px] leading-[14px] font-mulish font-[600] text-[#222231] select-none">От</span>
                        <input id="min_salary" autoComplete="off" className="w-full bg-[#DDDDDD] text-[14px] leading-[14px] font-mulish font-[600] text-[#222231] p-[8px] rounded-[8px] outline-none" placeholder="10" value={fromSalary} onChange={inputFromSalary}></input>
                    </div>

                    <div className="flex flex-col gap-[12px]">
                        <span className="text-[14px] leading-[14px] font-mulish font-[600] text-[#222231] select-none">До</span>
                        <input id="max_salary" autoComplete="off" className="w-full bg-[#DDDDDD] text-[14px] leading-[14px] font-mulish font-[600] text-[#222231] p-[8px] rounded-[8px] outline-none" placeholder="10000" value={toSalary} onChange={inputToSalary}></input>
                    </div>
                </div>
            </div>

            {/* Поле дропдауна опыта */}
            <div ref={expDDRef} className={`flex flex-col gap-[20px] absolute w-full z-[2] p-[12px] mt-[50px] max920px:mt-[42px] bg-[#FFFFFF] border-[2px] border-[#F3F3F3] rounded-[4px] ${isExpDD ? styles.active : styles.disabled}`}>

                {/* Заголовок */}
                <div className='flex flex-col gap-[8px]'>
                    <span className='text-[24px] leading-[24px] max920px:text-[18px] max920px:leading-[18px] font-mulish font-[900] text-[#313131]'>Опыт работы</span>
                    <div className='w-[50px] h-[4px] max920px:h-[2px] bg-[#FF6F0E]'></div>
                </div>

                {/* Инпуты опыта */}
                <div className="flex gap-[12px]">
                    <div className="flex flex-col gap-[12px]">
                        <span className="text-[14px] leading-[14px] font-mulish font-[600] text-[#222231] select-none">От</span>
                        <input id="min_exp" autoComplete="off" className="w-full bg-[#DDDDDD] text-[14px] leading-[14px] font-mulish font-[600] text-[#222231] p-[8px] rounded-[8px] outline-none" placeholder="0" value={fromExp} onChange={inputFromExp}></input>
                    </div>

                    <div className="flex flex-col gap-[12px]">
                        <span className="text-[14px] leading-[14px] font-mulish font-[600] text-[#222231] select-none">До</span>
                        <input id="max_exp" autoComplete="off" className="w-full bg-[#DDDDDD] text-[14px] leading-[14px] font-mulish font-[600] text-[#222231] p-[8px] rounded-[8px] outline-none" placeholder="99" value={toExp} onChange={inputToExp}></input>
                    </div>
                </div>
            </div>
        </div>
    )
}