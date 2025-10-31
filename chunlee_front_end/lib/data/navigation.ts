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
		submenu: [
			{ label: "經營診斷", href: "/business-function/business-consulting" },
			{ label: "顧問輔導", href: "/business-function/consulting" },
		],
	},
	{
		label: "教育訓練",
		href: "/training-program",
		submenu: [
			{ label: "內訓課程", href: "/training-program/interior" },
			{ label: "公開課程", href: "/training-program/exterior" },
		],
	},
	{ label: "最新消息", href: "/latest-news" },
	{ label: "聯絡我們", href: "/contact-us" },
	{ label: "問答專區", href: "/qa" },
];
