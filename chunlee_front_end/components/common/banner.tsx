import Image from "next/image";
import Link from "next/link";

interface PageBannerProps {
	title: string;
	breadcrumb?: string;
	breadcrumbHref?: string;
	imageSrc: string;
	imageAlt?: string;
	bgColor?: string;
}

export const Banner = ({
	title,
	breadcrumb = "首頁",
	breadcrumbHref = "/",
	imageSrc,
	imageAlt = title,
	bgColor = "bg-gray-300",
}: PageBannerProps) => {
	return (
		<section className={`w-full relative ${bgColor} pb-16 lg:py-32`}>
			<div className='mx-auto max-w-[1632px]'>
				{/* 手機版圖片 */}
				<div className='lg:hidden w-full h-[400px] relative mb-16 overflow-hidden'>
					<Image
						src={imageSrc}
						alt={imageAlt}
						fill
						className='object-cover'
						quality={90}
					/>
				</div>

				{/* 文字內容 */}
				<div className='w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start gap-6 lg:gap-8 lg:ml-10 px-16'>
					<Link
						href={breadcrumbHref}
						className='w-full lg:w-auto text-gray-700 hover:text-blue-600 transition-colors'>
						{breadcrumb}
					</Link>
					<h1 className='text-2xl md:text-4xl lg:text-6xl font-medium text-[#0b1929]'>
						{title}
					</h1>
					<div className='h-1 md:h-2 w-[50px] md:w-[60px] bg-[#326eb8]'></div>
				</div>
			</div>

			{/* 桌面版斜切圖片 */}
			<div className='hidden lg:block absolute right-0 top-3 w-1/2 h-full drop-shadow-xl/50'>
				<Image
					src={imageSrc}
					alt={imageAlt}
					fill
					className='object-cover'
					quality={90}
					style={{
						clipPath: "polygon(100px 0%, 100% 0%, 100% 100%, 0% 100%)",
					}}
				/>
			</div>
		</section>
	);
};
