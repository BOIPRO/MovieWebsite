'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
interface ResponseSuggest {
    _id: string,
    anilistId: number,
    slug: string,
    anilistData: {
        coverImage: {
            large: string
        },
        seasonYear: number,
    }
    title: string[],

}
// Icon tìm kiếm (dùng SVG đơn giản)
const SearchIcon = () => (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
);

// Icon mũi tên (dùng SVG)
const ChevronRight = () => (
    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
);
interface AdvancedSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}
export default function AdvancedSearchModal({ isOpen, onClose }: AdvancedSearchModalProps) {
    const [topPosition, setTopPosition] = useState(0);
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState(''); // Mock dữ liệu đã gõ
    const [selectedIndex, setSelectedIndex] = useState(0); // Để track item đang được chọn trong danh sách
    const [results, setResults] = useState<ResponseSuggest[]>([]);
    useEffect(() => {
        if (isOpen) {
            // Khóa cuộn trang khi mở
            const scrollY = window.scrollY;
            setTopPosition(scrollY + window.innerHeight / 2);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        const handleEsc = (e: any) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEsc)
        };
    }, [isOpen, onClose]);
    useEffect(() => {
        // Nếu searchTerm quá ngắn (dưới 2 ký tự), không fetch
        if (searchTerm.length < 2) {
            setResults([]);
            return;
        }
        const controller = new AbortController();
        // Debounce: Chờ 300ms sau khi người dùng ngừng gõ mới gọi API
        const delayDebounceFn = setTimeout(async () => {
            try {
                const response = await fetch(`/api/bemovie/movies/suggest?q=${encodeURIComponent(searchTerm)}`);
                const data: ResponseSuggest[] = await response.json();
                setResults(data);
            } catch (error) {
                console.error("Lỗi fetch:", error);
            }
        }, 300);

        return () => {
            clearTimeout(delayDebounceFn);
            controller.abort();
        };
    }, [searchTerm]);

    const selectedResult = results[selectedIndex];
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // Giả sử searchTerm là state lưu giá trị input
            if (searchTerm.trim()) {
                // Chuyển hướng sang trang search
                router.push(`/search/${encodeURIComponent(searchTerm)}/trang-1`);

                // Tùy chọn: Đóng popup hoặc reset state nếu cần
                onClose();
            }
        }
    };
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {/* Lớp phủ mờ (backdrop) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-{topPosition}px z-1000 left-0 right-0 overflow-hidden h-screen bg-black/80 flex  justify-center items-center p-10  cursor-pointer"
                onClick={onClose}
            >
                {/* Container chính của khung tìm kiếm, ngăn sự kiện đóng khi click vào */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="w-full max-w-4xl bg-neutral-950  rounded-xl shadow-2xl overflow-hidden cursor-default"
                    onClick={(e) => e.stopPropagation()}
                >

                    {/* Phần Header: Thanh tìm kiếm + Nút Advanced Search */}
                    <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                        <div className="flex-grow relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon />
                            </div>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search..."
                                className="w-full bg-neutral-900 text-white rounded-md py-2.5 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoFocus
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <button
                            onClick={onClose}
                            className="text-sm text-gray-400 hover:text-white text-[16px] ml-6 flex items-center cursor-pointer"
                        >
                            X
                        </button>
                    </div>

                    {/* Phần Body: Danh sách gợi ý + Khung xem trước */}
                    <div className="flex h-[300px] xl:h-[450px]">

                        {/* Cột bên trái: Danh sách kết quả (Dropdown content) */}
                        <div className="scrollbar-hide w-2/5 border-r border-gray-700 p-4 space-y-2 overflow-y-auto">
                            {results.map((item, index) => (
                                <div
                                    key={item._id}
                                    className={`flex items-center p-2 rounded-lg cursor-pointer ${index === selectedIndex ? 'bg-[#2A2A2A]' : 'hover:bg-[#222222]'}`}
                                    onMouseEnter={() => setSelectedIndex(index)}
                                >
                                    <div className="relative w-12 h-16 flex-shrink-0 mr-3">
                                        <Image src={item.anilistData.coverImage.large} alt={item.title[0]} fill sizes="100px" className="rounded object-cover" />
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="text-white text-sm font-medium leading-tight">{item.title}</h4>
                                        {/* {item.isSpecial && <p className="text-blue-400 text-xs mt-1">Xem chi tiết</p>} */}
                                    </div>
                                    {/* {item.isSpecial && <ChevronRight />} */}
                                </div>
                            ))}
                        </div>

                        {/* Cột bên phải: Khung xem trước (Preview Panel) */}
                        <div className="w-3/5 p-12 flex justify-center flex-col  items-center">
                            {selectedResult ? (
                                <>
                                    <div className="flex flex-col gap-3 items-center">
                                        <div className="relative w-48 aspect-square shadow-lg">
                                            <Image
                                                src={selectedResult.anilistData.coverImage.large}
                                                alt={selectedResult.title[0]}
                                                fill

                                                sizes="100px"
                                                className="rounded-lg object-contain"
                                            />
                                        </div>
                                        <h2 className="text-white text-[16px] font-bold text-center leading-tight">{selectedResult.title[0]}</h2>
                                        <p className="text-gray-400 text-sm ">
                                            {selectedResult.anilistData.seasonYear}
                                        </p>
                                        <Link onClick={onClose} prefetch={false} href={`/info/${selectedResult.slug}-${selectedResult.anilistId}`} className=" w-full max-w-xs text-center  bg-neutral-300 cursor-pointer text-black text-[16px] font-bold py-3 rounded-lg hover:bg-neutral-100 transition duration-150">
                                            Xem chi tiết
                                        </Link>
                                    </div>

                                </>
                            ) : (
                                <div className="text-gray-500 h-full flex items-center justify-center">
                                   Nếu không có kết quả gợi ý thì bấm enter để tìm rộng hơn
                                </div>
                            )}
                        </div>
                    </div>

                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}