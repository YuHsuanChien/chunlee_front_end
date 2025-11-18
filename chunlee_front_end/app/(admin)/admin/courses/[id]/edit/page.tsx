"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "@/lib/axios/axios";
import {
	FormWrapper,
	Input,
	Select,
	Button,
	Loading,
} from "@/components/admin";
import type { AdminCourseFormData, AdminCourse } from "@/lib/interfaces";
import { IoArrowBack, IoSave } from "react-icons/io5";

export default function EditCoursePage() {
	const router = useRouter();
	const params = useParams();
	const courseId = params.id as string;

	const [isLoading, setIsLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const [formData, setFormData] = useState<AdminCourseFormData>({
		code: "",
		title: "",
		categoryId: 0,
		startAt: "",
		endAt: "",
		trainingHours: 0,
		fee: 0,
		location: "",
		status: "draft",
	});

	const fetchCourse = async () => {
		try {
			setIsLoading(true);
			const response = await axios.get(`/admin/courses/${courseId}`);

			if (response.data.success) {
				const course: AdminCourse = response.data.data;
				setFormData({
					code: course.code,
					title: course.title,
					categoryId: course.categoryId,
					startAt: course.startAt.split("T")[0],
					endAt: course.endAt.split("T")[0],
					trainingHours: course.trainingHours,
					fee: course.fee,
					location: course.location,
					status: course.status,
				});
			}
		} catch (error) {
			console.error("載入課程失敗:", error);
			// 使用模擬資料以便開發
			const mockCourse: AdminCourse = {
				id: Number(courseId),
				code: "COURSE-0001",
				title: "測試課程",
				category: "台中班(零售業)",
				categoryId: 1,
				startAt: "2025-01-15",
				endAt: "2025-01-17",
				trainingHours: 18,
				fee: 5000,
				location: "台中市",
				status: "published",
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			setFormData({
				code: mockCourse.code,
				title: mockCourse.title,
				categoryId: mockCourse.categoryId,
				startAt: mockCourse.startAt,
				endAt: mockCourse.endAt,
				trainingHours: mockCourse.trainingHours,
				fee: mockCourse.fee,
				location: mockCourse.location,
				status: mockCourse.status,
			});
		} finally {
			setIsLoading(false);
		}
	};

	// 載入課程資料
	useEffect(() => {
		fetchCourse();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [courseId]);

	// 表單驗證
	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!formData.code.trim()) {
			newErrors.code = "請輸入課程代碼";
		}

		if (!formData.title.trim()) {
			newErrors.title = "請輸入課程名稱";
		}

		if (formData.categoryId === 0) {
			newErrors.categoryId = "請選擇課程分類";
		}

		if (!formData.startAt) {
			newErrors.startAt = "請選擇開課日期";
		}

		if (!formData.endAt) {
			newErrors.endAt = "請選擇結束日期";
		}

		if (
			formData.startAt &&
			formData.endAt &&
			formData.startAt > formData.endAt
		) {
			newErrors.endAt = "結束日期不能早於開課日期";
		}

		if (formData.trainingHours <= 0) {
			newErrors.trainingHours = "請輸入有效的訓練時數";
		}

		if (formData.fee < 0) {
			newErrors.fee = "費用不能為負數";
		}

		if (!formData.location.trim()) {
			newErrors.location = "請輸入上課地點";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// 提交表單
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		try {
			setIsSubmitting(true);

			// 呼叫 API 更新課程
			const response = await axios.put(`/admin/courses/${courseId}`, formData);

			if (response.data.success) {
				alert("課程更新成功!");
				router.push("/admin/courses");
			}
		} catch (error) {
			console.error("更新課程失敗:", error);
			alert("更新失敗,請稍後再試");
		} finally {
			setIsSubmitting(false);
		}
	};

	// 更新表單欄位
	const updateField = (
		field: keyof AdminCourseFormData,
		value: string | number
	) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		// 清除該欄位的錯誤訊息
		if (errors[field]) {
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[field];
				return newErrors;
			});
		}
	};

	// 分類選項
	const categoryOptions = [
		{ value: 0, label: "請選擇分類", disabled: true },
		{ value: 1, label: "台中班(零售業)" },
		{ value: 2, label: "台中班(工)" },
		{ value: 3, label: "台中班(服務業)" },
		{ value: 4, label: "桃園班" },
		{ value: 5, label: "台南班" },
		{ value: 6, label: "高雄班" },
	];

	const statusOptions = [
		{ value: "draft", label: "草稿" },
		{ value: "published", label: "已發布" },
		{ value: "archived", label: "已封存" },
	];

	if (isLoading) {
		return <Loading size='lg' text='載入課程資料中...' fullScreen />;
	}

	return (
		<div className='max-w-4xl'>
			{/* 頁面標題 */}
			<div className='mb-6'>
				<button
					onClick={() => router.back()}
					className='flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors'>
					<IoArrowBack className='w-5 h-5 mr-2' />
					返回列表
				</button>
				<h1 className='text-2xl sm:text-3xl font-bold text-gray-900'>
					編輯課程
				</h1>
				<p className='mt-1 text-sm text-gray-600'>
					修改課程資訊 (ID: {courseId})
				</p>
			</div>

			{/* 表單 */}
			<FormWrapper
				title='課程資訊'
				description='請更新課程的詳細資料'
				onSubmit={handleSubmit}
				footer={
					<>
						<Button
							type='button'
							variant='outline'
							onClick={() => router.back()}
							disabled={isSubmitting}>
							取消
						</Button>
						<Button
							type='submit'
							variant='primary'
							icon={<IoSave />}
							isLoading={isSubmitting}
							disabled={isSubmitting}>
							更新課程
						</Button>
					</>
				}>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{/* 課程代碼 */}
					<Input
						label='課程代碼'
						placeholder='例如: COURSE-0001'
						value={formData.code}
						onChange={(e) => updateField("code", e.target.value)}
						error={errors.code}
						required
					/>

					{/* 課程分類 */}
					<Select
						label='課程分類'
						options={categoryOptions}
						value={formData.categoryId}
						onChange={(e) => updateField("categoryId", Number(e.target.value))}
						error={errors.categoryId}
						required
					/>

					{/* 課程名稱 */}
					<div className='md:col-span-2'>
						<Input
							label='課程名稱'
							placeholder='請輸入課程名稱'
							value={formData.title}
							onChange={(e) => updateField("title", e.target.value)}
							error={errors.title}
							required
						/>
					</div>

					{/* 開課日期 */}
					<Input
						label='開課日期'
						type='date'
						value={formData.startAt}
						onChange={(e) => updateField("startAt", e.target.value)}
						error={errors.startAt}
						required
					/>

					{/* 結束日期 */}
					<Input
						label='結束日期'
						type='date'
						value={formData.endAt}
						onChange={(e) => updateField("endAt", e.target.value)}
						error={errors.endAt}
						required
					/>

					{/* 訓練時數 */}
					<Input
						label='訓練時數'
						type='number'
						placeholder='請輸入時數'
						value={formData.trainingHours || ""}
						onChange={(e) =>
							updateField("trainingHours", Number(e.target.value))
						}
						error={errors.trainingHours}
						helperText='單位: 小時'
						required
					/>

					{/* 課程費用 */}
					<Input
						label='課程費用'
						type='number'
						placeholder='請輸入費用'
						value={formData.fee || ""}
						onChange={(e) => updateField("fee", Number(e.target.value))}
						error={errors.fee}
						helperText='單位: 新台幣'
						required
					/>

					{/* 上課地點 */}
					<Input
						label='上課地點'
						placeholder='請輸入上課地點'
						value={formData.location}
						onChange={(e) => updateField("location", e.target.value)}
						error={errors.location}
						required
					/>

					{/* 課程狀態 */}
					<Select
						label='課程狀態'
						options={statusOptions}
						value={formData.status}
						onChange={(e) => updateField("status", e.target.value)}
						helperText='草稿不會顯示在前台'
						required
					/>
				</div>
			</FormWrapper>
		</div>
	);
}
