"use client";

import Link from "next/link";
import { navItems } from "../lib/data";
import { useNavigationStore } from "../lib/stores";
import { useEffect, useRef, useState } from "react";

const SideBar = () => {
	const {
		isSidebarOpen,
		openSubmenus,
		isTranslatedHeader,
		toggleSidebar,
		closeSidebar,
		toggleSubmenu,
		translateHeader,
	} = useNavigationStore();

	const lastScrollY = useRef(0);
	const accumulatedDistance = useRef(0); // 累積滾動距離

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			const scrollDistance = Math.abs(currentScrollY - lastScrollY.current); // 取絕對值
			accumulatedDistance.current += scrollDistance;
			if (accumulatedDistance.current > 10) {
				translateHeader(true);
				accumulatedDistance.current = 0;
			} else if (currentScrollY < lastScrollY.current) {
				translateHeader(false);
			}
			lastScrollY.current = currentScrollY;
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		console.log(isTranslatedHeader);
	}, [isTranslatedHeader]);

	return (
		<>
			{/* Mobile Header with Hamburger */}
			<header
				className={`lg:hidden fixed bg-white shadow-md border-b top-0 z-50 transition-all w-full duration-300 ${
					isTranslatedHeader ? "-translate-y-[300%]" : "translate-y-0"
				}`}>
				<div className='flex justify-between items-center h-16 px-4'>
					{/* Logo */}
					<Link href='/' className='text-2xl font-bold text-gray-900'>
						群力顧問
					</Link>

					{/* Hamburger Button */}
					<button
						onClick={toggleSidebar}
						className='p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
						aria-label='開啟選單'>
						<svg
							className='h-6 w-6'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							{isSidebarOpen ? (
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M6 18L18 6M6 6l12 12'
								/>
							) : (
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M4 6h16M4 12h16M4 18h16'
								/>
							)}
						</svg>
					</button>
				</div>
			</header>

			{/* Overlay */}
			{isSidebarOpen && (
				<div
					className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden'
					onClick={closeSidebar}
				/>
			)}

			{/* Sidebar */}
			<aside
				className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full"
				}`}>
				<div className='flex flex-col h-full'>
					{/* Sidebar Header */}
					<div className='flex justify-between items-center p-4 border-b'>
						<Link
							href='/'
							className='text-2xl font-bold text-gray-900'
							onClick={closeSidebar}>
							群力顧問
						</Link>
						<button
							onClick={closeSidebar}
							className='p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100'
							aria-label='關閉選單'>
							<svg
								className='h-6 w-6'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
					</div>

					{/* Navigation Menu */}
					<nav className='flex-1 overflow-y-auto py-4'>
						{navItems.map((item) => (
							<div key={item.label}>
								{item.submenu ? (
									<div>
										<button
											onClick={() => toggleSubmenu(item.label)}
											className='w-full flex justify-between items-center px-4 py-3 text-left text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200'>
											<span className='font-medium'>{item.label}</span>
											<svg
												className={`h-5 w-5 transform transition-transform duration-200 ${
													openSubmenus.includes(item.label) ? "rotate-180" : ""
												}`}
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M19 9l-7 7-7-7'
												/>
											</svg>
										</button>

										{/* Submenu */}
										<div
											className={`overflow-hidden transition-all duration-200 ${
												openSubmenus.includes(item.label)
													? "max-h-96"
													: "max-h-0"
											}`}>
											{item.submenu.map((subItem) => (
												<Link
													key={subItem.label}
													href={subItem.href}
													className='block pl-8 pr-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200'
													onClick={closeSidebar}>
													{subItem.label}
												</Link>
											))}
										</div>
									</div>
								) : (
									<Link
										href={item.href}
										className='block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-blue-600 font-medium transition-colors duration-200'
										onClick={closeSidebar}>
										{item.label}
									</Link>
								)}
							</div>
						))}
					</nav>
				</div>
			</aside>
		</>
	);
};

export default SideBar;
