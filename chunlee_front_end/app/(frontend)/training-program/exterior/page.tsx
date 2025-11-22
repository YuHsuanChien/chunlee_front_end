import { Banner, Slogan } from "@/components/frontend/common";
import { fecthcPubilcData } from "@/lib/hooks";
import { ExteriorListData, ExteriorCourseData } from "@/lib/interfaces";
import { ExteriorList } from "@/components/frontend/training-program";

export default async function Exterior() {
	// 取得外部課程分類列表
	const exteriorList = await fecthcPubilcData<ExteriorListData>(
		"/training/exterior/categories"
	);

	console.log("exteriorList", exteriorList);

	// 取得外部課程資料
	const courseData = await fecthcPubilcData<ExteriorCourseData>(
		"/training/exterior/courses"
	);


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
			{exteriorList.data.length > 0 && courseData.data && (
				<ExteriorList
					exteriorList={exteriorList.data}
					courseData={courseData.data}
				/>
			)}
		</section>
	);
}
