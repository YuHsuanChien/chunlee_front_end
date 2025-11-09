import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		qualities: [70, 75, 90, 100], // 添加你需要的質量值
	},
	// Next.js 會自動載入環境變數,不需要在 config 中設定
	// 環境變數可以直接在程式碼中使用 process.env.NEXT_PUBLIC_BASE_URL

	// 如果需要在伺服器端使用非 NEXT_PUBLIC_ 開頭的變數,可以這樣設定:
	env: {
		// 這些變數會在建置時被嵌入
		BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
		API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
	},
};

export default nextConfig;
