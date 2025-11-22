"use client";

import { useAuth } from "../../../lib/axios/providers/AuthProvider";
import { useState, useEffect } from "react";
import packageJson from "../../../package.json";

// 技術棧配置
const techStack = [
	{
		name: "Next.js",
		version: packageJson.dependencies.next,
		icon: "⚡",
		color: "bg-gray-900 text-white",
	},
	{
		name: "React",
		version: packageJson.dependencies.react,
		icon: "⚛️",
		color: "bg-blue-500 text-white",
	},
	{
		name: "TypeScript",
		version: packageJson.devDependencies.typescript,
		icon: "📘",
		color: "bg-blue-600 text-white",
	},
	{
		name: "Tailwind CSS",
		version: packageJson.devDependencies.tailwindcss,
		icon: "🎨",
		color: "bg-cyan-500 text-white",
	},
	{
		name: "Axios",
		version: packageJson.dependencies.axios,
		icon: "🌐",
		color: "bg-purple-500 text-white",
	},
	{
		name: "Zustand",
		version: packageJson.dependencies.zustand,
		icon: "🐻",
		color: "bg-amber-600 text-white",
	},
	{
		name: "React Icons",
		version: packageJson.dependencies["react-icons"],
		icon: "🎭",
		color: "bg-pink-500 text-white",
	},
	{
		name: "Swiper",
		version: packageJson.dependencies.swiper,
		icon: "📱",
		color: "bg-indigo-500 text-white",
	},
];

