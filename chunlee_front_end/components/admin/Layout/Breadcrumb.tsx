"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoChevronForward, IoHome } from "react-icons/io5";
import { useMemo } from "react";

export interface BreadcrumbItem {
	label: string;
	href?: string;
}

interface BreadcrumbProps {
	items?: BreadcrumbItem[];
	autoGenerate?: boolean;
}

export const Breadcrumb = ({ items, autoGenerate = true }: BreadcrumbProps) => {
	const pathname = usePathname();

	// 自動生成麵包屑
	const breadcrumbItems = useMemo(() => {
		if (items) return items;
		if (!autoGenerate) return [];

		const paths = pathname.split("/").filter(Boolean);
		const crumbs: BreadcrumbItem[] = [{ label: "首頁", href: "/admin" }];

		// 路徑名稱映射
		const nameMap: Record<string, string> = {
			admin: "後台",
			courses: "課程管理",
			categories: "分類管理",
			users: "用戶管理",
			settings: "系統設定",
			create: "新增課程",
			edit: "編輯課程",
			detail: "詳情",
		};

		let currentPath = "";
		paths.forEach((path, index) => {
			currentPath += `/${path}`;
			const label = nameMap[path] || path;

			// 最後一項不加連結
			if (index === paths.length - 1) {
				crumbs.push({ label });
			} else {
				crumbs.push({ label, href: currentPath });
			}
		});

		return crumbs;
	}, [pathname, items, autoGenerate]);

	if (breadcrumbItems.length === 0) return null;

	return (
		<nav className='flex items-center space-x-2 text-sm mb-6 overflow-x-auto'>
			{breadcrumbItems.map((item, index) => (
				<div key={index} className='flex items-center'>
					{/* 首頁圖示 */}
					{index === 0 && (
						<IoHome className='w-4 h-4 mr-2 text-gray-500 dark:text-gray-400 shrink-0' />
					)}

					{/* 麵包屑項目 */}
					{item.href ? (
						<Link
							href={item.href}
							className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline whitespace-nowrap'>
							{item.label}
						</Link>
					) : (
						<span className='text-gray-600 dark:text-gray-300 font-medium whitespace-nowrap'>
							{item.label}
						</span>
					)}

					{/* 分隔符號 */}
					{index < breadcrumbItems.length - 1 && (
						<IoChevronForward className='w-4 h-4 mx-2 text-gray-400 dark:text-gray-500 shrink-0' />
					)}
				</div>
			))}
		</nav>
	);
};
