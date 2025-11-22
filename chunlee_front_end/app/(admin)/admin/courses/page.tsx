"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios/axios";
import {
	DataTable,
	Pagination,
	Button,
	Modal,
	Loading,
	Input,
} from "@/components/admin";
import type { Column } from "@/components/admin";
import type { AdminCourse, ExteriorListData } from "@/lib/interfaces";
import { IoAdd, IoSearch, IoCreate, IoTrash, IoFilter } from "react-icons/io5";
import { fecthcPubilcData } from "@/lib/hooks";

interface SelectOption {
	value: string | number;
	label: string;
}

export default function CoursesPage() {
	const router = useRouter();
	const [courses, setCourses] = useState<AdminCourse[]>([]);
	const [filteredCourses, setFilteredCourses] = useState<AdminCourse[]>([]);
	const [categoryOptions, setCategoryOptions] = useState<SelectOption[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchKeyword, setSearchKeyword] = useState("");
	const [statusFilter, setStatusFilter] = useState<string>("all");
	const [dateSort, setDateSort] = useState<"asc" | "desc">("asc"); // 日期排序狀態：預設由近到遠
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [courseToDelete, setCourseToDelete] = useState<AdminCourse | null>(
		null
	);
	const [isDeleting, setIsDeleting] = useState(false);

	const itemsPerPage = 10;

	// 載入課程資料
	useEffect(() => {
		fetchCourses();
		fetchCategoryOptions();
	}, []);

	// 過濾和搜尋
	useEffect(() => {
		let filtered = [...courses];

		// 狀態過濾
		if (statusFilter !== "all") {
			filtered = filtered.filter((course) => course.status === statusFilter);
		}

		// 關鍵字搜尋
		if (searchKeyword.trim()) {
			const keyword = searchKeyword.toLowerCase();
			filtered = filtered.filter(
				(course) =>
					course.title.toLowerCase().includes(keyword) ||
					course.code.toLowerCase().includes(keyword) ||
					course.location.toLowerCase().includes(keyword)
			);
		}

		// 日期排序（預設由近到遠）
		filtered.sort((a, b) => {
			const dateA = new Date(a.startAt).getTime();
			const dateB = new Date(b.startAt).getTime();
			return dateSort === "asc" ? dateA - dateB : dateB - dateA;
		});

		setFilteredCourses(filtered);
		setCurrentPage(1); // 重置到第一頁
	}, [searchKeyword, statusFilter, dateSort, courses]);

	const fetchCourses = async () => {
		try {
			setIsLoading(true);
			// 這裡改成您的實際 API 端點
			const response = await axios.get("/training/exterior/courses");

			if (response.data.success) {
				setCourses(response.data.data);
				setFilteredCourses(response.data.data);
			}
		} catch (error) {
			console.error("載入課程失敗:", error);
			// 使用模擬資料以便開發
			const mockData = generateMockCourses();
			setCourses(mockData);
			setFilteredCourses(mockData);
		} finally {
			setIsLoading(false);
		}
	};

	// 刪除課程
	const handleDelete = async () => {
		if (!courseToDelete) return;

		try {
			setIsDeleting(true);
			await axios.delete(`/training/exterior/courses/${courseToDelete.id}`);

			// 更新列表
			setCourses((prev) =>
				prev.filter((course) => course.id !== courseToDelete.id)
			);

			setDeleteModalOpen(false);
			setCourseToDelete(null);
		} catch (error) {
			console.error("刪除課程失敗:", error);
			alert("刪除失敗,請稍後再試");
		} finally {
			setIsDeleting(false);
		}
	};

	/**
	 * 處理日期排序切換
	 * asc (由近到遠) ⇄ desc (由遠到近)
	 */
	const handleDateSort = () => {
		setDateSort((prev) => (prev === "asc" ? "desc" : "asc"));
	};

	// 狀態徽章樣式
	const getStatusBadge = (status: AdminCourse["status"]) => {
		const styles = {
			draft: "bg-gray-100 text-gray-700",
			published: "bg-green-100 text-green-700",
			archived: "bg-red-100 text-red-700",
		};

		const labels = {
			draft: "草稿",
			published: "已發布",
			archived: "已封存",
		};

		return (
			<span
				className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
				{labels[status]}
			</span>
		);
	};

	// 取得分類名稱
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

		setCategoryOptions(option);
	};

	// 表格欄位定義
	const columns: Column<AdminCourse>[] = [
		{
			key: "code",
			label: "課程代碼",
			className: "font-medium",
		},
		{
			key: "title",
			label: "課程名稱",
			className: "min-w-[200px]",
		},
		{
			key: "location",
			label: "分類",
			render: (course) => {
				const category = categoryOptions.find(
					(option) => option.value === course.location
				);
				return category ? category.label : course.location;
			},
		},
		{
			key: "startAt",
			label: (
				<div className='flex items-center gap-2'>
					<span>開課日期</span>
					<button
						onClick={handleDateSort}
						className='p-1 hover:bg-gray-100 rounded transition-colors'
						title={dateSort === "asc" ? "目前：由近到遠" : "目前：由遠到近"}>
						{dateSort === "asc" ? (
							<svg
								className='w-4 h-4 text-blue-600'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M5 15l7-7 7 7'
								/>
							</svg>
						) : (
							<svg
								className='w-4 h-4 text-blue-600'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M19 9l-7 7-7-7'
								/>
							</svg>
						)}
					</button>
				</div>
			),
			render: (course) => new Date(course.startAt).toLocaleDateString("zh-TW"),
		},
		{
			key: "trainingHours",
			label: "時數",
			render: (course) => `${course.trainingHours}小時`,
		},
		{
			key: "fee",
			label: "費用",
			render: (course) => `NT$ ${course.fee.toLocaleString()}`,
		},
		{
			key: "status",
			label: "狀態",
			render: (course) => getStatusBadge(course.status),
		},
		{
			key: "actions",
			label: "操作",
			render: (course) => (
				<div className='flex items-center gap-2'>
					<button
						onClick={() => {
							/**
							 * 將課程資料暫存到 sessionStorage
							 * 避免編輯頁面重複呼叫 API
							 * 快取有效期：5 分鐘（在編輯頁面檢查）
							 */
							const cacheKey = `course_edit_${course.id}`;
							const cacheData = {
								data: course,
								timestamp: Date.now(),
							};
							sessionStorage.setItem(cacheKey, JSON.stringify(cacheData));
							router.push(`/admin/courses/${course.id}/edit`);
						}}
						className='p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors'
						title='編輯'>
						<IoCreate className='w-5 h-5' />
					</button>
					<button
						onClick={() => {
							setCourseToDelete(course);
							setDeleteModalOpen(true);
						}}
						className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
						title='刪除'>
						<IoTrash className='w-5 h-5' />
					</button>
				</div>
			),
		},
	];

	// 分頁資料
	const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const currentCourses = filteredCourses.slice(
		startIndex,
		startIndex + itemsPerPage
	);

	return (
		<div className='space-y-6'>
			{/* 頁面標題 */}
			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
				<div>
					<h1 className='text-2xl sm:text-3xl font-bold text-gray-900'>
						課程管理
					</h1>
					<p className='mt-1 text-sm text-gray-600'>
						管理所有公開課程的資訊和狀態
					</p>
				</div>
				<Button
					variant='primary'
					icon={<IoAdd />}
					onClick={() => router.push("/admin/courses/create")}>
					新增課程
				</Button>
			</div>

			{/* 搜尋和篩選區 */}
			<div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6'>
				<div className='flex flex-col lg:flex-row gap-4'>
					{/* 搜尋框 */}
					<div className='flex-1'>
						<Input
							placeholder='搜尋課程名稱、代碼、分類...'
							value={searchKeyword}
							onChange={(e) => setSearchKeyword(e.target.value)}
							leftIcon={<IoSearch className='w-5 h-5' />}
						/>
					</div>

					{/* 狀態篩選 */}
					<div className='flex items-center gap-2'>
						<IoFilter className='w-5 h-5 text-gray-400' />
						<select
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value)}
							className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white'>
							<option value='all'>全部狀態</option>
							<option value='draft'>草稿</option>
							<option value='published'>已發布</option>
							<option value='archived'>已封存</option>
						</select>
					</div>
				</div>

				{/* 統計資訊 */}
				<div className='mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-4 text-sm text-gray-600'>
					<span>
						總共 <strong className='text-gray-900'>{courses.length}</strong>{" "}
						門課程
					</span>
					<span className='hidden sm:inline'>|</span>
					<span>
						顯示{" "}
						<strong className='text-gray-900'>{filteredCourses.length}</strong>{" "}
						筆結果
					</span>
				</div>
			</div>

			{/* 課程列表 */}
			{isLoading ? (
				<Loading size='lg' text='載入課程資料中...' />
			) : (
				<>
					<DataTable
						columns={columns}
						data={currentCourses}
						keyExtractor={(course) => course.id}
						emptyMessage='目前沒有課程資料'
					/>

					{/* 分頁 */}
					{totalPages > 1 && (
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={setCurrentPage}
						/>
					)}
				</>
			)}

			{/* 刪除確認 Modal */}
			<Modal
				isOpen={deleteModalOpen}
				onClose={() => {
					setDeleteModalOpen(false);
					setCourseToDelete(null);
				}}
				title='確認刪除'
				size='sm'>
				<div className='space-y-4'>
					<p className='text-gray-600'>
						確定要刪除課程「
						<strong className='text-gray-900'>{courseToDelete?.title}</strong>
						」嗎?
					</p>
					<p className='text-sm text-red-600'>此操作無法復原!</p>

					<div className='flex gap-3 justify-end'>
						<Button
							variant='outline'
							onClick={() => {
								setDeleteModalOpen(false);
								setCourseToDelete(null);
							}}
							disabled={isDeleting}>
							取消
						</Button>
						<Button
							variant='danger'
							onClick={handleDelete}
							isLoading={isDeleting}>
							確認刪除
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
}

// 生成模擬資料 (開發用)
function generateMockCourses(): AdminCourse[] {
	const categories = [
		"台中班(零售業)",
		"台中班(工)",
		"台中班(服務業)",
		"桃園班",
	];
	const statuses: AdminCourse["status"][] = ["draft", "published", "archived"];

	return Array.from({ length: 25 }, (_, i) => ({
		id: i + 1,
		code: `COURSE-${String(i + 1).padStart(4, "0")}`,
		title: `課程名稱範例 ${i + 1}`,
		category: categories[i % categories.length],
		categoryId: (i % categories.length) + 1,
		startAt: new Date(2025, 0, (i % 28) + 1).toISOString(),
		endAt: new Date(2025, 0, (i % 28) + 3).toISOString(),
		trainingHours: [6, 12, 18, 24, 30][i % 5],
		fee: [3000, 5000, 8000, 10000, 15000][i % 5],
		location: "台中市",
		status: statuses[i % statuses.length],
		createdAt: new Date(2025, 0, 1).toISOString(),
		updatedAt: new Date().toISOString(),
	}));
}
