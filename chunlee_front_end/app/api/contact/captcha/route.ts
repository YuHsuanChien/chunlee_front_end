import { NextResponse } from "next/server";

// 使用 global 來保存 Map,避免在開發模式下 hot reload 時被重置
declare global {
	var contactCaptchaStore:
		| Map<string, { text: string; expiresAt: number }>
		| undefined;
}

// 暫存驗證碼資料（實際應用中應該使用 Redis 或資料庫）
const captchaStore =
	global.contactCaptchaStore ||
	(global.contactCaptchaStore = new Map<
		string,
		{ text: string; expiresAt: number }
	>());

// 定期清理過期的驗證碼（只設置一次）
if (!global.contactCaptchaStore) {
	setInterval(() => {
		const now = Date.now();
		for (const [id, data] of captchaStore.entries()) {
			if (now > data.expiresAt) {
				captchaStore.delete(id);
			}
		}
	}, 60000); // 每分鐘清理一次
}

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

	const base64 = Buffer.from(svg).toString("base64");
	return `data:image/svg+xml;base64,${base64}`;
}

export async function GET() {
	try {
		// 1. 生成隨機驗證碼文字
		const captchaText = generateCaptchaText();
		const captchaImage = generateCaptchaImage(captchaText);

		// 2. 生成唯一的驗證碼 ID
		const captchaId = `captcha_${Date.now()}_${Math.random()
			.toString(36)
			.substring(2, 9)}`;

		// 3. 將驗證碼暫存,設定 5 分鐘後過期
		const expiresAt = Date.now() + 5 * 60 * 1000; // 5 分鐘
		captchaStore.set(captchaId, {
			text: captchaText,
			expiresAt: expiresAt,
		});

		// 返回新格式: { id, img } (不包含 text)
		return NextResponse.json({
			id: captchaId,
			img: captchaImage,
		});
	} catch (error) {
		console.error("生成驗證碼失敗:", error);
		return NextResponse.json(
			{ success: false, message: "生成驗證碼失敗" },
			{ status: 500 }
		);
	}
}

// 驗證驗證碼（供聯絡表單 API 使用）
export function verifyCaptcha(
	captchaId: string,
	captchaInput: string
): boolean {
	try {
		// 從暫存中取得驗證碼資料
		const captchaData = captchaStore.get(captchaId);

		// 檢查驗證碼是否存在
		if (!captchaData) {
			console.error("驗證碼不存在或已過期");
			return false;
		}

		// 檢查是否過期
		if (Date.now() > captchaData.expiresAt) {
			captchaStore.delete(captchaId);
			console.error("驗證碼已過期");
			return false;
		}

		// 不區分大小寫比對
		const isValid =
			captchaData.text.toLowerCase() === captchaInput.toLowerCase();

		// 驗證成功後刪除該驗證碼（一次性使用）
		if (isValid) {
			captchaStore.delete(captchaId);
		}

		return isValid;
	} catch (error) {
		console.error("驗證碼驗證失敗:", error);
		return false;
	}
}
