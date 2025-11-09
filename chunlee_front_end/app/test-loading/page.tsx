import { Banner, Slogan } from "@/components/common";
import Link from "next/link";

// 模擬從 API 獲取資料 (Server Component)
async function fetchData() {
	// 模擬 2 秒的 API 延遲
	await new Promise((resolve) => setTimeout(resolve, 2000));
	return {
		title: "測試資料載入",
		content: "這是從 API 載入的資料！",
	};
}

// Server Component - 會觸發 loading.tsx
export default async function TestLoadingPage() {
	const data = await fetchData();

	return (
		<div>
			<Banner
				title='測試 Loading'
				breadcrumb='首頁'
				breadcrumbHref='/'
				imageSrc='/images/home/products_1.png'
				imageAlt='測試'
				bgColor='bg-gray-300'
			/>
			<div className='max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20'>
				<Slogan title={data.title} description={data.content} />

				{/* 成功載入的訊息 */}
				<div className='bg-green-50 border-2 border-green-400 rounded-lg p-8 text-center mt-8'>
					<div className='text-6xl mb-4'>✅</div>
					<p className='text-2xl font-bold text-green-800 mb-2'>
						資料載入完成！
					</p>
					<p className='text-lg text-gray-700 mb-4'>
						您應該在點擊連結後等待了 2 秒才看到這個訊息。
					</p>
					<p className='text-sm text-gray-600'>這證明了 loading.tsx 正在運作</p>
				</div>

				{/* 說明區塊 */}
				<div className='mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6'>
					<h3 className='text-xl font-bold text-blue-900 mb-4'>
						📖 Loading 行為說明
					</h3>
					<div className='space-y-3 text-gray-700'>
						<div className='flex items-start gap-3'>
							<span className='text-2xl'>❌</span>
							<div>
								<p className='font-semibold'>直接輸入網址或重新整理：</p>
								<p className='text-sm'>不會看到 loading.tsx（這是正常的！）</p>
							</div>
						</div>
						<div className='flex items-start gap-3'>
							<span className='text-2xl'>✅</span>
							<div>
								<p className='font-semibold'>從其他頁面點擊連結過來：</p>
								<p className='text-sm'>
									會看到 loading.tsx（應該看到 2 秒動畫）
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* 返回按鈕 */}
				<div className='mt-8 text-center'>
					<Link
						href='/'
						className='inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-lg'>
						← 返回首頁重新測試
					</Link>
					<p className='text-sm text-gray-500 mt-3'>
						返回首頁後，再次點擊連結來測試 Loading 效果
					</p>
				</div>
			</div>
		</div>
	);
}
