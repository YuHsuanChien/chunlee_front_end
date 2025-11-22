export async function fecthcPubilcData<T>(filename: string): Promise<T> {
	const pubilcUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
	const res = await fetch(`${pubilcUrl}${filename}`, {
		next: { revalidate: 60 }, // 每 60 秒重新驗證一次資料
	});

	if (!res.ok) {
		throw new Error(`Failed to fetch ${filename}: ${res.statusText}`);
	}
	const data = await res.json();
	return data as T;
}
