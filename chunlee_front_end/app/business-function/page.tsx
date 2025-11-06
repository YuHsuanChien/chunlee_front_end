import { Banner, Slogan } from "@/components/common";
import { Content, Cards } from "@/components/bussiness-function";
export default function BussinessFunction() {
	return (
		<section>
			<Banner
				title='從洞察到行動'
				breadcrumb='首頁'
				breadcrumbHref='/'
				imageSrc='/images/home/products_1.png'
				imageAlt='企業輔導'
				bgColor='bg-gray-300'
			/>
			<div className='mx-auto w-full py-12 md:py-20 lg:py-24 '>
				<div className='max-w-7xl mx-auto px-6 md:px-12 text-base md:text-lg flex flex-col justify-center items-center gap-8 md:gap-10 text-start'>
					<p className='text-base md:text-lg lg:px-16'>
						在瞬息萬變的市場中，唯有持續調整與精準決策，才能維持競爭力。
						群力顧問以豐富的產業經驗與跨領域視野，協助企業從現況診斷到策略落地，
						以實證分析找出問題根源，並長期陪伴企業穩定成長。
						我們不只是解決問題，更致力於建立持續改善的文化，
						讓企業在挑戰中找到節奏，在變化中找到方向，並抓住成長的機會。
					</p>
				</div>
			</div>
			<Content />
      <Slogan title='讓我們攜手合作，共創美好未來' description='' />
      <Cards />
		</section>
	);
}
