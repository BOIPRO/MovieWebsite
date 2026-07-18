"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Swiper as SwiperCore } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Thumbs } from 'swiper/modules';
import { BannerType } from '@/types/banner';
import BannerItem from './BannerItem';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/thumbs';

interface BannerProps {
  banners: BannerType[];
}

export default function Banner({ banners }: BannerProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
  const mainSwiperRef = useRef<SwiperCore | null>(null);

  // Ép buộc update khi resize để tránh lỗi sai tọa độ
  useEffect(() => {
    const handleResize = () => {
      if (mainSwiperRef.current) {
        mainSwiperRef.current.update();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
   <div className=" w-full  xl:h-screen aspect-video bg-[#0b1317] relative overflow-hidden banner-container">
      <Swiper
        onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
        modules={[Autoplay, EffectFade, Thumbs]}
        effect={'fade'}
        fadeEffect={{ crossFade: true }}
        centeredSlides={true}
        loop={true}
        observer={true}
        observeParents={true}
        resizeObserver={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        className="w-full h-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={`main-${banner.anilistId}-${banner.firstEpisode}`}>
            {({ isActive }) => (
              <BannerItem banner={banner} isActive={!!isActive} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30  w-full max-w-[1000px]  px-5 hidden xl:block">
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
                  className="object-cover transition-transform duration-500 group-hover:scale-110 brightness-75 group-hover:brightness-100"
                />
                 <div className="absolute inset-0 bg-black/40 flex items-end p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[16px] font-bold text-white truncate w-full">{banner.title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .banner-container {
          contain: layout size;
        }

      
        .thumbs-swiper .swiper-slide {
          will-change: transform;
        }
        .thumbs-swiper .swiper-slide-thumb-active {
          border-color: #FFF !important;
          box-shadow: 0 4px 20px rgba(37, 99, 235, 0.4);
        }
        .thumbs-swiper .swiper-slide-thumb-active img {
          filter: brightness(110%) !important;
        }

     
        .swiper-slide {
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}