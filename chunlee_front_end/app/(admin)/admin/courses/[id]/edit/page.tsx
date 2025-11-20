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
import type {
	AdminCourseEditFormData,
	AdminCourse,
	ExteriorListData,
	CategoryOptions,
} from "@/lib/interfaces";
import {
	IoArrowBack,
	IoSave,
	IoCloudUpload,
	IoDocument,
	IoDownload,
	IoClose,
} from "react-icons/io5";
import { fecthcPubilcData } from "@/lib/hooks";

export default function EditCoursePage() {
	const router = useRouter();
	const params = useParams();
	const courseId = params.id as string;

	const [isLoading, setIsLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [categoryOptions, setCategoryOptions] = useState<CategoryOptions[]>([]);
	const [isUploading, setIsUploading] = useState(false);
	const [uploadedFileName, setUploadedFileName] = useState<string>("");
	const [originalFilePath, setOriginalFilePath] = useState<string>("");

	const [formData, setFormData] = useState<AdminCourseEditFormData>({
		id: "",
		code: "",
		title: "",
		startAt: "",
		endAt: "",
		trainingHours: 0,
		fee: 0,
		location: "",
		status: "draft",
		filePath: "",
	});

	/**
	 * 獲取課程資料
	 * 優先從 sessionStorage 讀取快取（避免重複 API 請求）
	 * 快取有效期：5 分鐘
	 */
	const fetchCourse = async () => {
		try {
			setIsLoading(true);

			// 1. 嘗試從 sessionStorage 讀取快取資料
			const cacheKey = `course_edit_${courseId}`;
			const cachedData = sessionStorage.getItem(cacheKey);

			if (cachedData) {
				try {
					const cacheObject = JSON.parse(cachedData);
					const course: AdminCourse = cacheObject.data;
					const timestamp = cacheObject.timestamp;

					// 檢查快取是否在 5 分鐘內（避免使用過期資料）
					const isValid = Date.now() - timestamp < 5 * 60 * 1000;

					if (isValid) {
						// 使用快取資料，無需呼叫 API
						const filePath = course.filePath || "";
						setFormData({
							id: course.id.toString(),
							code: course.code,
							title: course.title,
							startAt: course.startAt.split("T")[0],
							endAt: course.endAt.split("T")[0],
							trainingHours: course.trainingHours,
							fee: course.fee,
							location: course.location,
							status: course.status,
							filePath: filePath,
						});

						setOriginalFilePath(filePath);
						if (filePath) {
							setUploadedFileName(filePath.split("/").pop() || "");
						}
						setIsLoading(false);
						return;
					}
					// 快取已過期，繼續執行 API 請求
				} catch (error) {
					console.error("解析快取資料失敗:", error);
					// 解析失敗則清除無效快取
					sessionStorage.removeItem(cacheKey);
				}
			}

			// 2. 從 API 獲取課程資料（無快取或快取過期時）
			const response = await axios.get(`/admin/courses/${courseId}`);

			if (response.data.success) {
				const course: AdminCourse = response.data.data;
				const filePath = course.filePath || "";
				setFormData({
					id: course.id.toString(),
					code: course.code,
					title: course.title,
					startAt: course.startAt.split("T")[0],
					endAt: course.endAt.split("T")[0],
					trainingHours: course.trainingHours,
					fee: course.fee,
					location: course.location,
					status: course.status,
					filePath: filePath,
				});
				setOriginalFilePath(filePath);
				if (filePath) {
					setUploadedFileName(filePath.split("/").pop() || "");
				}
			}
		} catch (error) {
			console.error("載入課程失敗:", error);
			// 使用模擬資料以便開發
			const mockCourse: AdminCourse = {
				id: Number(courseId),
				code: "COURSE-0001",
				title: "測試課程",
				startAt: "2025-01-15",
				endAt: "2025-01-17",
				trainingHours: 18,
				fee: 5000,
				location: "KAOHSIUNG",
				status: "published",
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			const filePath = mockCourse.filePath || "";
			setFormData({
				code: mockCourse.code,
				title: mockCourse.title,
				startAt: mockCourse.startAt,
				endAt: mockCourse.endAt,
				trainingHours: mockCourse.trainingHours,
				fee: mockCourse.fee,
				location: mockCourse.location,
				status: mockCourse.status,
				filePath: filePath,
			});
			setOriginalFilePath(filePath);
			if (filePath) {
				setUploadedFileName(filePath.split("/").pop() || "");
			}
		} finally {
			setIsLoading(false);
		}
	};

	/**
	 * 獲取課程分類選項
	 */
	const fetchCategoryOptions = async () => {
		const res = await fecthcPubilcData<ExteriorListData>(
			"/training/exterior/categories"
		);

		// 變成符合 Select 的 options 格式
		const option: CategoryOptions[] = res.data.map((item) => ({
			label: item.name,
			value: item.code,
		}));

		setCategoryOptions(option);
	};

	/**
	 * 組件初始化：載入課程資料和分類選項
	 * 注意：sessionStorage 的生命週期由瀏覽器管理（tab 關閉時自動清除）
	 * React Strict Mode 會觸發兩次執行，但因快取機制不會重複呼叫 API
	 */
	useEffect(() => {
		fetchCategoryOptions();
		fetchCourse();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [courseId]);

	/**
	 * 表單驗證
	 */
	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!formData.code.trim()) {
			newErrors.code = "請輸入課程代碼";
		}

		if (!formData.title.trim()) {
			newErrors.title = "請輸入課程名稱";
		}

		if (!formData.location.trim()) {
			newErrors.location = "請選擇課程分類";
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

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	/**
	 * 處理檔案上傳
	 * 支援格式：PDF, Word (.doc, .docx)
	 * 大小限制：10MB
	 */
	const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// 驗證檔案類型 (允許 PDF 和 Word)
		const allowedTypes = [
			"application/pdf",
			"application/msword",
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		];
		if (!allowedTypes.includes(file.type)) {
			alert("只允許上傳 PDF 或 Word 檔案 (.pdf, .doc, .docx)");
			return;
		}

		// 驗證檔案大小 (10MB)
		if (file.size > 10 * 1024 * 1024) {
			alert("檔案大小不能超過 10MB");
			return;
		}

		try {
			setIsUploading(true);
			const uploadFormData = new FormData();
			uploadFormData.append("file", file);

			const response = await fetch("/api/upload", {
				method: "POST",
				body: uploadFormData,
			});

			const result = await response.json();

			if (result.success) {
				setFormData((prev) => ({ ...prev, filePath: result.filePath }));
				setUploadedFileName(file.name);
				alert("檔案上傳成功!");
			} else {
				alert(result.error || "檔案上傳失敗");
			}
		} catch (error) {
			console.error("檔案上傳錯誤:", error);
			alert("檔案上傳失敗,請稍後再試");
		} finally {
			setIsUploading(false);
		}
	};

	/**
	 * 移除已上傳的檔案
	 */
	const handleRemoveFile = () => {
		setFormData((prev) => ({ ...prev, filePath: "" }));
		setUploadedFileName("");
	};

	/**
	 * 提交表單更新課程
	 * 注意：id 欄位不需要提交（後端從 URL 路徑取得）
	 */
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		try {
			setIsSubmitting(true);

			// 準備提交資料 (移除 id,因為後端會從 URL 路徑取得)
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { id, ...dataToSubmit } = formData;

			// 呼叫 API 更新課程
			const response = await axios.put(
				`/admin/courses/${courseId}`,
				dataToSubmit
			);

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

	/**
	 * 更新表單欄位值
	 * 同時清除該欄位的錯誤訊息
	 */
	const updateField = (
		field: keyof AdminCourseEditFormData,
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
					{categoryOptions && (
						<Select
							label='課程分類'
							options={categoryOptions}
							value={formData.location}
							onChange={(e) => updateField("location", e.target.value)}
							error={errors.categoryId}
							required
						/>
					)}

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

					{/* 課程狀態 */}
					<Select
						label='課程狀態'
						options={statusOptions}
						value={formData.status}
						onChange={(e) => updateField("status", e.target.value)}
						helperText='草稿不會顯示在前台'
						required
					/>

					{/* 課程簡章管理 */}
					<div className='md:col-span-2'>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							課程簡章 (PDF / Word)
							{originalFilePath && formData.filePath === originalFilePath && (
								<span className='ml-2 text-xs text-gray-500'>
									(目前使用原檔案)
								</span>
							)}
							{originalFilePath && formData.filePath !== originalFilePath && (
								<span className='ml-2 text-xs text-green-600'>
									(已更換新檔案)
								</span>
							)}
						</label>

						{!formData.filePath ? (
							<div className='flex items-center justify-center w-full'>
								<label className='flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors'>
									<div className='flex flex-col items-center justify-center pt-5 pb-6'>
										<IoCloudUpload className='w-10 h-10 mb-3 text-gray-400' />
										<p className='mb-2 text-sm text-gray-500'>
											<span className='font-semibold'>點擊上傳檔案</span>
										</p>
										<p className='text-xs text-gray-500'>
											支援 PDF 或 Word 檔案 (最大 10MB)
										</p>
									</div>
									<input
										type='file'
										className='hidden'
										accept='application/pdf,.pdf,application/msword,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.docx'
										onChange={handleFileUpload}
										disabled={isUploading}
									/>
								</label>
							</div>
						) : (
							<div className='space-y-3'>
								<div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200'>
									<div className='flex items-center gap-3'>
										<IoDocument
											className={`w-6 h-6 ${
												formData.filePath?.endsWith(".pdf")
													? "text-red-500"
													: "text-blue-500"
											}`}
										/>
										<div>
											<p className='text-sm font-medium text-gray-900'>
												{uploadedFileName ||
													formData.filePath.split("/").pop() ||
													"已上傳檔案"}
											</p>
											<p className='text-xs text-gray-500'>
												{formData.filePath?.endsWith(".pdf")
													? "PDF 文件"
													: "Word 文件"}
											</p>
										</div>
									</div>
									<div className='flex items-center gap-2'>
										<a
											href={formData.filePath}
											target='_blank'
											rel='noopener noreferrer'
											className='p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
											title='預覽/下載'>
											<IoDownload className='w-5 h-5' />
										</a>
										<button
											type='button'
											onClick={handleRemoveFile}
											className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
											title='移除檔案'>
											<IoClose className='w-5 h-5' />
										</button>
									</div>
								</div>

								{/* 重新上傳按鈕 */}
								<label className='flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors'>
									<IoCloudUpload className='w-4 h-4' />
									<span>重新上傳檔案</span>
									<input
										type='file'
										className='hidden'
										accept='application/pdf,.pdf,application/msword,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.docx'
										onChange={handleFileUpload}
										disabled={isUploading}
									/>
								</label>
							</div>
						)}

						{isUploading && (
							<p className='mt-2 text-sm text-blue-600'>檔案上傳中...</p>
						)}
					</div>
				</div>
			</FormWrapper>
		</div>
	);
}
