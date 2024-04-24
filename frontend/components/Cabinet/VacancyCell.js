import Eye from "@/svgs/Eye";
import Edit from "@/svgs/Edit";
import Trash from "@/svgs/Trash";

export default function VacancyCell({ vacancy_id, title, salary, exp, description }) {
    return (
        <div className="flex gap-[12px] w-full h-[300px] p-[12px] border-l-[6px] border-l-[#FF6F0E] rounded-[6px] hover:bg-[#ffebde] transition ease-in-out duration-300">
            <div className="flex flex-col gap-[12px]">
                <span className='text-[32px] leading-[32px] font-mulish font-[900] text-[#313131]'>{title}</span>
                <span className="text-[24px] leading-[24px] font-mulish font-[700] text-[#313131]">{salary} ₽</span>
                <span className="text-[24px] leading-[24px] font-mulish font-[700] text-[#313131]">Необходимо лет опыта: {exp == 0 ? "Без опыта" : exp}</span>
                <div className="table table-fixed break-words w-fit">
                    <span className="text-[16px] leading-[20px] font-mulish font-[400] text-[#313131] line-clamp-[8]">{description}</span>
                </div>
            </div>

            <div className="flex gap-[12px]">
                <button className="flex justify-center items-center w-[50px] h-[50px] bg-[#53BB6A] rounded-[6px]" title="Посмотреть отклики">
                    <Eye className="w-[24px] h-[24px] fill-[#FFFFFF]" />
                </button>
                <button className="flex justify-center items-center w-[50px] h-[50px] bg-[#FF6F0E] rounded-[6px]" title="Редактировать">
                    <Edit className="w-[24px] h-[24px] fill-[#FFFFFF]" />
                </button>
                <button className="flex justify-center items-center w-[50px] h-[50px] bg-[#858585] rounded-[6px]" title="Удалить">
                    <Trash className="w-[24px] h-[24px] fill-[#FFFFFF]" />
                </button>
            </div>
        </div>
    );
}