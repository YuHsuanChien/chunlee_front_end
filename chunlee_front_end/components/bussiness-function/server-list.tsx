"use client";
import type { BusinessFunctionItem } from "@/lib/data";
import { useEffect, useState } from "react";
import { IoChevronDown } from "react-icons/io5";

export const ServerList = ({ data }: { data: BusinessFunctionItem[] }) => {
	const [selectItem, setSelectItem] = useState<BusinessFunctionItem | null>(
		null
	);
	const [isOpen, setIsOpen] = useState(false);

	function handleItemClick(item: BusinessFunctionItem) {
		setSelectItem(item);
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
					<p>次選單</p>
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
									selectItem?.title === item.title
										? "bg-[#2b68b3] text-white"
										: ""
								}`}
								onClick={() => {
									handleItemClick(item);
									setIsOpen(!isOpen);
								}}>
								{item.title}
							</li>
						))}
				</ul>
			</div>
			{/* 服務清單 */}
			<div className='md:col-span-3'>
				<div className='grid md:grid-cols-4 gap-2 md:gap-3 lg:gap-10'>
					{selectItem &&
						selectItem.itemList.map((service, index) => (
							<div key={index} className='border border-gray-200 p-4 shadow-sm'>
								<h3 className=''>
									{index + 1}. {service}
								</h3>
							</div>
						))}
				</div>
			</div>
		</section>
	);
};
