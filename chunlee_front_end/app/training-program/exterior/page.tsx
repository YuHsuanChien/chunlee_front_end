import { Banner, Slogan } from "@/components/common";
import { fetchJsonData } from "@/lib/hooks";
import { ExteriorListData, ExteriorCourseData } from "@/lib/interfaces";
import { ExteriorList } from "@/components/training-program";

export default async function Exterior() {
	const exteriorList = await fetchJsonData<ExteriorListData[]>(
		"exteriorList.json"
	);
	const courseData = await fetchJsonData<ExteriorCourseData[]>("exterior.json");

	return (
		<section>
			<Banner
				title='以學習啟動成長'
				breadcrumb='首頁'
				breadcrumbHref='/'
				imageSrc='/images/home/products_1.png'
				imageAlt='公開課程'
				bgColor='bg-gray-300'
			/>
			<Slogan title='公開課程' description='' />
			{exteriorList && courseData && (
				<ExteriorList exteriorList={exteriorList} courseData={courseData} />
			)}
		</section>
	);
}
