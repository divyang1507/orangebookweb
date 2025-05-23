'use client';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const HeroSlider = () => {
    const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide><div className='h-120 bg-blue-50'>Auto</div></SwiperSlide>
        <SwiperSlide><div className='h-120 bg-blue-50'>Auto</div></SwiperSlide>
        <SwiperSlide><div className='h-120 bg-blue-50'>Slide 3 Auto</div></SwiperSlide>
        <SwiperSlide><div className='h-120 bg-blue-50'>Slide 4 Auto</div></SwiperSlide>
        <SwiperSlide><div className='h-120 bg-blue-50'>Slide 5 Auto</div></SwiperSlide>
        <SwiperSlide><div className='h-120 bg-blue-50'>Slide 6 Auto</div></SwiperSlide>
        <SwiperSlide><div className='h-120 bg-blue-50'>Slide 7 Auto</div></SwiperSlide>
        <SwiperSlide><div className='h-120 bg-blue-50'>Slide 8 Auto</div></SwiperSlide>
        <SwiperSlide><div className='h-120 bg-blue-50'>Slide 9 Auto</div></SwiperSlide>
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
      </>
  )
}

export default HeroSlider
