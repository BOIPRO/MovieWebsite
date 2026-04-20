"use client"
import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faArrowRightToBracket, faBars } from "@fortawesome/free-solid-svg-icons"
import Link from 'next/link'
import Menu from './Menu'
import { useRouter } from 'next/navigation'
const NavBar = () => {
    const [openMenu, SetopenMenu] = useState(false);
    const [openSearch, SetopenSearch] = useState(false);
    const [contextSearch,SetcontextSearch] = useState("");
    const router = useRouter()
    const handleKeyDown = (e : React.KeyboardEvent<HTMLInputElement> ) => {
        if (e.key == "Enter") {
            router.push(`/search?s=${contextSearch}`)
        }
    }
    const handleSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
        SetcontextSearch(e.target.value)
    }
    return (
        <nav className=''>
            <div className='bg-mainbackground w-screen xl:flex-row   '>
                <section className='w-full flex flex-col max-w-[1200px] items-center md:flex-row md:justify-between px-2 pt-2 pb-4 mx-auto'>
                    <div className='text-white text-[30px] font-bold tracking-wide py-2'>
                        <p>BMovie</p>
                    </div>
                    <div className='hidden md:block w-full max-w-100 relative  text-navbar'>
                        <input value = {contextSearch? contextSearch : ""} onKeyDown={handleKeyDown}  onChange={handleSearch} className='w-full rounded-2xl border px-10 h-10 focus:rounded-lg transition-all duration-300 ease-in' type="text" placeholder='Tìm kiếm phim' />
                        <FontAwesomeIcon className='absolute top-1/2 -translate-y-1/2 left-1.5 ' icon={faMagnifyingGlass} />
                    </div>
                    <div>
                        <Link href={'/login'}>
                            <div  className='flex flex-col gap-1 bg-slate-800 rounded-md text-[16px]  py-1 px-4 justify-center items-center text-navbar cursor-pointer'>
                                <FontAwesomeIcon icon={faArrowRightToBracket} />
                                <p>Đăng nhập</p>
                            </div>
                        </Link>
                    </div>
                </section>
                <section className='xl:hidden flex-col px-2 bg-slate-950 justify-center border-t-white/50 border-t-[0.2px] '>
                    <div className='flex text-navbar justify-between py-4 text-[20px]'>
                        <button onClick={() => SetopenMenu(!openMenu)} className='cursor-pointer hover:text-menubutton'>
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                        <button onClick={() => SetopenSearch(!openSearch)} className='cursor-pointer hover:text-menubutton'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </section>
                <div
                    className={`grid transition-all duration-300 ease-in-out xl:hidden ${openMenu
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                        }`}
                >
                    {openMenu ? <Menu /> : null}
                </div>
                <div
                    className={`grid transition-all duration-300 ease-in-out xl:hidden ${openSearch
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                        }`}
                >
                    {openSearch ?
                        <div className="bg-mainbackground border-t-white/50 border-t-2 p-2 flex gap-7 text-navbar py-5 px-8 text-xl items-center">
                            <div className='w-full relative'>
                                <input value = {contextSearch? contextSearch : ""} onKeyDown={handleKeyDown} onChange={handleSearch} className='w-full rounded-2xl border px-10 h-10 focus:rounded-lg transition-all duration-300 ease-in' type="text" placeholder='Tìm kiếm phim' />
                                <FontAwesomeIcon className='absolute top-1/2 -translate-y-1/2 left-2 ' icon={faMagnifyingGlass} />
                            </div>
                        </div>
                        : null}
                </div>
            </div>
            <div className='bg-mainbackground hidden xl:flex w-full justify-center border-t-white/50 border-t-[0.2px]'>
                <div className='w-full max-w-[1200px]'>
                    <Menu />
                </div>
            </div>
        </nav>
    )
}

export default NavBar