import Link from "next/link";

export default function VacancyCell({ vacancy_id, title, salary, exp, description }) {
    return (
        <div className="flex gap-[12px] w-full p-[12px] border-l-[6px] border-l-[#FF6F0E] rounded-[6px] hover:bg-[#ffebde] transition ease-in-out duration-300">
            <div className="flex flex-col gap-[12px]">
                <Link href={`/vacancy/${vacancy_id}`} className='text-[32px] leading-[32px] font-mulish font-[900] text-[#313131]'>{title}</Link>
                <span className="text-[24px] leading-[24px] font-mulish font-[700] text-[#313131]">{salary} ₽</span>
                <span className="text-[24px] leading-[24px] font-mulish font-[700] text-[#313131]">Необходимо лет опыта: {exp == 0 ? "Без опыта" : exp}</span>
                <div className="table table-fixed break-words w-fit">
                    <span className="text-[16px] leading-[20px] font-mulish font-[400] text-[#313131] line-clamp-[5]">{description}</span>
                </div>

                <Link href={`/vacancy/${vacancy_id}`} className="h-[50px] w-[150px] flex justify-center items-center bg-[#FF6F0E] rounded-[4px] text-[16px] leading-[16px] font-mulish font-[600] text-[#FFFFFF]">Подробнее</Link>
            </div>
        </div>
    );
}