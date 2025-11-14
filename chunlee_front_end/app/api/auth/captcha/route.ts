import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// JWT 密鑰（實際應用中應該從環境變數讀取）
const JWT_SECRET =
	process.env.JWT_SECRET || "your-secret-captcha-key-change-in-production";

// 生成隨機驗證碼文字（4位數字+字母）
function generateCaptchaText(): string {
	const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // 排除容易混淆的字符
	let result = "";
	for (let i = 0; i < 4; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
}

// 生成驗證碼圖片（使用 SVG 格式）
function generateCaptchaImage(text: string): string {
	// 創建簡單的 SVG 驗證碼圖片
	// 實際應用中可使用 node-canvas 套件生成更複雜的圖片
	const svg = `
    <svg width="120" height="40" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="40" fill="#f3f4f6"/>
      <text x="10" y="28" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#1f2937">
        ${text}
      </text>
      <line x1="0" y1="15" x2="120" y2="15" stroke="#9ca3af" stroke-width="1"/>
      <line x1="0" y1="25" x2="120" y2="25" stroke="#9ca3af" stroke-width="1"/>
      <circle cx="20" cy="10" r="2" fill="#6b7280"/>
      <circle cx="60" cy="30" r="2" fill="#6b7280"/>
      <circle cx="100" cy="20" r="2" fill="#6b7280"/>
    </svg>
  `;

	// 將 SVG 轉換為 base64
	const base64 = Buffer.from(svg).toString("base64");
	return `data:image/svg+xml;base64,${base64}`;
}

export async function GET() {
	try {
		// 1. 生成隨機驗證碼文字
		const captchaText = generateCaptchaText();
		const captchaImage = generateCaptchaImage(captchaText);

		// 2. 使用 JWT 加密驗證碼答案和建立時間
		const captchaToken = jwt.sign(
			{
				captchaText: captchaText,
				createdAt: Date.now(),
			},
			JWT_SECRET,
			{ expiresIn: "5m" } // 5 分鐘後自動過期
		);

		return NextResponse.json({
			success: true,
			captchaToken,
			captchaImage,
		});
	} catch (error) {
		console.error("生成驗證碼失敗:", error);
		return NextResponse.json(
			{ success: false, message: "生成驗證碼失敗" },
			{ status: 500 }
		);
	}
}

// 驗證驗證碼（供登入 API 使用）
export function verifyCaptcha(
	captchaToken: string,
	captchaInput: string
): boolean {
	try {
		// 驗證並解碼 JWT token
		const decoded = jwt.verify(captchaToken, JWT_SECRET) as {
			captchaText: string;
			createdAt: number;
		};

		// 不區分大小寫比對
		const isValid =
			decoded.captchaText.toLowerCase() === captchaInput.toLowerCase();

		return isValid;
	} catch (error) {
		// Token 無效或已過期
		console.error("驗證碼驗證失敗:", error);
		return false;
	}
}
