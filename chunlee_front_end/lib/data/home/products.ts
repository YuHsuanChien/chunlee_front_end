// data.ts (注意：.ts 不是 .tsx)
import {
	FaChartLine,
	FaHandshake,
	FaUsers,
	FaChalkboardTeacher,
	FaGlobeAsia,
} from "react-icons/fa";
import { IconType } from "react-icons";

export interface Product {
	svgIcon: IconType; // ← 使用 IconType
	title: string;
	description: string;
	link: string;
}

export const products: Product[] = [
	{
		svgIcon: FaChartLine, // ← 沒有 <> 和 />
		title: "經營診斷",
		description:
			"透過全面的經營診斷，找出企業的優勢與挑戰，制定有效的成長策略。",
		link: "/business-function/business-consulting",
	},
	{
		svgIcon: FaHandshake, // ← 沒有 <> 和 />
		title: "顧問輔導",
		description:
			"提供專業顧問服務，協助企業解決經營難題，提升營運效率與競爭力。",
		link: "/business-function/consulting",
	},
	{
		svgIcon: FaUsers,
		title: "內部訓練",
		description: "為企業量身打造內部培訓課程，提升員工專業技能與團隊協作能力。",
		link: "/training-program/interior",
	},
	{
		svgIcon: FaChalkboardTeacher,
		title: "公開課程",
		description: "開設多元化公開課程，幫助專業人士掌握最新產業知識與管理技能。",
		link: "/training-program/exterior",
	},
	{
		svgIcon: FaGlobeAsia,
		title: "海外投資",
		description: "提供海外市場分析與投資策略規劃，協助企業拓展國際市場商機。",
		link: "/training-program/interior/overseas-investment",
	},
];
