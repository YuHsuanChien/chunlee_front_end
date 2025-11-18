"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	IoMenu,
	IoClose,
	IoHome,
	IoBook,
	IoChevronDown,
} from "react-icons/io5";

export interface MenuItem {
	name: string;
	href: string;
	icon: React.ReactNode;
	children?: MenuItem[];
}

interface SidebarProps {
	menuItems: MenuItem[];
	onClose?: () => void;
}

export const Sidebar = ({ menuItems, onClose }: SidebarProps) => {
	const pathname = usePathname();
	const [expandedItems, setExpandedItems] = useState<string[]>([]);
	const [isMobileOpen, setIsMobileOpen] = useState(false);

	const toggleExpand = (name: string) => {
		setExpandedItems((prev) =>
			prev.includes(name)
				? prev.filter((item) => item !== name)
				: [...prev, name]
		);
	};

	const isActive = (href: string) => pathname === href;
	const isExpanded = (name: string) => expandedItems.includes(name);

	const renderMenuItem = (item: MenuItem, level = 0) => {
		const hasChildren = item.children && item.children.length > 0;
		const active = isActive(item.href);
		const expanded = isExpanded(item.name);

		return (
			<div key={item.name}>
				{hasChildren ? (
					<button
						onClick={() => toggleExpand(item.name)}
						className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
							level > 0 ? "pl-8" : ""
						} ${
							active
								? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
								: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
						}`}>
						<div className='flex items-center'>
							<span className='text-xl mr-3'>{item.icon}</span>
							<span>{item.name}</span>
						</div>
						<IoChevronDown
							className={`w-5 h-5 transition-transform ${
								expanded ? "rotate-180" : ""
							}`}
						/>
					</button>
				) : (
					<Link
						href={item.href}
						onClick={() => {
							onClose?.();
							setIsMobileOpen(false);
						}}
						className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
							level > 0 ? "pl-8" : ""
						} ${
							active
								? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
								: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
						}`}>
						<span className='text-xl mr-3'>{item.icon}</span>
						<span>{item.name}</span>
					</Link>
				)}

				{/* 子選單 */}
				{hasChildren && expanded && (
					<div className='ml-4 mt-1 space-y-1'>
						{item.children?.map((child) => renderMenuItem(child, level + 1))}
					</div>
				)}
			</div>
		);
	};

	return (
		<>
			{/* 手機版漢堡選單按鈕 */}
			<button
				onClick={() => setIsMobileOpen(!isMobileOpen)}
				className='lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'>
				{isMobileOpen ? (
					<IoClose className='w-6 h-6' />
				) : (
					<IoMenu className='w-6 h-6' />
				)}
			</button>

			{/* 手機版遮罩 */}
			{isMobileOpen && (
				<div
					className='lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40'
					onClick={() => setIsMobileOpen(false)}></div>
			)}

			{/* 側邊欄 */}
			<aside
				className={`
					fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
					transition-transform duration-300 ease-in-out overflow-y-auto
					${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
				`}>
				<div className='p-4 space-y-2'>
					{/* Logo 區域 */}
					<div className='mb-6 pt-2'>
						<h2 className='text-xl font-bold text-gray-900 dark:text-white text-center lg:text-left'>
							後台管理系統
						</h2>
					</div>

					{/* 選單項目 */}
					<nav className='space-y-1'>
						{menuItems.map((item) => renderMenuItem(item))}
					</nav>
				</div>
			</aside>
		</>
	);
};

// 預設選單項目
export const defaultMenuItems: MenuItem[] = [
	{
		name: "儀表板",
		href: "/admin",
		icon: <IoHome />,
	},
	{
		name: "課程管理",
		href: "/admin/courses",
		icon: <IoBook />,
		children: [
			{ name: "課程列表", href: "/admin/courses", icon: <IoBook /> },
			{ name: "新增課程", href: "/admin/courses/create", icon: <IoBook /> },
		],
	},
];
