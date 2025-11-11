"use client";
export const MemberList = () => {
	const data = [
		{
			id: "peng-xin-liang",
			name: "彭信良",
			position: "總經理",
			photo: "/images/consultants/members/member_1.png",
			history: [
				"現職群力顧問股份有限公司總經理",
				"群英企業管理顧問股份有限公司總經理",
				"中華民國企管顧問協會台中分會會長",
			],
		},
		{
			id: "xie-ming-tang",
			name: "謝明堂",
			position: "企業人心醫/轉虧為盈大師",
			photo: "/images/consultants/members/member_2.png",
			history: [
				"2005國際41國公認經營管理顧問師",
				"2005年日本能率連盟認定經營管理顧問",
				"榮獲三任總統接見顧問楷模",
			],
		},
		{
			id: "chen-yi-shi",
			name: "陳益世",
			position: "顧問師",
			photo: "/images/consultants/members/member_3.png",
			history: ["群力顧問股份有限公司專業顧問", "台中市企業經理協會教育主委"],
		},
		{
			id: "xiong-hai-liang",
			name: "熊海量",
			position: "顧問師",
			photo: "/images/consultants/members/member_4.png",
			history: [
				"群力顧問股份有限公司商業總顧問",
				"中華工商流通發展研究協會常務監事",
			],
		},
		{
			id: "zhou-xiu-qing",
			name: "周秀卿",
			position: "顧問師",
			photo: "/images/consultants/members/member_5.png",
			history: [],
		},
		{
			id: "jiang-zu-qi",
			name: "蔣祖棋",
			position: "顧問師",
			photo: "/images/consultants/members/member_6.png",
			history: [
				"經濟部中小企業處甄選合格顧問",
				"群力顧問股份有限公司  專案經理",
				"新展望文教基金會  董事兼執行長",
			],
		},
		{
			id: "hong-ming-zhi",
			name: "洪明智",
			position: "顧問師",
			photo: "/images/consultants/members/member_7.png",
			history: [
				"廣東群力顧問公司/總經理",
				"中國生產力中心/外聘顧問&講師",
				"經濟部中小企業處/高級經顧問師班講師",
			],
		},
		{
			id: "song-ze-min",
			name: "宋澤民",
			position: "顧問師",
			photo: "/images/consultants/members/member_8.png",
			history: [
				"福建群力顧問股份有限公司/總經理",
				"台資企業輔導諮詢管理顧問師",
				"管理改善經驗20年以上",
			],
		},
	];

	return (
		<section className='max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col justify-center items-center gap-8 md:gap-10 pb-12 md:pb-20 lg:pb-24'>
			<div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 lg:gap-8'>
				{data.map((member, index) => (
					<a
						key={index}
						href={`/consultants/${member.id}`}
						className='group bg-white rounded-md shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-200 hover:border-gray-300 overflow-hidden relative'>
						{/* 照片區域 */}
						<div className='relative h-48 md:h-56 lg:h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100'>
							<img
								src={member.photo}
								alt={member.name}
								className='w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105'
								onError={(e) => {
									e.currentTarget.src = "/images/members/default-avatar.png";
								}}
							/>
							<div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
						</div>

						{/* 內容區域 */}
						<div className='p-4 md:p-6'>
							{/* 姓名和職位 */}
							<div className='mb-4'>
								<h3 className='text-lg md:text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors duration-200'>
									{member.name.trim()}
								</h3>
								<p className='text-sm md:text-base text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full inline-block'>
									{member.position}
								</p>
							</div>

							{/* 經歷 */}
							{member.history.length > 0 && (
								<div>
									<h4 className='text-sm font-semibold text-gray-700 mb-2 flex items-center'>
										<span className='w-2 h-2 bg-blue-500 rounded-full mr-2'></span>
										主要經歷
									</h4>
									<ul className='space-y-1'>
										{member.history.slice(0, 3).map((item, idx) => (
											<li
												key={idx}
												className='text-xs md:text-sm text-gray-600 leading-relaxed flex items-start'>
												<span className='w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0'></span>
												<span className='line-clamp-2'>{item}</span>
											</li>
										))}
										{member.history.length > 3 && (
											<li className='text-xs text-gray-500 italic'>
												...等 {member.history.length - 3} 項經歷
											</li>
										)}
									</ul>
								</div>
							)}

							{/* 如果沒有經歷資料 */}
							{member.history.length === 0 && (
								<div className='text-sm text-gray-500 italic'>
									經歷資料準備中...
								</div>
							)}
						</div>

						{/* 底部裝飾線 */}
						<div className='h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left absolute bottom-0 left-0 right-0'></div>
					</a>
				))}
			</div>
		</section>
	);
};
