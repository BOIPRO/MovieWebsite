"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Thumbs } from 'swiper/modules';
import { BannerType } from '@/app/page';
import BannerItem from './BannerItem';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface BannerProps {
  banners: BannerType[];
}

export default function Banner({ banners }: BannerProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="w-full xl:h-screen bg-[#0b1317] relative">
      <Swiper
        modules={[Autoplay, EffectFade, Thumbs]}
        effect={'fade'}
        fadeEffect={{ crossFade: true }}
        centeredSlides={true}
        loop={true} 
        watchSlidesProgress={true} // Chỉ tính toán tiến trình cho slide trong tầm nhìn
        updateOnWindowResize={true} // Cập nhật mượt mà khi co giãn cửa sổ
        resizeObserver={true} // Sử dụng ResizeObserver hiện đại của trình duyệt thay vì hàm resize Javascript cũ
        
        autoplay={{
          delay: 20000, 
          disableOnInteraction: false,
        }}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        className="w-full h-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={`main-${banner._id}`}>
            {({ isActive}) => (
              <BannerItem banner={banner} isActive={!!isActive} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className=" absolute bottom-8 left-1/2 -translate-x-1/2 z-30 w-full max-w-[1000px] px-5 hidden xl:block">
        <Swiper
          onSwiper={setThumbsSwiper} 
          loop={true} 
          spaceBetween={12} 
          slidesPerView={5} 
          watchSlidesProgress={true}
          modules={[Thumbs]}
          className="thumbs-swiper"
        >
          {banners.map((banner) => (
            <SwiperSlide
              key={`thumb-${banner._id}`}
              className="cursor-pointer rounded-lg overflow-hidden border-2 border-transparent transition-all duration-300 aspect-[16/9]"
            >
              <div className="relative w-full h-full group">
                <Image
                  src={banner.anilistData?.coverImage.large || '/fallback.jpg'}
                  alt={banner.title}
                  fill
                  sizes="200px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300 brightness-75 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[10px] font-bold text-white truncate w-full">{banner.title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Cấu hình CSS */}
      <style jsx global>{`
        .thumbs-swiper .swiper-slide-thumb-active {
          border-color: #FFFF !important;
          box-shadow: 0 4px 20px rgba(37, 99, 235, 0.4);
        }
        .thumbs-swiper .swiper-slide-thumb-active img {
          filter: brightness(110%) !important;
        }
      `}</style>

    </div>
  );
}