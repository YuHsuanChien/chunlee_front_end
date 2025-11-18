"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider, useAuth } from "../../lib/axios/providers/AuthProvider";
import "../globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

// Admin 布局內容組件
function AdminLayoutContent({ children }: { children: React.ReactNode }) {
	const { user, isLoading, logout } = useAuth();
	const router = useRouter();
	const pathname = usePathname();

	const isLoginPage = pathname === "/admin/login";

	useEffect(() => {
		// 如果沒有登入且不在登入頁，跳轉到登入頁（雙重保護）
		if (!isLoading && !user && !isLoginPage) {
			// console.log("[Layout] 用戶未登入，重定向到登入頁");
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
		<div className='min-h-screen bg-gray-50'>
			{/* 導航欄 */}
			<nav className='bg-white shadow-sm border-b border-gray-200'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between items-center h-16'>
						{/* 左側 Logo 和標題 */}
						<div className='flex items-center'>
							<h1 className='text-xl font-bold text-gray-900'>後台管理系統</h1>
						</div>

						{/* 右側用戶資訊和登出按鈕 */}
						<div className='flex items-center space-x-4'>
							<div className='flex items-center space-x-2'>
								<div className='w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium'>
									{user.name.charAt(0)}
								</div>
								<div className='hidden sm:block'>
									<p className='text-sm font-medium text-gray-900'>
										{user.name}
									</p>
									<p className='text-xs text-gray-500'>{user.role}</p>
								</div>
							</div>

							<button
								onClick={logout}
								className='inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition'>
								<svg
									className='w-4 h-4 mr-1'
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
								登出
							</button>
						</div>
					</div>
				</div>
			</nav>

			{/* 主要內容區域 */}
			<main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
				<div className='px-4 py-6 sm:px-0'>{children}</div>
			</main>
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
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<AuthProvider>
					<AdminLayoutContent>{children}</AdminLayoutContent>
				</AuthProvider>
			</body>
		</html>
	);
}
