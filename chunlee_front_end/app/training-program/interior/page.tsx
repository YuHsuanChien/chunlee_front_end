import { Banner, Slogan } from "@/components/common";
import { InteriorList } from "@/components/training-program";
import { fetchJsonData } from "@/lib/hooks";
import { InteriorData } from "@/lib/interfaces";

export default async function Interior() {
	const data = await fetchJsonData<InteriorData[]>("interior.json");
	console.log("data", data);

	return (
		<section>
			<Banner
				title='知識轉化為行動力'
				breadcrumb='首頁'
				breadcrumbHref='/'
				imageSrc='/images/home/products_1.png'
				imageAlt='教育訓練'
				bgColor='bg-gray-300'
			/>
			<Slogan title='內部教育訓練' description='' />
			{data && <InteriorList data={data} />}
		</section>
	);
}
