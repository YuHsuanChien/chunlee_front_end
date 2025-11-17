"use client";
import { ExteriorListProps, ExteriorListData } from "@/lib/interfaces";
import { IoChevronDown, IoSearch, IoDownload } from "react-icons/io5";
import { useState, useMemo } from "react";
import { Pagination } from "@/components/frontend/common";

export const ExteriorList = ({
	exteriorList,
	courseData,
}: ExteriorListProps) => {
	// 新增「全部」選項
	const allCategory: ExteriorListData = {
		id: 0,
		code: "ALL",
		name: "全部",
	};

	const [selectItem, setSelectItem] = useState<ExteriorListData>(allCategory);
	const [isOpen, setIsOpen] = useState(false);
	const [keyword, setKeyword] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 12; // 每頁顯示 12 筆

	// 根據選擇的分類過濾課程
	const filteredCourses = useMemo(() => {
		if (selectItem.code === "ALL") {
			return courseData;
		}
		// 根據 code 過濾課程
		return courseData.filter((course) => course.code === selectItem.code);
	}, [selectItem, courseData]);

	// 根據關鍵字搜尋
	const searchedCourses = useMemo(() => {
		if (!keyword.trim()) {
			return filteredCourses;
		}
		return filteredCourses.filter((course) =>
			course.title.toLowerCase().includes(keyword.toLowerCase())
		);
	}, [keyword, filteredCourses]);

	// 計算總頁數
	const totalPages = Math.ceil(searchedCourses.length / itemsPerPage);

	// 取得當前頁的課程
	const currentCourses = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return searchedCourses.slice(startIndex, endIndex);
	}, [currentPage, searchedCourses, itemsPerPage]);

	function handleItemClick(item: ExteriorListData) {
		console.log("item", item);
		setSelectItem(item);
		setCurrentPage(1); // 切換分類時重置頁碼
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setCurrentPage(1); // 搜尋時重置頁碼
	}

	function handlePageChange(page: number) {
		setCurrentPage(page);
		// 滾動到頁面頂部
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	return (
		<section className='max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-5 gap-3 lg:gap-6 pb-12 lg:pb-24'>
			{/* 項目 */}
			<div className='lg:col-span-1'>
				<div
					className='lg:hidden flex justify-between items-center p-4 border border-gray-200 rounded-lg mb-1'
					onClick={() => {
						setIsOpen(!isOpen);
					}}>
					<p className='font-medium'>{selectItem.name}</p>
					<IoChevronDown
						className={`text-2xl transition-all duration-500 ${
							isOpen ? "rotate-180" : ""
						}`}
					/>
				</div>
				<ul
					className={`w-full flex flex-col justify-center items-center shadow-lg rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 lg:max-h-none ${
						isOpen
							? "max-h-[1000px] opacity-100"
							: "max-h-0 opacity-0 border-0 lg:opacity-100 lg:border lg:max-h-none"
					}`}>
					{/* 全部選項 */}
					<li
						key={allCategory.id}
						className={`w-full border-b border-gray-200 py-3 lg:py-6 px-3 cursor-pointer hover:bg-[#2b68b3] hover:text-white text-start ${
							selectItem.name === allCategory.name
								? "bg-[#2b68b3] text-white"
								: ""
						}`}
						onClick={() => {
							handleItemClick(allCategory);
							setIsOpen(!isOpen);
						}}>
						{allCategory.name}
					</li>
					{/* 其他分類 */}
					{exteriorList &&
						exteriorList.map((item) => (
							<li
								key={item.id}
								className={`w-full border-b last:border-0 border-gray-200 py-3 lg:py-6 px-3 cursor-pointer hover:bg-[#2b68b3] hover:text-white text-start ${
									selectItem?.name === item.name
										? "bg-[#2b68b3] text-white"
										: ""
								}`}
								onClick={() => {
									handleItemClick(item);
									setIsOpen(!isOpen);
								}}>
								{item.name}
							</li>
						))}
				</ul>
			</div>
			{/* 服務清單 */}
			<div className='lg:col-span-4'>
				<div className='px-5 py-4 flex flex-col lg:flex-row justify-between items-center bg-linear-to-r from-[#2b68b3] to-[#4a90e2] rounded-md mb-6 shadow-md gap-3'>
					<h2 className='text-lg lg:text-2xl font-semibold text-white'>
						快速搜尋
					</h2>
					<form
						onSubmit={handleSubmit}
						className='flex justify-between items-center gap-3 w-full lg:w-auto'>
						<input
							type='text'
							name='keyword'
							value={keyword}
							onChange={(e) => setKeyword(e.target.value)}
							className='bg-white rounded-md px-3 py-2 h-10 focus:outline-none focus:ring-2 focus:ring-sky-900 focus:ring-opacity-50 w-full lg:w-auto'
							placeholder='請輸入課程關鍵字'
						/>

						<button
							type='submit'
							className='w-10 h-10 bg-white text-[#2b68b3] rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 flex items-center justify-center shrink-0 cursor-pointer'
							aria-label='搜尋'>
							<IoSearch className='text-xl' />
						</button>
					</form>
				</div>
				{/* 課程資料 */}
				<div className='w-full'>
					<div className='thead w-full hidden lg:flex justify-between items-center border-b-2 border-gray-950 mb-3'>
						<div className='relative p-3 w-52 text-center text-base text-gray-500 after:content-["|"] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:text-gray-300'>
							開課日期
						</div>
						<div className='relative flex-1 p-3 text-start text-base text-gray-500 after:content-["|"] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:text-gray-300'>
							課程名稱
						</div>
						<div className='relative p-3 w-36 text-center text-base text-gray-500 after:content-["|"] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:text-gray-300'>
							課程時數
						</div>
						<div className='relative p-3 w-36 text-center text-base text-gray-500 after:content-["|"] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:text-gray-300'>
							課程費用
						</div>
						<div className='p-3 w-28 text-center text-base text-gray-500'>
							簡章下載
						</div>
					</div>

					<div className='tbody w-full flex flex-col justify-start items-center'>
						{/* 課程卡片列表 */}
						{currentCourses.length > 0 ? (
							currentCourses.map((course, index) => (
								<div
									key={index}
									className='flex flex-col lg:flex-row justify-between items-start lg:items-center w-full text-gray-700 text-base border-b border-gray-300 hover:bg-gray-50 transition-colors p-3 lg:p-0 gap-2 lg:gap-0'>
									{/* 手機版標題顯示 */}
									<div className='lg:hidden w-full'>
										<h3 className='font-bold text-lg mb-2'>{course.title}</h3>
										<div className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm'>
											<div>
												<span className='text-gray-500'>開課日期：</span>
												<span>
													{new Date(course.startAt).toLocaleDateString()}-
													{new Date(course.endAt).toLocaleDateString()}
												</span>
											</div>
											<div>
												<span className='text-gray-500'>課程時數：</span>
												<span>{course.trainingHours}小時</span>
											</div>
											<div>
												<span className='text-gray-500'>課程費用：</span>
												<span>
													{typeof course.fee === "number"
														? `NT$ ${course.fee.toLocaleString()}`
														: course.fee}
												</span>
											</div>
										</div>
										<a
											href={course.filePath}
											target='_blank'
											rel='noopener noreferrer'
											className='inline-flex items-center justify-center gap-2 px-4 py-2 bg-linear-to-r from-[#2b68b3] to-[#4a90e2] text-white rounded-lg hover:from-[#1f4d85] hover:to-[#2b68b3] transition-all duration-300 shadow-md hover:shadow-lg mt-3'>
											<IoDownload className='text-lg' />
											<span className='text-sm font-medium'>下載簡章</span>
										</a>
									</div>

									{/* 桌面版顯示 */}
									<div className='hidden lg:block relative p-3 w-52 text-start'>
										{new Date(course.startAt).toLocaleDateString()} -{" "}
										{new Date(course.endAt).toLocaleDateString()}
									</div>
									<div className='hidden lg:block relative flex-1 p-3 text-start font-medium'>
										{course.title}
									</div>
									<div className='hidden lg:block relative p-3 w-36 text-center'>
										{course.trainingHours}
									</div>
									<div className='hidden lg:block relative p-3 w-36 text-center'>
										{typeof course.fee === "number"
											? `NT$ ${course.fee.toLocaleString()}`
											: course.fee}
									</div>
									<div className='hidden lg:block p-3 w-28 text-center'>
										<a
											href={course.filePath}
											target='_blank'
											rel='noopener noreferrer'
											className='inline-flex items-center justify-center gap-2 px-4 py-2 bg-linear-to-r from-[#2b68b3] to-[#4a90e2] text-white rounded-lg hover:from-[#1f4d85] hover:to-[#2b68b3] transition-all duration-300 shadow-md hover:shadow-lg transform focus:outline-none focus:ring-2 focus:ring-[#2b68b3] focus:ring-offset-2 cursor-pointer'
											aria-label='下載課程簡章'>
											<IoDownload className='text-lg' />
											<span className='text-sm font-medium'>下載</span>
										</a>
									</div>
								</div>
							))
						) : (
							<div className='w-full text-center py-12 text-gray-500'>
								<p className='text-lg'>目前沒有符合條件的課程</p>
							</div>
						)}
					</div>

					{/* 分頁器 */}
					{searchedCourses.length > 0 && (
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={handlePageChange}
						/>
					)}
				</div>
			</div>
		</section>
	);
};
