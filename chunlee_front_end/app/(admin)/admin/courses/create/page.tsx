"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios/axios";
import { FormWrapper, Input, Select, Button } from "@/components/admin";
import type { AdminCourseFormData } from "@/lib/interfaces";
import {
	IoArrowBack,
	IoSave,
	IoAddCircle,
	IoTrash,
	IoCloudUpload,
	IoDocument,
	IoDownload,
	IoClose,
} from "react-icons/io5";
import { fecthcPubilcData } from "@/lib/hooks";
import { ExteriorListData } from "@/lib/interfaces";
import { v4 as uuidv4 } from "uuid";

interface SelectOption {
	value: string | number;
	label: string;
}

export default function CreateCoursePage() {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [categoryOptions, setCategoryOptions] = useState<SelectOption[]>([]);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isUploading, setIsUploading] = useState(false);
	const [uploadedFileName, setUploadedFileName] = useState<string>("");

	const [formData, setFormData] = useState<AdminCourseFormData>({
		code: "",
		title: "",
		location: "",
		dates: [{ id: uuidv4(), startAt: "", endAt: "" }],
		trainingHours: 0,
		fee: 0,
		status: "draft",
		filePath: "",
	});

	// 新增日期組
	const addDatePair = () => {
		setFormData((prev) => ({
			...prev,
			dates: [...prev.dates, { id: uuidv4(), startAt: "", endAt: "" }],
		}));
	};

	// 刪除日期組
	const removeDatePair = (id: string) => {
		if (formData.dates.length === 1) {
			alert("至少需要保留一組日期");
			return;
		}
		setFormData((prev) => ({
			...prev,
			dates: prev.dates.filter((date) => date.id !== id),
		}));
		// 清除該日期組的錯誤訊息
		setErrors((prev) => {
			const newErrors = { ...prev };
			delete newErrors[`startAt_${id}`];
			delete newErrors[`endAt_${id}`];
			return newErrors;
		});
	};

	// 更新日期組
	const updateDatePair = (
		id: string,
		field: "startAt" | "endAt",
		value: string
	) => {
		setFormData((prev) => ({
			...prev,
			dates: prev.dates.map((date) =>
				date.id === id ? { ...date, [field]: value } : date
			),
		}));
		// 清除該欄位的錯誤訊息
		const errorKey = `${field}_${id}`;
		if (errors[errorKey]) {
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[errorKey];
				return newErrors;
			});
		}
	};

	// 表單驗證
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

		// 驗證每組日期
		formData.dates.forEach((date) => {
			if (!date.startAt) {
				newErrors[`startAt_${date.id}`] = "請選擇開課日期";
			}

			if (!date.endAt) {
				newErrors[`endAt_${date.id}`] = "請選擇結束日期";
			}

			if (date.startAt && date.endAt && date.startAt > date.endAt) {
				newErrors[`endAt_${date.id}`] = "結束日期不能早於開課日期";
			}
		});

		if (formData.trainingHours <= 0) {
			newErrors.trainingHours = "請輸入有效的訓練時數";
		}

		if (formData.fee < 0) {
			newErrors.fee = "費用不能為負數";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// 處理檔案上傳
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

	// 移除已上傳的檔案
	const handleRemoveFile = () => {
		setFormData((prev) => ({ ...prev, filePath: "" }));
		setUploadedFileName("");
	};

	// 提交表單
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		try {
			setIsSubmitting(true);

			// 將表單資料轉換成多個課程物件 (依據 dates 陣列)
			const coursesToCreate = formData.dates.map((date) => ({
				code: formData.code,
				title: formData.title,
				location: formData.location,
				startAt: date.startAt,
				endAt: date.endAt,
				trainingHours: formData.trainingHours,
				fee: formData.fee,
				status: formData.status,
				filePath: formData.filePath, // 加入檔案路徑
			}));

			// 批次新增課程
			const response = await axios.post(
				"/training/exterior/courses",
				coursesToCreate
			);

			if (response.data.success) {
				alert(`成功新增 ${coursesToCreate.length} 個課程!`);
				router.push("/admin/courses");
			}
		} catch (error) {
			console.error("新增課程失敗:", error);
			alert("新增失敗,請稍後再試");
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

	const statusOptions = [
		{ value: "draft", label: "草稿" },
		{ value: "published", label: "已發布" },
		{ value: "archived", label: "已封存" },
	];

	useEffect(() => {
		// 分類選項 (從 API 獲取)
		const fetchCategoryOptions = async () => {
			const res = await fecthcPubilcData<ExteriorListData>(
				"/training/exterior/categories"
			);

			// 變成符合 Select 的 options 格式
			const option = res.data.map((item) => ({
				label: item.name,
				value: item.code,
			}));

			console.log(option);
			setCategoryOptions(option);
		};

		fetchCategoryOptions();
	}, []);

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
					新增課程
				</h1>
				<p className='mt-1 text-sm text-gray-600'>填寫課程的詳細資訊</p>
			</div>

			{/* 表單 */}
			<FormWrapper
				title='課程資訊'
				description='請填寫完整的課程資料'
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
							儲存課程
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

					{/* 動態日期區塊 */}
					<div className='md:col-span-2 space-y-4'>
						<div className='flex items-center justify-between mb-2'>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
								開課日期 <span className='text-red-500'>*</span>
							</label>
							<button
								type='button'
								onClick={addDatePair}
								className='flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors'>
								<IoAddCircle className='w-4 h-4' />
								新增日期
							</button>
						</div>

						{formData.dates.map((date, index) => (
							<div
								key={date.id}
								className='flex flex-col md:flex-row gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700'>
								<div className='flex-1'>
									<Input
										label={`第 ${index + 1} 組 - 開課日期`}
										type='date'
										value={date.startAt}
										onChange={(e) =>
											updateDatePair(date.id, "startAt", e.target.value)
										}
										error={errors[`startAt_${date.id}`]}
										required
									/>
								</div>
								<div className='flex-1'>
									<Input
										label={`第 ${index + 1} 組 - 結束日期`}
										type='date'
										value={date.endAt}
										onChange={(e) =>
											updateDatePair(date.id, "endAt", e.target.value)
										}
										error={errors[`endAt_${date.id}`]}
										required
									/>
								</div>
								{formData.dates.length > 1 && (
									<div className='flex items-end'>
										<button
											type='button'
											onClick={() => removeDatePair(date.id)}
											className='px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors'
											title='刪除此組日期'>
											<IoTrash className='w-5 h-5' />
										</button>
									</div>
								)}
							</div>
						))}
					</div>

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

					{/* 課程簡章上傳 */}
					<div className='md:col-span-2'>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							課程簡章 (PDF / Word)
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
											{uploadedFileName || "已上傳檔案"}
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
