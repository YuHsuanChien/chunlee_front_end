"use client";

import Link from "next/link";
import { navItems } from "../lib/data";
import { useEffect } from "react";

const HeaderBar = () => {

	return (
		<header className='hidden lg:block lg:fixed z-50 top-0 left-0 w-full shadow-md'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					{/* Logo */}
					<div className='shrink-0'>
						<Link href='/' className='text-2xl font-bold text-white'>
							群力顧問
						</Link>
					</div>

					{/* Navigation Menu */}
					<nav className='hidden lg:flex space-x-8'>
						{navItems.map((item) => (
							<div key={item.label} className='relative group'>
								<Link
									href={item.href}
									className='text-white px-3 py-2 text-sm font-medium transition-colors duration-200'>
									{item.label}
								</Link>

								{/* Dropdown Menu */}
								{item.submenu && (
									<div className='absolute left-0 mt-2 w-48 bg-[#10243d] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50'>
										<div className='py-1'>
											{item.submenu.map((subItem) => (
												<Link
													key={subItem.label}
													href={subItem.href}
													className='block px-4 py-2 text-sm text-white'>
													{subItem.label}
												</Link>
											))}
										</div>
									</div>
								)}
							</div>
						))}
					</nav>
				</div>
			</div>
		</header>
	);
};

export default HeaderBar;
