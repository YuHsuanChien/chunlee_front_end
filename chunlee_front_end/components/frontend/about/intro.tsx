"use client";
import { useState } from "react";
import Image from "next/image";

interface IntroData {
	title: string;
	description: string;
	imgUrl: string;
}

export const Intro = () => {
	const [data] = useState<IntroData[]>([
		{
			title: "我們的開始",
			description:
				"有鑑於國內外經營環境發生巨大變化，中國大陸與東南亞市場的崛起，而企業的深耕化與全球化，都需要豐富的知識與經驗。為協助企業提升競爭力及生存利基為目的，故群聚了擁有豐富的實務專家成立公司。",
			imgUrl: "/images/about/intro_1.png",
		},
		{
			title: "我們的故事",
			description:
				"我們的價值在於創新･績效･成長，我們的精神是一日服務、終身服務",
			imgUrl: "/images/about/intro_2.png",
		},
		{
			title: "我們的團隊",
			description:
				"本公司聘請顧問界名師  彭信良先生掌舵出任總經理，帶領製造業、批發業、物流業、零售業及服務業之輔導顧問，授課經驗在10,000小時以上；輔導經驗在1,000家以上之實力派顧問全力服務企業。群力公司為國內最具綜合性的顧問公司，為企業提供策略與管理最佳的方案。",
			imgUrl: "/images/about/intro_3.png",
		},
	]);

	return (
		<section className='max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col justify-center items-center gap-8 md:gap-10 pb-12 md:pb-20 lg:pb-24'>
			{data.map((item, index) => (
				<div
					key={index}
					className={`w-full flex flex-col gap-6 md:gap-12 ${
						index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
					}`}>
					{/* 圖片容器 */}
					<div className='w-full md:w-1/2 h-[200px] md:h-[300px] rounded-lg shadow-md overflow-hidden relative'>
						<Image
							src={item.imgUrl}
							alt={item.title}
							fill
							className='object-cover'
							quality={90}
						/>
					</div>

					{/* 文字內容 */}
					<div className='flex flex-col justify-center w-full md:w-1/2'>
						<h2 className='text-2xl md:text-3xl font-bold'>{item.title}</h2>
						<p className='mt-4 text-base md:text-lg text-gray-700 leading-relaxed'>
							{item.description}
						</p>
					</div>
				</div>
			))}

			{/* boss */}
			<div className='flex flex-col justify-center items-center gap-3 mt-20 text-center'>
				<div className='w-42 h-42 md:w-52 md:h-52 lg:w-60 lg:h-60 relative'>
					<Image
						src='/images/about/boss.png'
						alt='彭信良'
						fill
						className='object-cover'
						quality={90}
					/>
				</div>
				<h3 className='text-2xl md:text-3xl lg:text-4xl font-medium'>彭信良</h3>
				<p className='text-base md:text-lg font-medium'>總經理</p>
				<p className='text-base md:text-lg text-gray-700 leading-relaxed'>
					群力顧問股份有限公司總經理
					<br />
					群英企業管理顧問股份有限公司總經理
					<br />
					中華民國企管顧問協會台中分會會長
				</p>
			</div>
		</section>
	);
};
