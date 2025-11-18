"use client";

import {
	IoChevronBack,
	IoChevronForward,
	IoPlayBack,
	IoPlayForward,
} from "react-icons/io5";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	maxVisiblePages?: number;
	showFirstLast?: boolean;
}

export const Pagination = ({
	currentPage,
	totalPages,
	onPageChange,
	maxVisiblePages = 5,
	showFirstLast = true,
}: PaginationProps) => {
	if (totalPages <= 1) return null;

	// 計算要顯示的頁碼
	const getPageNumbers = () => {
		const pages: (number | string)[] = [];
		const halfVisible = Math.floor(maxVisiblePages / 2);

		let startPage = Math.max(1, currentPage - halfVisible);
		const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

		// 調整起始頁，確保顯示足夠的頁碼
		if (endPage - startPage + 1 < maxVisiblePages) {
			startPage = Math.max(1, endPage - maxVisiblePages + 1);
		}

		// 添加第一頁和省略號
		if (startPage > 1) {
			pages.push(1);
			if (startPage > 2) {
				pages.push("...");
			}
		}

		// 添加中間頁碼
		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		// 添加省略號和最後一頁
		if (endPage < totalPages) {
			if (endPage < totalPages - 1) {
				pages.push("...");
			}
			pages.push(totalPages);
		}

		return pages;
	};

	const pageNumbers = getPageNumbers();

	const buttonBaseClass =
		"px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500";
	const activeClass = "bg-blue-600 text-white hover:bg-blue-700";
	const inactiveClass =
		"bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600";
	const disabledClass = "opacity-50 cursor-not-allowed";

	return (
		<div className='flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-4 sm:px-0'>
			{/* 頁面資訊 */}
			<div className='text-sm text-gray-600 dark:text-gray-400'>
				第 <span className='font-medium'>{currentPage}</span> 頁，共{" "}
				<span className='font-medium'>{totalPages}</span> 頁
			</div>

			{/* 分頁按鈕 */}
			<div className='flex items-center gap-1 sm:gap-2'>
				{/* 第一頁按鈕 */}
				{showFirstLast && (
					<button
						onClick={() => onPageChange(1)}
						disabled={currentPage === 1}
						className={`${buttonBaseClass} ${inactiveClass} ${
							currentPage === 1 ? disabledClass : ""
						} hidden sm:flex items-center`}
						aria-label='第一頁'>
						<IoPlayBack className='w-4 h-4' />
					</button>
				)}

				{/* 上一頁按鈕 */}
				<button
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className={`${buttonBaseClass} ${inactiveClass} ${
						currentPage === 1 ? disabledClass : ""
					} flex items-center`}
					aria-label='上一頁'>
					<IoChevronBack className='w-4 h-4' />
					<span className='ml-1 hidden sm:inline'>上一頁</span>
				</button>

				{/* 頁碼按鈕 */}
				<div className='hidden sm:flex items-center gap-1'>
					{pageNumbers.map((page, index) =>
						page === "..." ? (
							<span
								key={`ellipsis-${index}`}
								className='px-3 py-2 text-gray-500'>
								...
							</span>
						) : (
							<button
								key={page}
								onClick={() => onPageChange(page as number)}
								className={`${buttonBaseClass} ${
									currentPage === page ? activeClass : inactiveClass
								}`}>
								{page}
							</button>
						)
					)}
				</div>

				{/* 手機版頁碼顯示 */}
				<div className='sm:hidden px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
					{currentPage} / {totalPages}
				</div>

				{/* 下一頁按鈕 */}
				<button
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className={`${buttonBaseClass} ${inactiveClass} ${
						currentPage === totalPages ? disabledClass : ""
					} flex items-center`}
					aria-label='下一頁'>
					<span className='mr-1 hidden sm:inline'>下一頁</span>
					<IoChevronForward className='w-4 h-4' />
				</button>

				{/* 最後一頁按鈕 */}
				{showFirstLast && (
					<button
						onClick={() => onPageChange(totalPages)}
						disabled={currentPage === totalPages}
						className={`${buttonBaseClass} ${inactiveClass} ${
							currentPage === totalPages ? disabledClass : ""
						} hidden sm:flex items-center`}
						aria-label='最後一頁'>
						<IoPlayForward className='w-4 h-4' />
					</button>
				)}
			</div>
		</div>
	);
};
