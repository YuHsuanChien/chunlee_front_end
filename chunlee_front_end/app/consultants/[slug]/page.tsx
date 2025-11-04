"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
	IoChevronBack,
	IoPerson,
	IoBriefcase,
	IoSchool,
	IoMail,
	IoCall,
	IoCheckmarkCircle,
} from "react-icons/io5";

// 顧問師資料
const consultantsData = [
	{
		id: "peng-xin-liang",
		name: "彭信良",
		position: "總經理",
		photo: "/images/consultants/members/member_1.png",
		email: "peng@chunlee.com.tw",
		phone: "04-2345-6789",
		expertise: ["企業管理", "組織改造", "人力資源"],
		description:
			"擁有超過20年的企業管理經驗，專精於組織改造與人力資源管理，成功輔導過上百家企業轉型升級。",
		history: [
			"現職群力顧問股份有限公司總經理",
			"群英企業管理顧問股份有限公司總經理",
			"中華民國企管顧問協會台中分會會長",
		],
		achievements: [
			"輔導企業轉型成功案例超過100家",
			"榮獲企管顧問協會優秀顧問獎",
			"發表企業管理相關論文20餘篇",
		],
		education: ["台灣大學企業管理碩士", "政治大學企業管理學士"],
	},
	{
		id: "xie-ming-tang",
		name: "謝明堂",
		position: "企業人心醫/轉虧為盈大師",
		photo: "/images/consultants/members/member_2.png",
		email: "xie@chunlee.com.tw",
		phone: "04-2345-6790",
		expertise: ["企業診斷", "轉虧為盈", "人心管理"],
		description:
			"被譽為企業人心醫，專精於企業診斷與轉虧為盈策略，擁有國際認證的經營管理顧問資格。",
		history: [
			"2005國際41國公認經營管理顧問師",
			"2005年日本能率連盟認定經營管理顧問",
			"榮獲三任總統接見顧問楷模",
		],
		achievements: [
			"協助企業轉虧為盈成功率達90%",
			"榮獲三任總統接見表揚",
			"國際認證經營管理顧問師",
		],
		education: ["日本能率連盟經營管理研修", "國際經營管理顧問認證"],
	},
	{
		id: "chen-yi-shi",
		name: "陳益世",
		position: "顧問師",
		photo: "/images/consultants/members/member_3.png",
		email: "chen@chunlee.com.tw",
		phone: "04-2345-6791",
		expertise: ["專業諮詢", "企業教育", "管理培訓"],
		description:
			"專業顧問師，在企業教育與管理培訓領域具有豐富經驗，致力於提升企業競爭力。",
		history: ["群力顧問股份有限公司專業顧問", "台中市企業經理協會教育主委"],
		achievements: [
			"培訓企業主管超過1000人次",
			"開發多套企業管理課程",
			"企業滿意度評價達95%以上",
		],
		education: ["中興大學企業管理碩士", "逢甲大學商學學士"],
	},
	{
		id: "xiong-hai-liang",
		name: "熊海量",
		position: "顧問師",
		photo: "/images/consultants/members/member_4.png",
		email: "xiong@chunlee.com.tw",
		phone: "04-2345-6792",
		expertise: ["商業策略", "流通管理", "市場分析"],
		description:
			"商業總顧問，專精於流通業管理與市場分析，協助企業制定有效的商業策略。",
		history: [
			"群力顧問股份有限公司商業總顧問",
			"中華工商流通發展研究協會常務監事",
		],
		achievements: [
			"協助流通業者成功轉型20餘家",
			"發表流通管理研究報告多篇",
			"榮獲流通業最佳顧問獎",
		],
		education: ["東海大學企業管理碩士", "中原大學商學學士"],
	},
	{
		id: "zhou-xiu-qing",
		name: "周秀卿",
		position: "顧問師",
		photo: "/images/consultants/members/member_5.png",
		email: "zhou@chunlee.com.tw",
		phone: "04-2345-6793",
		expertise: ["人力資源", "組織發展", "教育訓練"],
		description:
			"人力資源專家，專精於組織發展與教育訓練，協助企業建立完善的人才培育體系。",
		history: ["群力顧問股份有限公司人資顧問", "多家企業人力資源顧問"],
		achievements: [
			"設計人才培育系統超過50套",
			"協助企業建立完善組織架構",
			"人力資源管理專業認證",
		],
		education: ["靜宜大學企業管理碩士", "人力資源管理師認證"],
	},
	{
		id: "jiang-zu-qi",
		name: "蔣祖棋",
		position: "顧問師",
		photo: "/images/consultants/members/member_6.png",
		email: "jiang@chunlee.com.tw",
		phone: "04-2345-6794",
		expertise: ["專案管理", "中小企業輔導", "非營利組織管理"],
		description:
			"經濟部認證顧問師，專精於中小企業輔導與專案管理，同時具有非營利組織經營經驗。",
		history: [
			"經濟部中小企業處甄選合格顧問",
			"群力顧問股份有限公司專案經理",
			"新展望文教基金會董事兼執行長",
		],
		achievements: [
			"輔導中小企業成功申請政府補助",
			"非營利組織經營管理專家",
			"專案管理PMP認證",
		],
		education: ["中山大學企業管理碩士", "專案管理PMP認證"],
	},
	{
		id: "hong-ming-zhi",
		name: "洪明智",
		position: "顧問師",
		photo: "/images/consultants/members/member_7.png",
		email: "hong@chunlee.com.tw",
		phone: "04-2345-6795",
		expertise: ["兩岸企業管理", "生產力提升", "講師培訓"],
		description:
			"兩岸企業管理專家，擁有豐富的跨境企業輔導經驗，專精於生產力提升與管理培訓。",
		history: [
			"廣東群力顧問公司/總經理",
			"中國生產力中心/外聘顧問&講師",
			"經濟部中小企業處/高級經顧問師班講師",
		],
		achievements: [
			"兩岸企業輔導經驗20年",
			"生產力提升專案成功率95%",
			"培訓講師超過500人次",
		],
		education: ["成功大學工業管理碩士", "兩岸企業管理專業認證"],
	},
	{
		id: "song-ze-min",
		name: "宋澤民",
		position: "顧問師",
		photo: "/images/consultants/members/member_8.png",
		email: "song@chunlee.com.tw",
		phone: "04-2345-6796",
		expertise: ["台資企業輔導", "管理改善", "海外投資"],
		description:
			"台資企業輔導專家，擁有超過20年的管理改善經驗，專精於海外台資企業的經營管理。",
		history: [
			"福建群力顧問股份有限公司/總經理",
			"台資企業輔導諮詢管理顧問師",
			"管理改善經驗20年以上",
		],
		achievements: [
			"輔導海外台資企業超過100家",
			"管理改善專案成功率90%",
			"海外投資顧問專業認證",
		],
		education: ["台北大學企業管理碩士", "海外投資管理專業認證"],
	},
];

