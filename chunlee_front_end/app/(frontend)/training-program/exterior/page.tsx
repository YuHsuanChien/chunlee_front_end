import { Banner, Slogan } from "@/components/frontend/common";
import { fetchJsonData, fecthcPubilcData } from "@/lib/hooks";
import { ExteriorListData, ExteriorCourseItem } from "@/lib/interfaces";
import { ExteriorList } from "@/components/frontend/training-program";

export default async function Exterior() {
	// 取得外部課程分類列表(這是本地的json檔案範例)
	// const exteriorList = await fetchJsonData<ExteriorListData[]>(
	// 	"exteriorList.json"
	// );

	const exteriorList = await fecthcPubilcData<ExteriorListData>(
		"/training/exterior/categories"
	);

	const courseData = await fetchJsonData<ExteriorCourseItem[]>("exterior.json");

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
			{exteriorList.data && courseData && (
				<ExteriorList
					exteriorList={exteriorList.data}
					courseData={courseData}
				/>
			)}
		</section>
	);
}