export default function AdminHome() {
	const { user } = useAuth();
	const [currentTime, setCurrentTime] = useState<string>("");

	// 動態更新當前時間
	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			setCurrentTime(
				now.toLocaleString("zh-TW", {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
					hour12: false,
				})
			);
		};

		updateTime();
		const timer = setInterval(updateTime, 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<div className='space-y-6'>
			{/* 歡迎卡片 */}
			<div className='bg-white rounded-lg shadow-sm p-6 border border-gray-200'>
				<h1 className='text-2xl font-bold text-gray-900 mb-2'>
					歡迎回來，{user?.name}！
				</h1>
				<p className='text-gray-600'>這是群力管理顧問公司的後台管理系統</p>
			</div>

			{/* 統計卡片 */}
			{/* <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
				<div className='bg-white rounded-lg shadow-sm p-6 border border-gray-200'>
					<div className='flex items-center'>
						<div className='flex-shrink-0'>
							<div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
								<svg
									className='w-6 h-6 text-blue-600'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
									/>
								</svg>
							</div>
						</div>
						<div className='ml-4'>
							<p className='text-sm font-medium text-gray-600'>總用戶數</p>
							<p className='text-2xl font-bold text-gray-900'>1,234</p>
						</div>
					</div>
				</div>

				<div className='bg-white rounded-lg shadow-sm p-6 border border-gray-200'>
					<div className='flex items-center'>
						<div className='flex-shrink-0'>
							<div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
								<svg
									className='w-6 h-6 text-green-600'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
									/>
								</svg>
							</div>
						</div>
						<div className='ml-4'>
							<p className='text-sm font-medium text-gray-600'>文章數量</p>
							<p className='text-2xl font-bold text-gray-900'>856</p>
						</div>
					</div>
				</div>

				<div className='bg-white rounded-lg shadow-sm p-6 border border-gray-200'>
					<div className='flex items-center'>
						<div className='flex-shrink-0'>
							<div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center'>
								<svg
									className='w-6 h-6 text-purple-600'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
									/>
								</svg>
							</div>
						</div>
						<div className='ml-4'>
							<p className='text-sm font-medium text-gray-600'>待處理訊息</p>
							<p className='text-2xl font-bold text-gray-900'>42</p>
						</div>
					</div>
				</div>
			</div> */}

			{/* 快速操作 */}
			{/* <div className='bg-white rounded-lg shadow-sm p-6 border border-gray-200'>
				<h2 className='text-lg font-semibold text-gray-900 mb-4'>快速操作</h2>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
					<button className='flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition'>
						<svg
							className='w-8 h-8 text-gray-400 mb-2'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M12 6v6m0 0v6m0-6h6m-6 0H6'
							/>
						</svg>
						<span className='text-sm font-medium text-gray-700'>新增文章</span>
					</button>

					<button className='flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition'>
						<svg
							className='w-8 h-8 text-gray-400 mb-2'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
							/>
						</svg>
						<span className='text-sm font-medium text-gray-700'>管理用戶</span>
					</button>

					<button className='flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition'>
						<svg
							className='w-8 h-8 text-gray-400 mb-2'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
							/>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
							/>
						</svg>
						<span className='text-sm font-medium text-gray-700'>系統設定</span>
					</button>

					<button className='flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition'>
						<svg
							className='w-8 h-8 text-gray-400 mb-2'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
							/>
						</svg>
						<span className='text-sm font-medium text-gray-700'>數據分析</span>
					</button>
				</div>
			</div> */}

			{/* 系統資訊 */}
			<div className='bg-white rounded-lg shadow-sm p-6 border border-gray-200'>
				<h2 className='text-lg font-semibold text-gray-900 mb-4'>系統資訊</h2>
				<div className='space-y-3 text-sm'>
					<div className='flex flex-col sm:flex-row sm:justify-between gap-1'>
						<span className='text-gray-600'>當前角色：</span>
						<span className='font-medium text-gray-900'>{user?.role}</span>
					</div>
					<div className='flex flex-col sm:flex-row sm:justify-between gap-1'>
						<span className='text-gray-600'>帳號：</span>
						<span className='font-medium text-gray-900'>{user?.account}</span>
					</div>
					<div className='flex flex-col sm:flex-row sm:justify-between gap-1'>
						<span className='text-gray-600'>系統版本：</span>
						<span className='font-medium text-gray-900'>
							v{packageJson.version}
						</span>
					</div>
					<div className='flex flex-col sm:flex-row sm:justify-between gap-1'>
						<span className='text-gray-600'>當前時間：</span>
						<span className='font-medium text-gray-900 tabular-nums'>
							{currentTime}
						</span>
					</div>
				</div>
			</div>

			{/* 技術棧資訊 */}
			<div className='bg-white rounded-lg shadow-sm p-6 border border-gray-200'>
				<h2 className='text-lg font-semibold text-gray-900 mb-4'>
					技術棧 & 套件版本
				</h2>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
					{techStack.map((tech) => (
						<div
							key={tech.name}
							className='flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow'>
							<div
								className={`shrink-0 w-10 h-10 ${tech.color} rounded-lg flex items-center justify-center text-lg`}>
								{tech.icon}
							</div>
							<div className='flex-1 min-w-0'>
								<p className='text-sm font-semibold text-gray-900 truncate'>
									{tech.name}
								</p>
								<p className='text-xs text-gray-500 font-mono'>
									v{tech.version.replace("^", "")}
								</p>
							</div>
						</div>
					))}
				</div>

				{/* 其他套件 */}
				<div className='mt-6 pt-6 border-t border-gray-200'>
					<h3 className='text-sm font-semibold text-gray-900 mb-3'>
						其他開發工具
					</h3>
					<div className='flex flex-wrap gap-2'>
						<span className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium'>
							JWT v{packageJson.dependencies.jsonwebtoken.replace("^", "")}
						</span>
						<span className='px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium'>
							UUID v{packageJson.dependencies.uuid.replace("^", "")}
						</span>
						<span className='px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium'>
							ESLint v{packageJson.devDependencies.eslint.replace("^", "")}
						</span>
						<span className='px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium'>
							PostCSS v
							{packageJson.devDependencies["@tailwindcss/postcss"].replace(
								"^",
								""
							)}
						</span>
					</div>
				</div>

				{/* 環境資訊 */}
				<div className='mt-6 pt-6 border-t border-gray-200'>
					<h3 className='text-sm font-semibold text-gray-900 mb-3'>執行環境</h3>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs'>
						<div className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'>
							<span className='text-gray-600'>Node.js:</span>
							<span className='font-mono text-gray-900'>
								{typeof process !== "undefined" ? process.version : "N/A"}
							</span>
						</div>
						<div className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'>
							<span className='text-gray-600'>Environment:</span>
							<span className='font-mono text-gray-900'>
								{process.env.NODE_ENV || "development"}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
