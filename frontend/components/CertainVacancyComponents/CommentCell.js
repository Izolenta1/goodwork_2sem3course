export default function CommentCell({ username, comment }) {
    return (
        <div className="flex flex-col gap-[8px] p-[12px] border-[2px] border-[#FF6F0E]">
            <div className='flex flex-col gap-[8px]'>
                <span className='text-[24px] leading-[24px] font-mulish font-[900] text-[#313131]'>{username}</span>
                <div className='w-[140px] h-[3px] bg-[#FF6F0E]'></div>
            </div>
            <span>{comment}</span>
        </div>
    );
}