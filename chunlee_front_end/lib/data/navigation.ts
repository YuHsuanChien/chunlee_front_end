export interface NavItem {
	label: string;
	href: string;
	submenu?: NavItem[];
}

export const navItems: NavItem[] = [
	{ label: "首頁", href: "/" },
	{ label: "關於我們", href: "/about" },
	{
		label: "企業輔導",
		href: "/business-function",
	},
	{
		label: "教育訓練",
		href: "/training-program",
		submenu: [
			{ label: "內訓課程", href: "/training-program/interior" },
			{ label: "公開課程", href: "/training-program/exterior" },
		],
	},
	{ label: "聯絡我們", href: "/contact-us" },
];
