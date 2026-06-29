'use client';

import { useState } from 'react';
import Link from 'next/link';

const Menu = () => {
  // State quản lý trạng thái đóng/mở của menu trượt
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* --- MÀN HÌNH LỚN (Code gốc của bạn) --- */}
      <div className="hidden xl:flex items-center text-gray-200 z-500">
        <Link href={'/'} className='flex gap-2 items-center cursor-pointer hover:text-blue-600'>
          <p>Trang Chủ</p>
        </Link>
      </div>
      <button
        onClick={() => setIsOpen(true)}
        className="flex xl:hidden p-2 text-gray-200 hover:text-blue-600 transition-colors font-medium"
      >
        ☰ Menu
      </button>

      {/* --- LỚP NỀN MỜ (OVERLAY) --- */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 xl:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)} // Bấm ra ngoài menu sẽ đóng lại
        />
      )}

      {/* --- SIDEBAR TRƯỢT TỪ TRÁI SANG --- */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-slate-900 text-gray-200 shadow-2xl z-50 p-6 xl:hidden
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Tiêu đề & Nút đóng Menu */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
          <span className="font-bold text-lg text-blue-500">Điều Hướng</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white text-xl p-1"
          >
            ✕
          </button>
        </div>

        {/* Danh sách các Link (Sử dụng lại component Link của bạn) */}
        <nav className="flex flex-col gap-4">
          <Link 
            href={'/'} 
            onClick={() => setIsOpen(false)} // Bấm vào link thì tự đóng menu
            className='flex gap-2 items-center cursor-pointer hover:text-blue-600 py-2 px-3 rounded hover:bg-slate-800 transition-colors'
          >
            <p>🏠 Trang Chủ</p>
          </Link>
          
          {/* Bạn có thể thêm các Link khác ở đây y hệt như trên */}
          <Link 
            href={'/phim'} 
            onClick={() => setIsOpen(false)}
            className='flex gap-2 items-center cursor-pointer hover:text-blue-600 py-2 px-3 rounded hover:bg-slate-800 transition-colors'
          >
            <p>🎬 Danh Sách Phim</p>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Menu;