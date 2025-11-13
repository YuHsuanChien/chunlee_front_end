import { Banner, Slogan } from "@/components/frontend/common";
import { Cards } from "@/components/frontend/consultants";
export default function TrainingProgram() {
	return (
		<section>
			<Banner
				title='學習是企業的競爭力'
				breadcrumb='首頁'
				breadcrumbHref='/'
				imageSrc='/images/home/products_1.png'
				imageAlt='教育訓練'
				bgColor='bg-gray-300'
			/>
			<Slogan
				title='教育訓練'
				description='
      在企業成長的過程中，「人才」始終是最關鍵的核心。
群力顧問以實務導向的教育訓練，協助企業打造具備執行力與思考力的團隊，
讓學習不只是知識的累積，更是能力的轉化與行動的落實。'
			/>
			<Cards />
		</section>
	);
}
