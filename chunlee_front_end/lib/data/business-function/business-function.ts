export interface BusinessFunctionItem {
	id: number;
	type: string;
	title: string;
	itemList: string[];
}

export const businessFunctions: BusinessFunctionItem[] = [
	{
		id: 1,
		type: "diagnosis",
		title: "經營體系診斷",
		itemList: ["製造診斷", "批發診斷", "零售診斷", "服務診斷", "海外診斷"],
	},
	{
		id: 2,
		type: "counseling",
		title: "策略體系輔導",
		itemList: ["願景管理", "策略管理", "年度計劃", "部門績效", "企業文化"],
	},
	{
		id: 3,
		type: "counseling",
		title: "組織管理輔導",
		itemList: ["組織規劃", "單位職掌", "個人工作", "經營會議", "權限劃分"],
	},
	{
		id: 4,
		type: "counseling",
		title: "行銷管理輔導",
		itemList: ["市場策略", "區域行銷", "推銷技巧", "績效獎金", "業績擴大"],
	},
	{
		id: 5,
		type: "counseling",
		title: "研發管理輔導",
		itemList: ["開發創意", "時程管理", "價值管理", "製程設計", "產能規劃"],
	},
	{
		id: 6,
		type: "counseling",
		title: "生產管理輔導",
		itemList: ["生產管制", "物料管理", "採購管理", "製造管理", "品質管理"],
	},
	{
		id: 7,
		type: "counseling",
		title: "人事管理輔導",
		itemList: ["人力規劃", "人事管理", "薪資考績", "升遷福利", "人才培訓"],
	},
	{
		id: 8,
		type: "counseling",
		title: "財務管理輔導",
		itemList: ["會計制度", "成本制度", "資金管理", "內控內稽", "經營分析"],
	},
	{
		id: 9,
		type: "project",
		title: "批發專案輔導",
		itemList: [
			"市場調查",
			"戰略規劃",
			"區域行銷",
			"推銷技巧",
			"行動管理",
			"客戶管理",
			"銷售管理",
			"商品管理",
			"經銷輔導",
			"績效評估",
		],
	},
	{
		id: 10,
		type: "professional",
		title: "零售專業輔導",
		itemList: [
			"商圈調查",
			"商品輔導",
			"賣場輔導",
			"銷售輔導",
			"人力輔導",
			"財務輔導",
			"促銷輔導",
			"競爭輔導",
			"情報輔導",
			"連鎖輔導",
		],
	},
];
