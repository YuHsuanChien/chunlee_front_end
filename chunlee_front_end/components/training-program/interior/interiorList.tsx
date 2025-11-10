"use client";
import { useEffect, useState } from "react";
import { IoChevronDown, IoClose } from "react-icons/io5";
import { InteriorData, InteriorListProps, Course } from "@/lib/interfaces";

export const InteriorList = ({ data }: InteriorListProps) => {
	const [selectItem, setSelectItem] = useState<InteriorData | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
	const [showModal, setShowModal] = useState(false);

	function handleItemClick(item: InteriorData) {
		setSelectItem(item);
	}

	function handleCourseClick(course: Course) {
		setSelectedCourse(course);
		setShowModal(true);
	}

	function closeModal() {
		setShowModal(false);
		setSelectedCourse(null);
	}

	useEffect(() => {
		setSelectItem(data[0]);
	}, [data]);

	return (
		<section className='max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-4 gap-3 md:gap-6 pb-12 md:pb-20 lg:pb-24'>
			{/* 項目 */}
			<div className='md:col-span-1'>
				<div
					className='md:hidden flex justify-between items-center p-4 border border-gray-200 rounded-lg mb-1'
					onClick={() => {
						setIsOpen(!isOpen);
					}}>
					<p className='font-medium'>
						{selectItem ? selectItem.courseName : "次選單"}
					</p>
					<IoChevronDown
						className={`text-2xl transition-all duration-500 ${
							isOpen ? "rotate-180" : ""
						}`}
					/>
				</div>
				<ul
					className={`w-full flex flex-col justify-center items-center shadow-lg rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 md:max-h-none ${
						isOpen
							? "max-h-[1000px] opacity-100"
							: "max-h-0 opacity-0 border-0 md:opacity-100 md:border md:max-h-none"
					}`}>
					{data &&
						data.map((item, index) => (
							<li
								key={index}
								className={`w-full border-b last:border-0 border-gray-200 py-3 md:py-6 px-3 cursor-pointer hover:bg-[#2b68b3] hover:text-white text-start
                ${
									selectItem?.courseName === item.courseName
										? "bg-[#2b68b3] text-white"
										: ""
								}`}
								onClick={() => {
									handleItemClick(item);
									setIsOpen(!isOpen);
								}}>
								{item.courseName}
							</li>
						))}
				</ul>
			</div>
			{/* 服務清單 */}
			<div className='md:col-span-3'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4'>
					{selectItem &&
						selectItem.courseList.map((course: Course, index: number) => (
							<div
								key={course.id}
								className='border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:border-[#2b68b3]'
								onClick={() => handleCourseClick(course)}>
								<h3 className='font-semibold text-gray-800'>
									{index + 1}. {course.title}
								</h3>
							</div>
						))}
				</div>
			</div>

			{/* 彈跳視窗 */}
			{showModal && selectedCourse && (
				<div
					className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'
					onClick={closeModal}>
					<div
						className='bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto'
						onClick={(e) => e.stopPropagation()}>
						{/* 標題列 */}
						<div className='sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start'>
							<h2 className='text-2xl font-bold text-[#2b68b3] pr-8'>
								{selectedCourse.title}
							</h2>
							<button
								onClick={closeModal}
								className='text-gray-400 hover:text-gray-600 transition-colors shrink-0'>
								<IoClose className='text-3xl' />
							</button>
						</div>

						{/* 內容 */}
						<div className='p-6'>
							<h3 className='text-lg font-semibold mb-4 text-gray-700'>
								課程內容：
							</h3>
							<ul className='space-y-3'>
								{selectedCourse.content.map((item: string, i: number) => (
									<li
										key={i}
										className='flex items-start text-gray-600 hover:text-gray-800 transition-colors'>
										<span className='text-[#2b68b3] mr-2 shrink-0'>•</span>
										<span>{item}</span>
									</li>
								))}
							</ul>
						</div>

						{/* 關閉按鈕 */}
						<div className='sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 flex justify-end'>
							<button
								onClick={closeModal}
								className='px-6 py-2 bg-[#2b68b3] text-white rounded-lg hover:bg-[#1f4d8a] transition-colors'>
								關閉
							</button>
						</div>
					</div>
				</div>
			)}
		</section>
	);
};
