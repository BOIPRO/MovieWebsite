"use client"
interface pageProps {
    LastPage: number;
    onPageChange: (pageNumber: number) => void;
    currentPage: number
}
const Pagination = ({ LastPage, onPageChange, currentPage }: pageProps) => {
    const page: number[] = [];
    const offset: number = 2;
    const start = Math.max(2, currentPage - offset);
    const end = Math.min(LastPage - 1, currentPage + offset);
    for (let i: number = start; i <= end; i++) {
        page.push(i);
    }
    return (
        <div className={`flex gap-5 justify-center  py-5 text-sm lg:text-lg items-center ${LastPage === 0 ? "hidden" : null}`}>
            <button className={` w-[50px] aspect-square cursor-pointer rounded-sm border-white/20 border-[0.2px] ${currentPage === 1 ? 'hidden' : null} `} disabled={1 === currentPage}
                onClick={() => onPageChange(currentPage - 1)}
            >
                &lt;
            </button>
            <button key={1} className={` w-[50px] aspect-square cursor-pointer rounded-sm border-white/20 border-[0.2px] ${1 === currentPage ? "bg-amber-600" : "hover:-translate-y-1 hover:shadow-lg active:scale-95 transition-all duration-200"}`} disabled={1 === currentPage}
                onClick={() => onPageChange(1)}
            >
                1
            </button>
            {currentPage - 2 > 2 ? <div className="cursor-pointer">
                ...
            </div> : null}
            {page.map((e: number) => (
                <button key={e} className={` w-[50px] aspect-square cursor-pointer rounded-sm border-white/20 border-[0.2px] ${e === currentPage ? "bg-amber-600" : "hover:-translate-y-1 hover:shadow-lg active:scale-95 transition-all duration-200"}`} disabled={e === currentPage}
                    onClick={() => onPageChange(e)}
                >
                    {e}
                </button>
            ))}
            {currentPage + 2 < LastPage ? <div className="cursor-pointer">
                ...
            </div> : null}
            <button key={LastPage === 1 ? 0 : LastPage} className={`w-[50px] aspect-square cursor-pointer rounded-sm border-white/20 border-[0.2px] ${LastPage === 1 ? "hidden" : null}  ${LastPage === currentPage ? "bg-amber-600" : "hover:-translate-y-1 hover:shadow-lg active:scale-95 transition-all duration-200"}`} disabled={LastPage === currentPage}
                onClick={() => onPageChange(LastPage)}
            >
                {LastPage}
            </button>
            <button className={` w-[50px] aspect-square cursor-pointer rounded-sm border-white/20 border-[0.2px] ${LastPage === currentPage ? 'hidden' : null} `} disabled={LastPage === currentPage}
                onClick={() => onPageChange(currentPage + 1)}
            >
                &gt;
            </button>
        </div>
    )
}

export default Pagination