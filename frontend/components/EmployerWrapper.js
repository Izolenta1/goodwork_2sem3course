import Eye from "@/svgs/Eye";
import Edit from "@/svgs/Edit";
import Trash from "@/svgs/Trash";

export default function EmployerWrapper() {
    return (
        <main className="grow flex flex-col items-center">

            {/* Враппер под 1140px для страницы работодателя */}
            <div className="w-[1140px] h-fit flex flex-col gap-[32px]">

                {/* Заголовок */}
                <div className='flex flex-col mt-[16px] gap-[8px]'>
                    <span className='text-[40px] leading-[40px] font-mulish font-[900] text-[#313131]'>Ваши вакансии</span>
                    <div className='w-[140px] h-[6px] bg-[#FF6F0E]'></div>
                </div>

                <button></button>

                {/* Враппер вакансий */}
                <div className="flex flex-col gap-[16px]">
                    <div className="flex gap-[12px] w-full h-[300px] p-[12px] border-l-[6px] border-l-[#FF6F0E] rounded-[6px] hover:bg-[#ffebde] transition ease-in-out duration-300">
                        <div className="flex flex-col gap-[12px]">
                            <span className='text-[32px] leading-[32px] font-mulish font-[900] text-[#313131]'>Python разработчик</span>
                            <span className="text-[24px] leading-[24px] font-mulish font-[700] text-[#313131]">250000 ₽</span>
                            <span className="text-[24px] leading-[24px] font-mulish font-[700] text-[#313131]">Необходимо лет опыта: 6</span>
                            <div className="table table-fixed break-words w-fit">
                                <span className="text-[16px] leading-[20px] font-mulish font-[400] text-[#313131] line-clamp-[8]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
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
                </div>
            </div>
        </main>
    );
}