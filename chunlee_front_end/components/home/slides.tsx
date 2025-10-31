"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { homeSlides } from "@/lib/data";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";

export const Slides = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<div className='slideContainer w-full aspect-square lg:h-screen'>
			<Swiper
				spaceBetween={30}
				centeredSlides={true}
				speed={1000}
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
				}}
				pagination={false}
				navigation={false}
				modules={[Autoplay, Pagination, Navigation, EffectFade]}
				effect='fade'
				fadeEffect={{
					crossFade: true, // ← 加上這個讓轉場更順暢
				}}
				loop={true}
				className='w-full h-full'
				// 用這個 prop 監聽切換！自動和手動都會觸發
				onRealIndexChange={(swiper: SwiperType) => {
					setActiveIndex(swiper.realIndex);
				}}>
				{homeSlides.map((slide, index) => {
					return (
						<SwiperSlide key={index} className='w-full h-full relative'>
							<Image
								src={slide.imageUrl}
								alt={slide.title}
								fill
								quality={100}
								style={{ objectFit: "cover" }}
								priority={index === 0}
							/>
							<div
								className={`absolute flex flex-col justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center gap-4 lg:gap-10  "
								${
									index === activeIndex
										? "opacity-100 duration-800 transition-all"
										: "opacity-0 translate-x-full "
								}
								`}>
								<h2 className='text-white text-2xl md:text-4xl lg:text-6xl font-bold'>
									{slide.title}
								</h2>
								<div className='border-b w-[150px] lg:w-[300px] border-[#10243d]'></div>
								<p className='text-white text-base md:text-lg lg:text-3xl'>
									{slide.slogan}
								</p>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};
