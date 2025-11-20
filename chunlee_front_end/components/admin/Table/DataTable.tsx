"use client";

import { ReactNode } from "react";

export interface Column<T> {
	key: string;
	label: string;
	render?: (item: T, index: number) => ReactNode;
	sortable?: boolean;
	className?: string;
}

interface DataTableProps<T> {
	columns: Column<T>[];
	data: T[];
	keyExtractor: (item: T, index: number) => string | number;
	onRowClick?: (item: T, index: number) => void;
	emptyMessage?: string;
	isLoading?: boolean;
	striped?: boolean;
	hoverable?: boolean;
}

export function DataTable<T>({
	columns,
	data,
	keyExtractor,
	onRowClick,
	emptyMessage = "暫無資料",
	isLoading = false,
	striped = true,
	hoverable = true,
}: DataTableProps<T>) {
	if (isLoading) {
		return (
			<div className='bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden'>
				<div className='flex items-center justify-center p-12'>
					<div className='flex flex-col items-center space-y-4'>
						<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
						<p className='text-gray-600 dark:text-gray-400'>載入中...</p>
					</div>
				</div>
			</div>
		);
	}

	if (data.length === 0) {
		return (
			<div className='bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden'>
				<div className='flex items-center justify-center p-12'>
					<div className='text-center'>
						<svg
							className='mx-auto h-12 w-12 text-gray-400 dark:text-gray-500'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
							/>
						</svg>
						<p className='mt-4 text-gray-600 dark:text-gray-400'>
							{emptyMessage}
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden'>
			{/* 桌面版表格 */}
			<div className='hidden md:block overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
					<thead className='bg-gray-50 dark:bg-gray-700'>
						<tr>
							{columns.map((column) => (
								<th
									key={column.key}
									className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${
										column.className || ""
									}`}>
									{column.label}
								</th>
							))}
						</tr>
					</thead>
					<tbody className='bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700'>
						{data.map((item, index) => (
							<tr
								key={keyExtractor(item, index)}
								className={`
									${
										striped && index % 2 === 0
											? "bg-white dark:bg-gray-800"
											: "bg-gray-50 dark:bg-gray-750"
									}
									${hoverable ? "hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors" : ""}
									${onRowClick ? "cursor-pointer" : ""}
								`}
								onClick={() => onRowClick?.(item, index)}>
								{columns.map((column) => (
									<td
										key={column.key}
										className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300 ${
											column.className || ""
										}`}>
										{column.render
											? column.render(item, index)
											: String(
													(item as Record<string, unknown>)[column.key] ?? ""
											  )}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* 手機版卡片式顯示 */}
			<div className='md:hidden divide-y divide-gray-200 dark:divide-gray-700'>
				{data.map((item, index) => (
					<div
						key={keyExtractor(item, index)}
						className={`p-4 ${
							hoverable ? "hover:bg-gray-50 dark:hover:bg-gray-700" : ""
						} ${onRowClick ? "cursor-pointer" : ""}`}
						onClick={() => onRowClick?.(item, index)}>
						{columns.map((column) => (
							<div key={column.key} className='flex justify-between py-2'>
								<span className='font-medium text-gray-600 dark:text-gray-400 min-w-20'>
									{column.label}:
								</span>
								<span className='text-gray-900 dark:text-gray-300'>
									{column.render
										? column.render(item, index)
										: String(
												(item as Record<string, unknown>)[column.key] ?? ""
										  )}
								</span>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
