/**
 * Axios 實例配置
 * 自動為所有請求添加 Authorization header
 */

import axios from "axios";

// Token 存儲 key
const TOKEN_KEY = "auth-token";

// Token 管理函數
export function setToken(token: string) {
	if (typeof window !== "undefined") {
		localStorage.setItem(TOKEN_KEY, token);
	}
}

export function getToken(): string | null {
	if (typeof window !== "undefined") {
		return localStorage.getItem(TOKEN_KEY);
	}
	return null;
}

export function clearToken() {
	if (typeof window !== "undefined") {
		localStorage.removeItem(TOKEN_KEY);
	}
}

// 創建 Axios 實例
const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
	timeout: 10000, // 10 秒超時
	withCredentials: true, // 允許跨域攜帶憑證
	headers: {
		"Content-Type": "application/json",
	},
});

// 不需要 token 的 API 路徑
const NO_AUTH_PATHS = ["/api/auth/login", "/api/auth/captcha"];

// 檢查是否需要跳過 token 驗證
function shouldSkipAuth(url?: string): boolean {
	if (!url) return false;
	return NO_AUTH_PATHS.some((path) => url.includes(path));
}

// 請求攔截器 - 自動添加 Authorization header
axiosInstance.interceptors.request.use(
	(config) => {
		// 檢查是否為不需要 token 的 API
		if (shouldSkipAuth(config.url)) {
			console.log(`[Axios] 跳過 token 驗證: ${config.url}`);
			return config;
		}

		// 從 localStorage 獲取 token
		const token = getToken();

		// 如果有 token,添加到 Authorization header
		if (token) {
			console.log("config.headers", config.headers);
			config.headers.Authorization = `Bearer ${token}`;
			console.log(`[Axios] 添加 Authorization header: ${config.url}`);
		}

		return config;
	},
	(error) => {
		console.error("[Axios] 請求錯誤:", error);
		return Promise.reject(error);
	}
);

// 響應攔截器 - 處理錯誤和 token 過期
axiosInstance.interceptors.response.use(
	(response) => {
		// 請求成功，直接返回數據
		console.log(`[Axios] 請求成功: ${response.config.url}`);
		return response;
	},
	(error) => {
		console.error("[Axios] 響應錯誤:", error);

		// 處理 401 未授權錯誤
		if (error.response && error.response.status === 401) {
			console.error("[Axios] 401 未授權，清除 token 並跳轉登入頁");
			clearToken();

			// 跳轉到登入頁（保存當前路徑）
			if (
				typeof window !== "undefined" &&
				!window.location.pathname.includes("/login")
			) {
				window.location.href = `/admin/login?from=${window.location.pathname}`;
			}
		}

		return Promise.reject(error);
	}
);

// 導出 Axios 實例
export default axiosInstance;
