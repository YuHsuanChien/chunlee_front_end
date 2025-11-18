export async function fecthcPubilcData<T>(filename: string): Promise<T> {
	const pubilcUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
	const res = await fetch(`${pubilcUrl}${filename}`, {
		cache: "force-cache", // 使用 Next.js 的靜態生成緩存
	});

	if (!res.ok) {
		throw new Error(`Failed to fetch ${filename}: ${res.statusText}`);
	}
	const data = await res.json();
	return data as T;
}
