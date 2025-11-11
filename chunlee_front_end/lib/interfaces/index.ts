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
	id: number;
	typeId: string;
	typeName: string;
}

// 公開課程卡片資料
export interface ExteriorCourseItem {
	id: number;
	typeId: string;
	typeName: string;
	title: string;
	date: string;
	chooseYear: string;
	courseHours: string;
	fee: number | string;
	filePath: string;
}

export interface ExteriorCourseData {
	courseId: string;
	courseName: string;
	courseList: ExteriorCourseItem[];
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
	exteriorList: ExteriorListData[];
	courseData: ExteriorCourseData[];
}