export default function ConsultantDetailPage() {
	const params = useParams();
	const slug = params.slug as string;

	// 根據 slug 找到對應的顧問師資料
	const consultant = consultantsData.find((c) => c.id === slug);

	// 如果找不到顧問師，顯示 404 頁面
	if (!consultant) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-gray-50'>
				<div className='text-center'>
					<h1 className='text-4xl font-bold text-gray-900 mb-4'>404</h1>
					<p className='text-lg text-gray-600 mb-8'>找不到此顧問師資料</p>
					<Link
						href='/consultants'
						className='px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200'>
						返回顧問師列表
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* 導航列 */}
			<div className='bg-white shadow-sm border-b'>
				<div className='max-w-7xl mx-auto px-6 md:px-12 py-4'>
					<Link
						href='/consultants'
						className='inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200'>
						<IoChevronBack className='h-5 w-5 mr-2' />
						返回顧問師列表
					</Link>
				</div>
			</div>

			{/* 主要內容 */}
			<div className='max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20'>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
					{/* 左側 - 顧問師基本資訊 */}
					<div className='lg:col-span-1'>
						<div className='bg-white rounded-md shadow-sm overflow-hidden sticky top-8'>
							{/* 照片 */}
							<div className='aspect-square bg-gradient-to-br from-gray-50 to-gray-100'>
								<img
									src={consultant.photo}
									alt={consultant.name}
									className='w-full h-full object-cover object-top'
									onError={(e) => {
										e.currentTarget.src = "/images/members/default-avatar.png";
									}}
								/>
							</div>

							{/* 基本資訊 */}
							<div className='p-6'>
								<h1 className='text-2xl font-bold text-gray-900 mb-2'>
									{consultant.name}
								</h1>
								<p className='text-lg text-blue-600 font-medium mb-4'>
									{consultant.position}
								</p>

								{/* 聯絡資訊 */}
								<div className='space-y-3 mb-6'>
									<div className='flex items-center text-gray-600'>
										<IoMail className='h-5 w-5 mr-3' />
										<a
											href={`mailto:${consultant.email}`}
											className='hover:text-blue-600 transition-colors'>
											{consultant.email}
										</a>
									</div>
									<div className='flex items-center text-gray-600'>
										<IoCall className='h-5 w-5 mr-3' />
										<a
											href={`tel:${consultant.phone}`}
											className='hover:text-blue-600 transition-colors'>
											{consultant.phone}
										</a>
									</div>
								</div>

								{/* 專業領域 */}
								<div>
									<h3 className='text-sm font-semibold text-gray-700 mb-3 flex items-center'>
										<IoBriefcase className='h-4 w-4 mr-2' />
										專業領域
									</h3>
									<div className='flex flex-wrap gap-2'>
										{consultant.expertise.map((skill, index) => (
											<span
												key={index}
												className='px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full'>
												{skill}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* 右側 - 詳細資訊 */}
					<div className='lg:col-span-2 space-y-8'>
						{/* 個人簡介 */}
						<div className='bg-white rounded-md shadow-sm p-6 md:p-8'>
							<h2 className='text-xl font-bold text-gray-900 mb-4 flex items-center'>
								<IoPerson className='h-6 w-6 mr-3 text-blue-600' />
								個人簡介
							</h2>
							<p className='text-gray-700 leading-relaxed text-lg'>
								{consultant.description}
							</p>
						</div>

						{/* 專業經歷 */}
						<div className='bg-white rounded-md shadow-sm p-6 md:p-8'>
							<h2 className='text-xl font-bold text-gray-900 mb-6 flex items-center'>
								<IoBriefcase className='h-6 w-6 mr-3 text-blue-600' />
								專業經歷
							</h2>
							<ul className='space-y-4'>
								{consultant.history.map((item, index) => (
									<li key={index} className='flex items-start'>
										<span className='w-2 h-2 bg-blue-500 rounded-full mt-3 mr-4 flex-shrink-0'></span>
										<span className='text-gray-700 leading-relaxed'>
											{item}
										</span>
									</li>
								))}
							</ul>
						</div>

						{/* 主要成就 */}
						<div className='bg-white rounded-md shadow-sm p-6 md:p-8'>
							<h2 className='text-xl font-bold text-gray-900 mb-6 flex items-center'>
								<IoCheckmarkCircle className='h-6 w-6 mr-3 text-blue-600' />
								主要成就
							</h2>
							<ul className='space-y-4'>
								{consultant.achievements.map((achievement, index) => (
									<li key={index} className='flex items-start'>
										<span className='w-2 h-2 bg-green-500 rounded-full mt-3 mr-4 flex-shrink-0'></span>
										<span className='text-gray-700 leading-relaxed'>
											{achievement}
										</span>
									</li>
								))}
							</ul>
						</div>

						{/* 學歷背景 */}
						<div className='bg-white rounded-md shadow-sm p-6 md:p-8'>
							<h2 className='text-xl font-bold text-gray-900 mb-6 flex items-center'>
								<IoSchool className='h-6 w-6 mr-3 text-blue-600' />
								學歷背景
							</h2>
							<ul className='space-y-4'>
								{consultant.education.map((edu, index) => (
									<li key={index} className='flex items-start'>
										<span className='w-2 h-2 bg-purple-500 rounded-full mt-3 mr-4 flex-shrink-0'></span>
										<span className='text-gray-700 leading-relaxed'>{edu}</span>
									</li>
								))}
							</ul>
						</div>

						{/* 聯絡行動按鈕 */}
						<div className='bg-white rounded-md shadow-sm p-6 md:p-8'>
							<h2 className='text-xl font-bold text-gray-900 mb-6'>聯絡顧問</h2>
							<div className='flex flex-col sm:flex-row gap-4'>
								<a
									href={`mailto:${consultant.email}`}
									className='flex-1 px-6 py-3 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium'>
									發送郵件
								</a>
								<a
									href={`tel:${consultant.phone}`}
									className='flex-1 px-6 py-3 bg-green-600 text-white text-center rounded-md hover:bg-green-700 transition-colors duration-200 font-medium'>
									直接通話
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
