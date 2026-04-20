"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse,faBarsStaggered,faFilter,faCalendarDays} from "@fortawesome/free-solid-svg-icons"
import Link from 'next/link'
const Menu = () => {
    return (
        <div className=" border-t-white/50 border-t-[0.2px] p-2 flex xl:px-2 xl:items-center xl:bg-mainbackground xl:gap-6 xl:border-none xl:flex-row flex-col gap-5 text-navbar py-5 px-10 text-[16px]">
            <Link href={'/home'} className='flex gap-2 items-center cursor-pointer hover:text-menubutton'>
                <FontAwesomeIcon icon={faHouse} />
                <p>Trang Chủ</p>
            </Link>
            <button className='flex gap-2 items-center cursor-pointer hover:text-menubutton'>
                <FontAwesomeIcon icon={faBarsStaggered} />
                <p>Thể Loại</p>
            </button>
            <button className='flex gap-2 items-center cursor-pointer hover:text-menubutton'>
                 <FontAwesomeIcon icon={faFilter} />
                <p>Loc Phim</p>
            </button>
            <button className='flex gap-2 items-center cursor-pointer hover:text-menubutton'>
                <FontAwesomeIcon icon={faCalendarDays} />
                <p>Lịch chiếu</p>
            </button>
        </div>
    )
}

export default Menu