import { Banner, Slogan, More } from "@/components/frontend/common";
import { MemberList } from "@/components/frontend/about";

export default function Consultants() {
	return (
		<div>
			<Banner
				title='領先市場先機'
				breadcrumb='首頁'
				breadcrumbHref='/'
				imageSrc='/images/consultants/consultants_1.png'
				imageAlt='顧問師群'
				bgColor='bg-gray-300'
			/>
			<Slogan
				title='顧問師群'
				description='匯聚產業菁英，擁有豐富實戰經驗的顧問師團隊。我們不只提供專業建議，更深入理解您的需求，提供量身定制的解決方案。從策略規劃到執行落地，我們是您最值得信賴的成長夥伴。'
			/>
			<MemberList />
			<More
				title='聯絡我們'
				description='有任何疑問或興趣，歡迎與我們聯絡'
				link='/contact-us'
			/>
		</div>
	);
}
