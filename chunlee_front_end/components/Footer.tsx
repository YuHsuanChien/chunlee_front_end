"use client";

import Link from "next/link";
import { navItems } from "../lib/data";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className='bg-[#10243d] text-white'>
			<div className='max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Main Footer Content */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12'>
					{/* Company Info */}
					<div className='col-span-1 md:col-span-2 lg:col-span-1'>
						<h3 className='text-2xl font-bold mb-4'>群力顧問</h3>
						<p className='text-gray-300 text-sm leading-relaxed mb-4'>
							專業的企業管理顧問服務，提供經營診斷、策略輔導及教育訓練，協助企業提升競爭力與永續發展。
						</p>
						<div className='flex space-x-4'>
							{/* Social Media Icons (可根據需求新增) */}
							<a
								href='#'
								className='text-gray-300 hover:text-white transition-colors duration-200'
								aria-label='Facebook'>
								<svg
									className='h-6 w-6'
									fill='currentColor'
									viewBox='0 0 24 24'>
									<path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
								</svg>
							</a>
							<a
								href='#'
								className='text-gray-300 hover:text-white transition-colors duration-200'
								aria-label='LINE'>
								<svg
									className='h-6 w-6'
									fill='currentColor'
									viewBox='0 0 24 24'>
									<path d='M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314' />
								</svg>
							</a>
							<a
								href='#'
								className='text-gray-300 hover:text-white transition-colors duration-200'
								aria-label='Email'>
								<svg
									className='h-6 w-6'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
									/>
								</svg>
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className='text-lg font-semibold mb-4'>快速連結</h4>
						<ul className='space-y-2'>
							{navItems
								.filter((item) => !item.submenu)
								.map((item) => (
									<li key={item.label}>
										<Link
											href={item.href}
											className='text-gray-300 hover:text-white text-sm transition-colors duration-200'>
											{item.label}
										</Link>
									</li>
								))}
						</ul>
					</div>

					{/* Services */}
					<div>
						<h4 className='text-lg font-semibold mb-4'>服務項目</h4>
						<ul className='space-y-2'>
							<li>
								<Link
									href='/business-function'
									className='text-gray-300 hover:text-white text-sm transition-colors duration-200'>
									企業輔導
								</Link>
							</li>
							{navItems
								.find((item) => item.label === "教育訓練")
								?.submenu?.map((subItem) => (
									<li key={subItem.label}>
										<Link
											href={subItem.href}
											className='text-gray-300 hover:text-white text-sm transition-colors duration-200'>
											{subItem.label}
										</Link>
									</li>
								))}
						</ul>
					</div>

					{/* Contact Info */}
					<div>
						<h4 className='text-lg font-semibold mb-4'>聯絡資訊</h4>
						<ul className='space-y-3 text-sm text-gray-300'>
							<li className='flex items-start'>
								<svg
									className='h-5 w-5 mr-2 mt-0.5 shrink-0'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
									/>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
									/>
								</svg>
								<span>台中市北屯區北屯路390號3樓之1</span>
							</li>
							<li className='flex items-start'>
								<svg
									className='h-5 w-5 mr-2 mt-0.5 shrink-0'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
									/>
								</svg>
								<span>04-2241-5742</span>
							</li>
							<li className='flex items-start'>
								<svg
									className='h-5 w-5 mr-2 mt-0.5 shrink-0'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
									/>
								</svg>
								<span>chunleeconsulting@gmail.com</span>
							</li>
							<li className='flex items-start'>
								<svg
									className='h-5 w-5 mr-2 mt-0.5 shrink-0'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
									/>
								</svg>
								<span>週一至週五 09:00 - 18:00</span>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className='border-t border-gray-700 py-6'>
					<div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
						<p className='text-sm text-gray-300 text-center md:text-left'>
							© {currentYear} 群力企業管理顧問有限公司. All rights reserved.
						</p>
						<div className='flex space-x-6 text-sm'>
							<Link
								href='/privacy-policy'
								className='text-gray-300 hover:text-white transition-colors duration-200'>
								隱私權政策
							</Link>
							<Link
								href='/terms-of-service'
								className='text-gray-300 hover:text-white transition-colors duration-200'>
								服務條款
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
