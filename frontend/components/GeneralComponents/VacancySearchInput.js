import SearchLens from "@/svgs/SearchLens";

export default function VacancySearchInput() {
    return (
        <div className="flex">
            <input className="w-[350px] h-[50px] pl-[25px] rounded-l-[50px] border-y-[1px] border-l-[1px] border-[#D9D9D9] outline-none text-[12px] leading-[12px] font-[400] font-mulish text-[#000000]" placeholder="Поиск"></input>
            <button className="flex justify-center items-center w-[50px] h-[50px] bg-[#FFFFFF] rounded-r-[50px] border-y-[1px] border-r-[1px] border-[#D9D9D9]">
                <SearchLens className="w-[16px] h-[16px] fill-[#000000]" />
            </button>
        </div>
    );
}