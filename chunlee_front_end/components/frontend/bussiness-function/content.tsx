import Image from "next/image";
import Link from "next/link";

interface ContentItemProps {
	title: string;
	description: string;
	imageSrc: string;
	imageAlt: string;
	linkText?: string;
	linkHref?: string;
	reverse?: boolean;
}

const ContentItem = ({
	title,
	description,
	imageSrc,
	imageAlt,
	linkText = "閱讀更多",
	linkHref = "#",
	reverse = false,
}: ContentItemProps) => {
	return (
		<div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-0 bg-gray-100 lg:py-12 lg:pl-6 relative lg:after:content-[""] lg:after:w-20 lg:after:h-full lg:after:bg-white lg:after:absolute lg:after:right-0 lg:after:top-0'>
			{/* 文字內容 */}
			<div className='flex flex-col justify-center items-start gap-6 px-8 md:px-12 lg:px-16 py-12 md:py-16 lg:py-10'>
				<h2 className='text-3xl md:text-4xl font-medium text-gray-900'>
					{title}
				</h2>
				<p className='text-base md:text-lg text-gray-700 leading-relaxed'>
					{description}
				</p>
				<Link
					href={linkHref}
					className='bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors duration-200 font-medium'>
					{linkText}
				</Link>
			</div>

			{/* 圖片 */}
			<div className='relative w-full h-[200px] md:h-[300px] lg:h-full order-1'>
				<Image
					src={imageSrc}
					alt={imageAlt}
					fill
					className='object-cover'
					quality={90}
				/>
			</div>
		</div>
	);
};

export const Content = () => {
	return (
		<section className='mx-auto w-full'>
			<div className='max-w-[1600px] mx-auto px-6 md:px-12 text-base md:text-lg flex flex-col justify-center items-center gap-8 md:gap-10'>
				{/* 第一個區塊 - 左文右圖 */}
				<ContentItem
					title='簡介'
					description='富達全球永續長-陳振輝，提供了能涵蓋型投資指南，這是一個規模龐大的議題。我們希望這份指南能幫助大家更容易理解這個重大議題。'
					imageSrc='/images/home/products_1.png'
					imageAlt='企業簡介'
					linkText='閱讀更多'
					linkHref='/about'
					reverse={false}
				/>
			</div>
		</section>
	);
};
