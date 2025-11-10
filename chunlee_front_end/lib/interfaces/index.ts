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
}
