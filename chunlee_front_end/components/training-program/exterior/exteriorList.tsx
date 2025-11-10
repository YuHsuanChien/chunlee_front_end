"use client";
import { ExteriorListProps, ExteriorListData } from "@/lib/interfaces";
import { IoChevronDown, IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";

export const ExteriorList = ({ exteriorList }: ExteriorListProps) => {
	const [selectItem, setSelectItem] = useState<ExteriorListData | null>(
		exteriorList && exteriorList.length > 0 ? exteriorList[0] : null
	);
	const [isOpen, setIsOpen] = useState(false);
	const [keyword, setKeyword] = useState("");
	const [selectedLocation, setSelectedLocation] = useState("");

	function handleItemClick(item: ExteriorListData) {
		setSelectItem(item);
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		console.log("搜尋關鍵字:", keyword);
		console.log("選擇地點:", selectedLocation);
		// 這裡可以添加搜尋邏輯
	}

	useEffect(() => {}, [exteriorList]);

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
						{selectItem ? selectItem.typeName : "次選單"}
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
					{exteriorList &&
						exteriorList.map((item) => (
							<li
								key={item.id}
								className={`w-full border-b last:border-0 border-gray-200 py-3 md:py-6 px-3 cursor-pointer hover:bg-[#2b68b3] hover:text-white text-start ${
									selectItem?.typeName === item.typeName
										? "bg-[#2b68b3] text-white"
										: ""
								}`}
								onClick={() => {
									handleItemClick(item);
									setIsOpen(!isOpen);
								}}>
								{item.typeName}
							</li>
						))}
				</ul>
			</div>
			{/* 服務清單 */}
			<div className='md:col-span-3'>
				<div className='px-5 py-4 flex flex-col lg:flex-row justify-between items-center bg-linear-to-r from-[#2b68b3] to-[#4a90e2] rounded-md mb-6 shadow-md gap-3'>
					<h2 className='text-lg lg:text-2xl font-semibold text-white'>快速搜尋</h2>
					<form
						onSubmit={handleSubmit}
						className='flex flex-col lg:flex-row justify-between items-center gap-3 w-full lg:w-auto'>
						<input
							type='text'
							name='keyword'
							value={keyword}
							onChange={(e) => setKeyword(e.target.value)}
							className='bg-white rounded-md px-3 py-2 h-10 focus:outline-none focus:ring-2 focus:ring-sky-900 focus:ring-opacity-50 w-full lg:w-auto'
							placeholder='請輸入課程關鍵字'
						/>
						<div className='flex justify-between items-center gap-5 w-full lg:w-auto'>
							<select
								name='sid'
								value={selectedLocation}
								onChange={(e) => setSelectedLocation(e.target.value)}
								className='bg-white rounded-md px-3 py-2 h-10 focus:outline-none focus:ring-2 focus:ring-sky-900 focus:ring-opacity-50 flex-1'>
								<option value=''>請選擇上課地點</option>
								<option value='1'>台北</option>
								<option value='7'>中壢</option>
								<option value='4'>新竹</option>
								<option value='3'>桃園</option>
								<option value='6'>台中</option>
								<option value='2'>台南</option>
								<option value='5'>高屏</option>
							</select>
							<button
								type='submit'
								className='w-10 h-10 bg-white text-[#2b68b3] rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 flex items-center justify-center shrink-0 cursor-pointer'
								aria-label='搜尋'>
								<IoSearch className='text-xl' />
							</button>
						</div>
					</form>
				</div>
				<div></div>
			</div>
		</section>
	);
};
