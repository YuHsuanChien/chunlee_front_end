/**
 * 從 public/json 目錄獲取 JSON 數據的 Hook
 * @param filename - JSON 文件名稱（例如: 'interior.json'）
 * @returns Promise<T> - 返回解析後的 JSON 數據
 */
export async function fetchJsonData<T>(filename: string): Promise<T> {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
	const res = await fetch(`${baseUrl}/json/${filename}`, {
		cache: "force-cache", // 使用 Next.js 的靜態生成緩存
	});

	if (!res.ok) {
		throw new Error(`Failed to fetch ${filename}: ${res.statusText}`);
	}

	const data = await res.json();
	return data as T;
}
