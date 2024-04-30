export default function ResponseCell({ email, description }) {
    return (
        <div className="flex flex-col gap-[8px] p-[12px] border-[2px] border-[#FF6F0E]">
            <div className='flex flex-col gap-[8px]'>
                <span className='text-[24px] leading-[24px] font-mulish font-[900] text-[#313131]'>{email}</span>
                <div className='w-[140px] h-[3px] bg-[#FF6F0E]'></div>
            </div>
            <span>{description}</span>
        </div>
    );
}