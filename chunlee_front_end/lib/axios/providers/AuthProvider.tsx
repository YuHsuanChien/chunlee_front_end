"use client";

import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import axios, { setToken, clearToken } from "@/lib/axios/axios";
import { AxiosError } from "axios";

// 用戶資料類型
export interface User {
	id: string;
	account: string;
	name: string;
	role: string;
}

// 認證上下文類型
interface AuthContextType {
	user: User | null;
	login: (
		account: string,
		password: string,
		captcha: string,
		captchaID: string
	) => Promise<void>;
	logout: () => Promise<void>;
	isLoading: boolean;
	refreshUser: () => Promise<void>;
}

// 創建認證上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();
	const pathname = usePathname();

	// 檢查用戶認證狀態
	const checkAuth = async () => {
		try {
			// 如果在登入頁面且沒有 token,直接返回
			if (pathname === "/admin/login") {
				const token =
					typeof window !== "undefined"
						? localStorage.getItem("auth-token")
						: null;
				if (!token) {
					setIsLoading(false);
					return;
				}
			}

			// 使用 Axios，攔截器會自動添加 Authorization header
			const response = await axios.get("/auth/me");

			if (response.data.success && response.data.user) {
				setUser(response.data.user);
			} else {
				setUser(null);
			}
		} catch (error) {
			console.error("[AuthProvider] 檢查認證失敗:", error);
			setUser(null);
			clearToken();
		} finally {
			setIsLoading(false);
		}
	};

	// 頁面載入時檢查認證
	useEffect(() => {
		checkAuth();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// 登入功能
	const login = async (
		account: string,
		password: string,
		captcha: string,
		captchaId: string
	) => {
		try {
			// 使用 Axios
			const response = await axios.post("/auth/login", {
				account,
				password,
				captcha,
				captchaId,
			});

			const data = response.data;

			if (!data.success || !data.user || !data.token) {
				throw new Error(data.message || "登入失敗");
			}

			// 保存 token 到 localStorage（Axios 攔截器會自動使用）
			setToken(data.token);
			setUser(data.user);

			// 登入成功後跳轉
			const searchParams = new URLSearchParams(window.location.search);
			const from = searchParams.get("from");
			const redirectPath =
				from && from !== "/admin/login" && from !== "login" ? from : "/admin";
			router.push(redirectPath);
		} catch (error) {
			// 加入詳細的錯誤處理
			console.error("[AuthProvider] 登入失敗:", error);
			if (error instanceof AxiosError && error.response) {
				console.error("[AuthProvider] 錯誤回應:", error.response.data);
				console.error("[AuthProvider] 錯誤狀態:", error.response.status);
			} else {
				console.error("[AuthProvider] 未知錯誤:", error);
			}
			throw error; // 重新拋出錯誤讓上層處理
		}
	};

	// 登出功能
	const logout = async () => {
		try {
			// 使用 Axios，攔截器會自動添加 Authorization header
			await axios.post("/auth/logout");

			// 清除 token 和用戶狀態
			clearToken();
			setUser(null);
			console.log("[AuthProvider] 登出成功，token 已清除");

			router.push("/admin/login");
		} catch (error) {
			console.error("[AuthProvider] 登出失敗:", error);
			// 即使 API 失敗，也清除本地狀態
			clearToken();
			setUser(null);
			router.push("/admin/login");
		}
	};

	// 刷新用戶資料
	const refreshUser = async () => {
		await checkAuth();
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				logout,
				isLoading,
				refreshUser,
			}}>
			{children}
		</AuthContext.Provider>
	);
}

// 自定義 Hook 來使用認證上下文
export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within AuthProvider");
	}
	return context;
}
