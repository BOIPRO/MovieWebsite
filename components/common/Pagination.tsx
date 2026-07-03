"use client"
import Link from "next/link";
interface pageProps {
    route: string;
    LastPage: number;
    currentPage: number
}
const Pagination = ({ route, LastPage, currentPage }: pageProps) => {
    const page: number[] = [];
    const offset: number = 2;
    const start = Math.max(2, currentPage - offset);
    const end = Math.min(LastPage - 1, currentPage + offset);
    for (let i: number = start; i <= end; i++) {
        page.push(i);
    }
    return (
        <div className={`flex  gap-4 flex-wrap justify-center  py-5 text-[16px] sm:text-base  items-center ${LastPage === 0 ? "hidden" : null}`}>
            <Link href={`${route}/trang-1`} key={1} className={` h-[40px] px-2 flex justify-center items-center  text-nowrap cursor-pointer border-white/20 border-[0.2px] ${1 === currentPage ? "bg-amber-600" : "hover:-translate-y-1 hover:shadow-lg active:scale-95 transition-all duration-200"}`}
            >
                Trang Đầu
            </Link>
            {page.map((e: number) => (
                <Link href={`${route}/trang-${e}`} key={e} className={` w-[40px] px-2  flex justify-center items-center  aspect-square cursor-pointer  border-white/20 border-[0.2px] ${e === currentPage ? "bg-amber-600" : "hover:-translate-y-1 hover:shadow-lg active:scale-95 transition-all duration-200"}`}
                >
                    {e}
                </Link>
            ))}
            <Link href={`${route}/trang-${LastPage === 1 ? 0 : LastPage}`} key={LastPage === 1 ? 0 : LastPage} className={`h-[40px]  flex justify-center items-center  px-2 cursor-pointer rounded-sm border-white/20 border-[0.2px] ${LastPage === 1 ? "hidden" : null}  ${LastPage === currentPage ? "bg-amber-600" : "hover:-translate-y-1 hover:shadow-lg active:scale-95 transition-all duration-200"}`} 
            >
                Trang Cuối
            </Link>
        </div>
    )
}

export default Pagination