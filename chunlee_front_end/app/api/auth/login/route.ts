import { NextResponse } from "next/server";
import { verifyCaptcha } from "../captcha/route";
import { cookies } from "next/headers";

// Mock 用戶資料（實際應從資料庫查詢）
const MOCK_USERS = [
	{
		id: "1",
		account: "admin",
		password: "admin123", // 實際應使用 bcrypt 等加密
		name: "系統管理員",
		role: "admin",
	},
	{
		id: "2",
		account: "test",
		password: "test123",
		name: "測試用戶",
		role: "user",
	},
];

// 生成用戶 token（實際應使用 JWT）
function generateToken(userId: string): string {
	return `token_${userId}_${Date.now()}_${Math.random()
		.toString(36)
		.substring(2)}`;
}

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { account, password, captcha, captchaID } = body;

		// 1. 驗證必填欄位
		if (!account || !password || !captcha || !captchaID) {
			return NextResponse.json(
				{ success: false, message: "請填寫完整資訊" },
				{ status: 400 }
			);
		}

		// 2. 驗證驗證碼（使用 captchaId 從 store 中查找）
		const isCaptchaValid = verifyCaptcha(captchaID, captcha);
		if (!isCaptchaValid) {
			return NextResponse.json(
				{ success: false, message: "驗證碼錯誤或已過期" },
				{ status: 400 }
			);
		}

		// 3. 驗證帳號密碼
		const user = MOCK_USERS.find(
			(u) => u.account === account && u.password === password
		);

		if (!user) {
			return NextResponse.json(
				{ success: false, message: "帳號或密碼錯誤" },
				{ status: 401 }
			);
		}

		// 4. 生成用戶 token
		const token = generateToken(user.id);

		// 5. 設定 cookie
		const cookieStore = await cookies();
		cookieStore.set("auth-token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 60 * 60 * 24 * 7, // 7 天
			path: "/",
		});

		// 6. 返回用戶資訊和 token（不包含敏感資料）
		// 前端會將 token 儲存到 localStorage,並在 Axios 攔截器中自動添加到 header
		return NextResponse.json({
			success: true,
			message: "登入成功",
			token, // 返回 token 給前端，用於 API header
			user: {
				id: user.id,
				account: user.account,
				name: user.name,
				role: user.role,
			},
		});
	} catch (error) {
		console.error("登入錯誤:", error);
		return NextResponse.json(
			{ success: false, message: "登入失敗，請稍後再試" },
			{ status: 500 }
		);
	}
}
