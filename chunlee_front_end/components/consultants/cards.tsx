import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { FaUsers, FaChalkboardTeacher } from "react-icons/fa";

export const Cards = () => {
	return (
		<div className='mx-auto w-full pb-12 md:pb-20 lg:pb-24'>
			<div className='max-w-7xl mx-auto px-6 md:px-12 text-base md:text-lg flex flex-col justify-center items-center gap-8 md:gap-10'>
				{/* 卡片容器 */}
				<div className='w-full lg:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10'>
					{/* 內部訓練卡片 */}
					<Link href='/training-program/interior' className='group'>
						<div className='relative h-full min-h-80 md:min-h-[380px] rounded-2xl overflow-hidden bg-linear-to-br from-blue-500 via-blue-600 to-indigo-700 p-8 md:p-10 transition-all duration-300 ease-out hover:shadow-2xl hover:scale-[1.02] cursor-pointer will-change-transform'>
							{/* 背景裝飾 */}
							<div className='absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-500 ease-in-out will-change-transform'></div>
							<div className='absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2'></div>

							{/* 內容 */}
							<div className='relative z-10 h-full flex flex-col justify-between'>
								<div>
									{/* 圖標 */}
									<div className='w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors duration-200 ease-out'>
										<FaUsers className='w-8 h-8 md:w-10 md:h-10 text-white' />
									</div>

									{/* 標題 */}
									<h3 className='text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4'>
										內部訓練
									</h3>

									{/* 描述 */}
									<p className='text-blue-50 text-sm md:text-base lg:text-lg leading-relaxed'>
										為企業量身打造內部培訓課程，提升員工專業技能與團隊協作能力
									</p>
								</div>

								{/* 按鈕 */}
								<div className='flex items-center gap-2 text-white font-semibold mt-6 group-hover:gap-4 transition-all duration-200 ease-out'>
									<span className='text-base md:text-lg'>了解更多</span>
									<HiArrowRight className='w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-200 ease-out' />
								</div>
							</div>

							{/* 光澤效果 */}
							<div className='absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'></div>
						</div>
					</Link>

					{/* 公開課程卡片 */}
					<Link href='/training-program/exterior' className='group'>
						<div className='relative h-full min-h-80 md:min-h-[380px] rounded-2xl overflow-hidden bg-linear-to-br from-emerald-500 via-teal-600 to-cyan-700 p-8 md:p-10 transition-all duration-300 ease-out hover:shadow-2xl hover:scale-[1.02] cursor-pointer will-change-transform'>
							{/* 背景裝飾 */}
							<div className='absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-500 ease-in-out will-change-transform'></div>
							<div className='absolute bottom-0 left-0 w-48 h-48 bg-teal-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2'></div>

							{/* 內容 */}
							<div className='relative z-10 h-full flex flex-col justify-between'>
								<div>
									{/* 圖標 */}
									<div className='w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors duration-200 ease-out'>
										<FaChalkboardTeacher className='w-8 h-8 md:w-10 md:h-10 text-white' />
									</div>

									{/* 標題 */}
									<h3 className='text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4'>
										公開課程
									</h3>

									{/* 描述 */}
									<p className='text-emerald-50 text-sm md:text-base lg:text-lg leading-relaxed'>
										開設多元化公開課程，幫助專業人士掌握最新產業知識與管理技能
									</p>
								</div>

								{/* 按鈕 */}
								<div className='flex items-center gap-2 text-white font-semibold mt-6 group-hover:gap-4 transition-all duration-200 ease-out'>
									<span className='text-base md:text-lg'>了解更多</span>
									<HiArrowRight className='w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-200 ease-out' />
								</div>
							</div>

							{/* 光澤效果 */}
							<div className='absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'></div>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};
