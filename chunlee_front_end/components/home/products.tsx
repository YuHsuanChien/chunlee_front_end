import { products } from "@/lib/data";
import {
	FaChartLine, // 經營診斷
	FaHandshake, // 顧問輔導
	FaUsers, // 內部訓練
	FaChalkboardTeacher, // 公開課程
	FaGlobeAsia, // 海外投資
} from "react-icons/fa";
import Image from "next/image";

export const Products = () => {
	return (
		<section className='mx-auto w-full py-12 md:py-20 lg:py-24 flex flex-col justify-center items-center gap-16 md:gap-20 lg:gap-24'>
			<div className='max-w-7xl mx-auto px-6 md:px-12 text-base md:text-lg'>
				<p>
					在群力，我們不僅陪伴企業走過挑戰，更引領您邁向未來。
					<br />
					<br />
					憑藉深耕在地的實務經驗與國際視野，我們協助中小企業穩健成長、創造永續價值。
					<br />
					<br />
					立足現在，放眼全球，群力與您共築長遠競爭力。
				</p>
			</div>
			<h2
				className='text-2xl md:text-3xl lg:text-4xl font-medium 
	flex flex-col items-center gap-4
	after:content-[""] after:w-16 after:h-1 after:bg-[#10243d]'>
				商業服務項目
			</h2>
			{/* card */}
			<div className='max-w-7xl flex flex-wrap justify-center gap-8 md:gap-6 lg:gap-8 w-full'>
				{products.map((item, index) => {
					return (
						<div
							key={index}
							className='bg-gray-100 rounded-lg p-8 flex flex-col items-center text-center w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-32px)] max-w-sm'>
							{/* 圖標 */}
							<div className='mb-6'>
								<item.svgIcon className='w-16 h-16 text-gray-700' />
							</div>
							<h3 className='text-lg md:text-xl lg:text-2xl font-medium mb-4 text-gray-900'>
								{item.title}
							</h3>
							<p className='text-base md:text-lg text-gray-700 leading-relaxed'>
								{item.description}
							</p>
						</div>
					);
				})}
			</div>
			<div className='w-full bg-gray-300 flex justify-between items-center'>
				<div className='relative max-w-7xl mx-auto'>
					<div className='flex flex-col justify-center items-start gap-3 lg:gap-6 ml-10'>
						<h2 className='text-xl md:text-3xl lg:text-5xl font-medium text-[#0b1929]'>
							投資企業新未來
						</h2>
						<div className='h-1 md:h-2 w-[50px] md:w-[60px] bg-[#326eb8]'></div>
					</div>
				</div>
				{/* 斜切45度的圖片 */}
				<div className='relative w-1/2 overflow-hidden h-[150px] md:h-[200px] lg:h-[300px]'>
					<div
						className='absolute inset-0'
						style={{
							clipPath: "polygon(100px 0%, 100% 0%, 100% 100%, 0% 100%)",
						}}>
						<Image
							src='/images/home/products_1.png'
							alt='投資亞洲新未來'
							fill
							className='object-cover'
							quality={90}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};
