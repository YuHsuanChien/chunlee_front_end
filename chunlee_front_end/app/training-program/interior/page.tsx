import { Banner, Slogan } from "@/components/common";
import { InteriorList } from "@/components/training-program";

async function fetchData() {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
	const res = await fetch(`${baseUrl}/json/interior.json`);
	const data = await res.json();
	return data;
}

export default async function Interior() {
	const data = await fetchData();
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
