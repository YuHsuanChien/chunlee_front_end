export type { BusinessFunctionItem } from "./BusinessFunctionType";

// 內部訓練相關介面
export interface Course {
	id: number;
	title: string;
	content: string[];
}

export interface InteriorData {
	courseId: string;
	courseName: string;
	courseList: Course[];
}

export interface ExteriorListData {
	success: boolean;
	data: ExteriorListItemData[];
}

export interface ExteriorListItemData {
	id: number;
	code: string;
	name: string;
}

// 公開課程卡片資料
export interface ExteriorCourseItem {
	id: number;
	code: string;
	title: string;
	loction: string;
	startAt: Date | string;
	endAt: Date | string;
	trainingHours: string;
	fee: number | string;
	filePath: string;
}

export interface InteriorListProps {
	data: InteriorData[];
}

export interface Course {
	id: number;
	title: string;
	content: string[];
}

export interface ExteriorListProps {
	exteriorList: ExteriorListItemData[];
	courseData: ExteriorCourseItem[];
}
