import { ContactForm } from "@/components/contact-us";
import { Slogan, Banner } from "@/components/common";

export default function ContactUsPage() {
	return (
		<section>
			<Banner
				title='策略成就遠見'
				breadcrumb='首頁'
				breadcrumbHref='/'
				imageSrc='/images/home/products_1.png'
				imageAlt='聯絡我們'
				bgColor='bg-gray-300'
			/>
			<Slogan
				title='聯絡我們'
				description='有任何問題或需求，歡迎隨時與我們聯繫。我們的團隊將竭誠為您提供協助與支持。'
			/>
			<ContactForm />
		</section>
	);
}
