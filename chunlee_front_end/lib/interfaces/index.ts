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

// 後台課程管理相關介面
export interface AdminCourse {
	id: number;
	code: string;
	title: string;
	startAt: string;
	endAt: string;
	trainingHours: number;
	fee: number;
	location: string;
	status: "draft" | "published" | "archived";
	filePath?: string;
	createdAt: string;
	updatedAt: string;
}

export interface CourseDatePair {
	id: string;
	startAt: string;
	endAt: string;
}

export interface AdminCourseFormData {
	code: string;
	title: string;
	dates: CourseDatePair[];
	trainingHours: number;
	fee: number;
	location: string;
	status: "draft" | "published" | "archived";
	filePath?: string;
}

// 編輯課程用的表單資料 (單一日期)
export interface AdminCourseEditFormData {
	id?: string;
	code: string;
	title: string;
	startAt: string;
	endAt: string;
	trainingHours: number;
	fee: number;
	location: string;
	status: "draft" | "published" | "archived";
	filePath?: string;
}

export interface AdminCoursesResponse {
	success: boolean;
	data: AdminCourse[];
	total: number;
	page: number;
	pageSize: number;
}

export interface CategoryOptions {
	value: string | number;
	label: string;
}
