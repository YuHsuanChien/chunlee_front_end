import { Banner, Slogan, More } from "@/components/common";
import { Intro } from "@/components/about";

export default function About() {
	return (
		<div>
			<Banner
				title='觀點改變世界'
				breadcrumb='首頁'
				breadcrumbHref='/'
				imageSrc='/images/home/products_1.png'
				imageAlt='關於我們'
				bgColor='bg-gray-300'
			/>
			<Slogan
				title='關於群力'
				description='我們以創新驅動成長，以績效創造價值。秉持「一日服務，終生服務」的承諾，從合作的第一天起，我們就是您最值得信賴的長期夥伴。專業、熱忱、持續進步——這是我們對每一位客戶的堅持與承諾。'
			/>
			<Intro />
			<More
				title='顧問師群'
				description='想要更多了解我們的顧問師群。'
				link='/consultants'
			/>
		</div>
	);
}
