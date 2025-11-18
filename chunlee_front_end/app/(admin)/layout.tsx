"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "../../lib/axios/providers/AuthProvider";
import { ThemeProvider, useTheme } from "../../lib/providers/ThemeProvider";
import { Sidebar, Breadcrumb, defaultMenuItems } from "@/components/admin";
import { IoMoon, IoSunny } from "react-icons/io5";
import "../globals.css";

// 主題切換按鈕組件
function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className='p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors'
			aria-label='切換主題'>
			{theme === "dark" ? (
				<IoSunny className='w-5 h-5' />
			) : (
				<IoMoon className='w-5 h-5' />
			)}
		</button>
	);
}

// Admin 布局內容組件
function AdminLayoutContent({ children }: { children: React.ReactNode }) {
	const { user, isLoading, logout } = useAuth();
	const router = useRouter();
	const pathname = usePathname();

	const isLoginPage = pathname === "/admin/login";

	useEffect(() => {
		if (!isLoading && !user && !isLoginPage) {
			router.push(`/admin/login?from=${pathname}`);
		}
	}, [user, isLoading, pathname, isLoginPage, router]);

	// 顯示載入中
	if (isLoading) {
		return (
			<div className='flex items-center justify-center min-h-screen bg-gray-50'>
				<div className='text-center'>
					<div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4'></div>
					<p className='text-gray-600'>載入中...</p>
				</div>
			</div>
		);
	}

	// 如果在登入頁，直接顯示登入頁面
	if (isLoginPage) {
		return <>{children}</>;
	}

	// 未登入時不顯示內容
	if (!user) {
		return null;
	}

	// 已登入，顯示完整的後台布局
	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900 flex'>
			{/* 側邊欄 */}
			<Sidebar menuItems={defaultMenuItems} />

			{/* 主要內容區域 */}
			<div className='flex-1 flex flex-col min-h-screen lg:ml-0'>
				{/* 頂部導航欄 */}
				<nav className='bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30'>
					<div className='px-4 sm:px-6 lg:px-8'>
						<div className='flex justify-between items-center h-16'>
							{/* 左側標題(手機版隱藏，避免與側邊欄按鈕重疊) */}
							<div className='flex items-center ml-16 lg:ml-0'>
								<h1 className='text-lg sm:text-xl font-bold text-gray-900 dark:text-white'>
									後台管理系統
								</h1>
							</div>

							{/* 右側用戶資訊和按鈕 */}
							<div className='flex items-center space-x-2 sm:space-x-4'>
								{/* 主題切換按鈕 */}
								<ThemeToggle />

								<div className='flex items-center space-x-2'>
									<div className='w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium'>
										{user.name.charAt(0)}
									</div>
									<div className='hidden sm:block'>
										<p className='text-sm font-medium text-gray-900 dark:text-white'>
											{user.name}
										</p>
										<p className='text-xs text-gray-500 dark:text-gray-400'>
											{user.role}
										</p>
									</div>
								</div>

								<button
									onClick={logout}
									className='inline-flex items-center px-2 sm:px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition'>
									<svg
										className='w-4 h-4 sm:mr-1'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
										/>
									</svg>
									<span className='hidden sm:inline'>登出</span>
								</button>
							</div>
						</div>
					</div>
				</nav>

				{/* 內容區 */}
				<main className='flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900'>
					<Breadcrumb />
					{children}
				</main>
			</div>
		</div>
	);
}

// Admin 布局根組件
export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='zh-TW'>
			<body className='antialiased'>
				<ThemeProvider>
					<AuthProvider>
						<AdminLayoutContent>{children}</AdminLayoutContent>
					</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
