"use client"
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from 'next/image'
import { faMagnifyingGlass, faBars } from "@fortawesome/free-solid-svg-icons"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/lib/services/useAuthStore'
import AdvancedSearchModal from '../common/AdvancedSearch'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
// interface NavBarProps {
//     user: {
//         username: string;
//         avatar: string;
//     };
// }

const NavBar = () => {
    const router = useRouter()
    const [openMenu, SetopenMenu] = useState(false);
    const [openSearch, SetopenSearch] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [openProfile, setopenProfile] = useState(false)
    const queryClient = useQueryClient()
    const pathname = usePathname()
    const useAuthenStore = useAuthStore as any
    const isHomepage = pathname === '/';

    useEffect(() => {
        if (!isHomepage) return;

        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHomepage]);

    const handleLogout = async () => {
        await fetch(`/api/bemovie/auth/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        queryClient.clear();
        useAuthenStore.getState().clearAuth();
        router.refresh();
    };

    const navbarBgClass = isHomepage
        ? isScrolled
            ? 'bg-black/70 backdrop-blur-md text-white shadow-md transition-all duration-300 ease-in-out'
            : 'xl:bg-transparent text-white transition-all duration-300 ease-in-out'
        : 'bg-black/80 backdrop-blur-md text-white shadow-md';

    return (
        <nav className={`${isHomepage ? "sticky xl:fixed" : "sticky"}  top-0 w-full px-5 z-50 ${navbarBgClass}`}>
            <AdvancedSearchModal isOpen={openSearch} onClose={() => SetopenSearch(false)} />
            <div className='flex-row'>
                <section className='flex px-2 items-center justify-between pt-2 pb-4 mx-auto'>
                    <div className='flex xl:gap-5 items-center'>
                        <button onClick={() => SetopenMenu(!openMenu)} className='xl:hidden text-[20px] cursor-pointer hover:text-blue-500'>
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                        <div className='text-white py-2 flex items-center'>
                            <Image
                                src="/icons/BMovie.svg"
                                alt="BMovie Logo"
                                width={0}
                                height={0}
                                style={{ width: '75px', height: 'auto' }} />
                            <p className='xl:text-[30px] text-[25px]'>BMovie</p>
                        </div>
                        <div className="hidden xl:flex gap-5 items-center text-gray-200 z-500">
                            <Link href={'/'} className='flex gap-2 items-center cursor-pointer hover:text-blue-600'>
                                <p>Trang Chủ</p>
                            </Link>
                            <Link href={'/anime-pho-bien/trang-1'} className='flex gap-2 items-center cursor-pointer hover:text-blue-600'>
                                <p>Anime Phổ Biến</p>
                            </Link>
                            <Link href={'/anime-trong-nam/trang-1'} className='flex gap-2 items-center cursor-pointer hover:text-blue-600'>
                                <p>Anime Trong Năm</p>
                            </Link>
                        </div>
                    </div>

                    <div className='flex items-center gap-4'>
                        <button
                            onClick={() => SetopenSearch(true)}
                            className='cursor-pointer text-[20px] hover:text-blue-500 p-2 text-white'
                            title="Tìm kiếm"
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                        {/* {user ?
                            <div className="relative">
                                <button
                                    onClick={() => setopenProfile(!openProfile)}
                                    className="w-12 h-12 overflow-hidden rounded-full border border-zinc-700 bg-zinc-800 cursor-pointer"
                                >
                                    <img
                                        src={user.avatar}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </button>

                                <div
                                    className={`absolute right-0 top-full mt-2 w-52 origin-top-right overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 shadow-2xl
      transition-all duration-200 ease-out
      ${openProfile
                                            ? "translate-y-0 scale-100 opacity-100 pointer-events-auto"
                                            : "-translate-y-2 scale-95 opacity-0 pointer-events-none"
                                        }`}
                                >
                                    <Link
                                        href="/profile"
                                        className="flex items-center px-4 py-3 text-sm text-gray-200 transition-all duration-200 hover:bg-neutral-800 hover:pl-5"
                                    >
                                        Thông tin cá nhân
                                    </Link>

                                    <div className="h-px bg-neutral-800" />

                                    <button
                                        onClick={handleLogout}
                                        className=" flex w-full items-center px-4 py-3 text-left text-sm text-red-400 transition-all duration-200 hover:bg-red-500/10 hover:pl-5 hover:text-red-300"
                                    >
                                        Đăng xuất
                                    </button>
                                </div>
                            </div>
                            :
                            <Link href={'/login'} className='xl:flex flex-col gap-1 bg-blue-800 rounded-2xl text-[16px] py-2 px-4 justify-center items-center hidden text-white cursor-pointer'>
                                <p>Đăng nhập</p>
                            </Link>
                        } */}

                    </div>
                    <div
                        className={`fixed top-0 h-screen left-0 z-50 w-[300px]
    bg-neutral-950/95 backdrop-blur-xl
    border-r border-neutral-800
    shadow-[0_0_50px_rgba(0,0,0,0.6)]
    transition-all duration-300 ease-out
    ${openMenu
                                ? "translate-x-0 opacity-100"
                                : "-translate-x-full opacity-0"
                            }
    xl:hidden`}
                    >
                        <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-5">
                            {/* {user ? 
                            <div className='flex items-center gap-2 text-[16px]'>
                                 <div
                                    className="w-12 h-12 overflow-hidden rounded-full border border-zinc-700 bg-zinc-800"
                                >
                                    <img
                                        src={user.avatar}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                
                                </div>
                                <p>{user.username}</p>
                            </div>
                            
                            : 
                              <Link href={'/login'} className='flex flex-col gap-1 bg-blue-800 rounded-2xl text-[16px] py-2 px-4 justify-center items-center  text-white cursor-pointer'>
                                <p>Đăng nhập</p>
                            </Link>
                            } */}
                            <button
                                onClick={() => SetopenMenu(false)}
                                className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-800 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        <nav className="mt-4 flex flex-col px-4 z-50">

                            <Link
                                href="/"
                                onClick={() => SetopenMenu(false)}
                                className="group flex items-center gap-3 rounded-xl px-4 py-3 transition-all hover:bg-neutral-900"
                            >
            
                                <span className="text-neutral-200 group-hover:text-white">
                                    Trang chủ
                                </span>
                            </Link>

                            <Link
                                href="/anime-pho-bien/trang-1"
                                onClick={() => SetopenMenu(false)}
                                className="group mt-2 flex items-center gap-3 rounded-xl px-4 py-3 transition-all hover:bg-neutral-900"
                            >
                               
                                <span className="text-neutral-200 group-hover:text-white">
                                    Anime phổ biến
                                </span>
                            </Link>

                            <Link
                                href="/anime-trong-nam/trang-1"
                                onClick={() => SetopenMenu(false)}
                                className="group mt-2 flex items-center gap-3 rounded-xl px-4 py-3 transition-all hover:bg-neutral-900"
                            >
                              
                                <span className="text-neutral-200 group-hover:text-white">
                                    Anime trong năm
                                </span>
                            </Link>
                        </nav>

                        <div className="absolute bottom-0 w-full border-t border-neutral-800 p-5">
                            <p className="text-center text-xs text-neutral-500">
                                © 2026 BoiMovie
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </nav>
    )
}

export default NavBar