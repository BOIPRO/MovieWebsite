"use client"
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from 'next/image'
import { faMagnifyingGlass, faArrowRightToBracket, faBars } from "@fortawesome/free-solid-svg-icons"
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
interface Prop {
    user: {
        username: string
    }
}
const NavBar = ({ user }: Prop) => {
    const [openMenu, SetopenMenu] = useState(false);
    const [openSearch, SetopenSearch] = useState(false);
    const [contextSearch, SetcontextSearch] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter()
    const pathname = usePathname()
    const isHomepage = pathname === '/';
    useEffect(() => {
        // Nếu không phải trang chủ thì mặc định luôn đen, không cần lắng nghe sự kiện scroll
        if (!isHomepage) return;

        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Chạy kiểm tra ngay lần đầu lỡ user reload trang lúc đang cuộn lửng lơ
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHomepage]);
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            router.push(`/search?s=${contextSearch}`)
        }
    }
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetcontextSearch(e.target.value)
    }
    const handleLogout = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        router.refresh();
    };
    const navbarBgClass = isHomepage
        ? isScrolled
            ? 'bg-black/70 backdrop-blur-md text-white shadow-md transition-all duration-300 ease-in-out'
            : 'xl:bg-transparent text-white transition-all duration-300 ease-in-out'
        : 'bg-black/80 backdrop-blur-md text-white shadow-md';
    return (
        <nav className={`${isHomepage ? "xl:fixed" : "sticky"} sticky top-0 left-0 z-50  ${navbarBgClass} `}>
            <div className='w-screen  flex-row   '>
                <section className='flex w-screen px-2  items-center justify-between  pt-2 pb-4 mx-auto'>
                    <div className='flex xl:gap-5 '>
                        <button onClick={() => SetopenMenu(!openMenu)} className='xl:hidden text-[20px] cursor-pointer hover:text-menubutton'>

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
                        <div className="hidden xl:flex items-center text-gray-200 z-500">
                            <Link href={'/'} className='flex gap-2 items-center cursor-pointer hover:text-blue-600'>
                                <p>Trang Chủ</p>
                            </Link>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <button onClick={() => SetopenSearch(!openSearch)} className='text-[20px] cursor-pointer hover:text-menubutton'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                        <Link href={'/login'} className='xl:flex flex-col gap-1 bg-blue-800 rounded-2xl text-[16px]  py-2 px-4 justify-center items-center hidden text-navbar cursor-pointer'>
                            <p>Đăng nhập</p>
                        </Link>
                    </div>
                    <div className={`fixed top-0 left-0 h-screen w-[280px] bg-black text-white shadow-2xl z-50 p-6 xl:hidden
        transform transition-transform duration-300 ease-in-out
        ${openMenu ? 'translate-x-0' : '-translate-x-full'}`}
                    >
                        {/* Đầu Menu: Logo nhỏ và nút X để đóng */}
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
                            <span className="font-bold text-lg"> Menu</span>
                            <button
                                onClick={() => SetopenMenu(false)}
                                className="text-gray-400 hover:text-white text-xl p-1"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Các danh mục nội dung bên trong Menu trượt */}
                        <nav className="flex flex-col gap-4 text-[16px]">
                            <Link href={'/'} onClick={() => SetopenMenu(false)} className="hover:text-blue-500 py-2 border-b border-gray-800/50">
                                Trang Chủ
                            </Link>
                            <Link href={'/phim-le'} onClick={() => SetopenMenu(false)} className="hover:text-blue-500 py-2 border-b border-gray-800/50">
                                Phim Lẻ
                            </Link>
                        </nav>
                    </div>

                    {/* <div className='hidden md:block w-full max-w-100 relative  text-navbar'>
                        <input value={contextSearch ? contextSearch : ""} onKeyDown={handleKeyDown} onChange={handleSearch} className='w-full rounded-2xl border px-10 h-10 focus:rounded-lg transition-all duration-300 ease-in' type="text" placeholder='Tìm kiếm phim' />
                        <FontAwesomeIcon className='absolute top-1/2 -translate-y-1/2 left-1.5 ' icon={faMagnifyingGlass} />
                    </div> */}
                    {/* {user?.username ? (
                        <div className='text-navbar flex gap-2 items-center'>
                            <p className='text-[16px]'>{user.username}</p>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer" >
                                    <Avatar size='lg' >
                                        <AvatarImage
                                            src="https://github.com/shadcn.png"
                                            alt="@shadcn"
                                            className="grayscale"
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='bg-blue backdrop-blur-sm border-white/20 text-white' >
                                    <DropdownMenuGroup>
                                        <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
                                        <DropdownMenuItem>Profile</DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleLogout} >Logout</DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                    ) : (
                        <Link href={'/login'} className='flex flex-col gap-1 bg-blue-800 rounded-2xl text-[16px]  py-2 px-4 justify-center items-center text-navbar cursor-pointer'>
                            <FontAwesomeIcon icon={faArrowRightToBracket} />
                            <p>Đăng nhập</p>
                        </Link>
                    )} */}

                </section>
                {/* <section className='xl:hidden flex-col px-2 bg-slate-950 justify-center border-t-white/50 border-t-[0.2px] '>
                    <div className='flex text-navbar justify-between py-4 text-[20px]'>
                        
                        <button onClick={() => SetopenSearch(!openSearch)} className='cursor-pointer hover:text-menubutton'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </section> */}

            </div>
        </nav>
    )
}

export default NavBar