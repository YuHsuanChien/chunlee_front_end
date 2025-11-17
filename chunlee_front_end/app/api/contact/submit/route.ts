import { NextResponse } from "next/server";
import { verifyCaptcha } from "../captcha/route";

interface ContactFormRequest {
	name: string;
	email: string;
	message: string;
	captcha: string;
	captchaId: string;
}

export async function POST(request: Request) {
	try {
		const body: ContactFormRequest = await request.json();
		const { name, email, message, captcha, captchaId } = body;

		// 1. 驗證必填欄位
		if (!name || !email || !message || !captcha || !captchaId) {
			return NextResponse.json(
				{
					success: false,
					message: "請填寫完整資訊",
				},
				{ status: 400 }
			);
		}

		// 2. 驗證 email 格式
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return NextResponse.json(
				{
					success: false,
					message: "Email 格式不正確",
				},
				{ status: 400 }
			);
		}

		// 3. 驗證驗證碼
		const isCaptchaValid = verifyCaptcha(captchaId, captcha);
		if (!isCaptchaValid) {
			return NextResponse.json(
				{
					success: false,
					message: "驗證碼錯誤或已過期",
				},
				{ status: 400 }
			);
		}

		// 4. 實際應用中，這裡應該將資料存入資料庫或發送郵件
		console.log("收到聯絡表單:", { name, email, message });

		// 5. 返回成功響應
		return NextResponse.json({
			success: true,
			message: "表單已成功提交",
			data: {
				id: `contact_${Date.now()}`,
				submittedAt: new Date().toISOString(),
			},
		});
	} catch (error) {
		console.error("處理聯絡表單失敗:", error);
		return NextResponse.json(
			{
				success: false,
				message: "表單提交失敗，請稍後再試",
			},
			{ status: 500 }
		);
	}
}
