"use client";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export const Pagination = ({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) => {
	const getPageNumbers = () => {
		const pages: (number | string)[] = [];
		const maxVisiblePages = 5;

		if (totalPages <= maxVisiblePages) {
			// 如果總頁數少於最大顯示頁數，顯示所有頁碼
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			// 總是顯示第一頁
			pages.push(1);

			if (currentPage > 3) {
				pages.push("...");
			}

			// 計算中間頁碼範圍
			const startPage = Math.max(2, currentPage - 1);
			const endPage = Math.min(totalPages - 1, currentPage + 1);

			for (let i = startPage; i <= endPage; i++) {
				pages.push(i);
			}

			if (currentPage < totalPages - 2) {
				pages.push("...");
			}

			// 總是顯示最後一頁
			pages.push(totalPages);
		}

		return pages;
	};

	if (totalPages <= 1) return null;

	return (
		<div className='flex justify-center items-center gap-2 mt-8'>
			{/* 上一頁按鈕 */}
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className='w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
				aria-label='上一頁'>
				<IoChevronBack className='text-xl' />
			</button>

			{/* 頁碼按鈕 */}
			{getPageNumbers().map((page, index) => (
				<div key={index}>
					{page === "..." ? (
						<span className='w-10 h-10 flex items-center justify-center text-gray-500'>
							{page}
						</span>
					) : (
						<button
							onClick={() => onPageChange(page as number)}
							className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-colors ${
								currentPage === page
									? "bg-[#2b68b3] text-white border-[#2b68b3]"
									: "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
							}`}>
							{page}
						</button>
					)}
				</div>
			))}

			{/* 下一頁按鈕 */}
			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className='w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
				aria-label='下一頁'>
				<IoChevronForward className='text-xl' />
			</button>
		</div>
	);
};
