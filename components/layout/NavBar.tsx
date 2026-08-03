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
interface NavBarProps {
    user: {
        username: string;
        avatar: string;
    };
}

const NavBar = ({ user }: NavBarProps) => {
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
            {/* Modal tìm kiếm nâng cao */}
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
                        {user ?
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
                        }

                    </div>
                    <div className={`fixed top-0 left-0 h-screen w-[280px] bg-black text-white shadow-2xl z-50 p-6 xl:hidden
                        transform transition-transform duration-300 ease-in-out
                        ${openMenu ? 'translate-x-0' : '-translate-x-full'}`}
                    >
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
                            <span className="font-bold text-lg">Menu</span>
                            <button
                                onClick={() => SetopenMenu(false)}
                                className="text-gray-400 hover:text-white text-xl p-1"
                            >
                                ✕
                            </button>
                        </div>

                        <nav className="flex flex-col gap-4 text-[16px]">
                            <Link href={'/'} onClick={() => SetopenMenu(false)} className="hover:text-blue-500 py-2 border-b border-gray-800/50">
                                Trang Chủ
                            </Link>
                            <Link href={'/anime-pho-bien/trang-1'} onClick={() => SetopenMenu(false)} className="hover:text-blue-500 py-2 border-b border-gray-800/50">
                                Anime phổ biến
                            </Link>
                            <Link href={'/anime-trong-nam/trang-1'} onClick={() => SetopenMenu(false)} className="hover:text-blue-500 py-2 border-b border-gray-800/50">
                                Anime trong năm
                            </Link>
                        </nav>
                    </div>
                </section>
            </div>
        </nav>
    )
}

export default NavBar