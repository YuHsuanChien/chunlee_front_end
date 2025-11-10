# 聯絡表單 - 圖片驗證碼實作範例

## 前端實作流程

### 1. 組件狀態定義

```typescript
import { useState, useEffect } from "react";

interface CaptchaData {
	captchaImage: string;
	captchaToken: string;
}

interface FormData {
	name: string;
	email: string;
	message: string;
	captchaCode: string;
}

interface FormErrors {
	name?: string;
	email?: string;
	message?: string;
	captchaCode?: string;
	captchaToken?: string;
}

export const ContactForm = () => {
	const [captcha, setCaptcha] = useState<CaptchaData | null>(null);
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		message: "",
		captchaCode: "",
	});
	const [errors, setErrors] = useState<FormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isLoadingCaptcha, setIsLoadingCaptcha] = useState(false);

	// 組件載入時獲取驗證碼
	useEffect(() => {
		fetchCaptcha();
	}, []);

	// ... 其他程式碼
};
```

### 2. 獲取驗證碼函數

```typescript
const fetchCaptcha = async () => {
	setIsLoadingCaptcha(true);
	try {
		const response = await fetch("/api/contact/captcha", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const result = await response.json();

		if (result.success) {
			setCaptcha({
				captchaImage: result.data.captchaImage,
				captchaToken: result.data.captchaToken,
			});
			// 清空驗證碼輸入
			setFormData((prev) => ({ ...prev, captchaCode: "" }));
			// 清除驗證碼相關錯誤
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors.captchaCode;
				delete newErrors.captchaToken;
				return newErrors;
			});
		} else {
			console.error("獲取驗證碼失敗:", result.message);
			alert("獲取驗證碼失敗，請重試");
		}
	} catch (error) {
		console.error("獲取驗證碼錯誤:", error);
		alert("網路錯誤，請檢查連線");
	} finally {
		setIsLoadingCaptcha(false);
	}
};
```

### 3. 表單驗證函數

```typescript
const validateForm = (): FormErrors => {
	const newErrors: FormErrors = {};

	// 姓名驗證
	if (!formData.name.trim()) {
		newErrors.name = "這是必填欄位";
	} else if (formData.name.trim().length < 2) {
		newErrors.name = "姓名至少需要2個字元";
	}

	// Email驗證
	if (!formData.email.trim()) {
		newErrors.email = "這是必填欄位";
	} else {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			newErrors.email = "請輸入有效的Email格式";
		}
	}

	// 訊息驗證
	if (!formData.message.trim()) {
		newErrors.message = "這是必填欄位";
	} else if (formData.message.trim().length < 10) {
		newErrors.message = "訊息內容至少需要10個字元";
	}

	// 驗證碼驗證
	if (!formData.captchaCode.trim()) {
		newErrors.captchaCode = "請輸入驗證碼";
	} else if (!/^\d{4}$/.test(formData.captchaCode)) {
		newErrors.captchaCode = "驗證碼必須是4位數字";
	}

	return newErrors;
};
```

### 4. 表單提交函數

```typescript
const handleSubmit = async (e: React.FormEvent) => {
	e.preventDefault();

	// 前端驗證
	const validationErrors = validateForm();
	if (Object.keys(validationErrors).length > 0) {
		setErrors(validationErrors);
		return;
	}

	// 檢查是否有驗證碼 token
	if (!captcha?.captchaToken) {
		alert("驗證碼已過期，請重新整理");
		fetchCaptcha();
		return;
	}

	setIsSubmitting(true);
	setErrors({});

	try {
		const response = await fetch("/api/contact/submit", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: formData.name.trim(),
				email: formData.email.trim(),
				message: formData.message.trim(),
				captchaCode: formData.captchaCode,
				captchaToken: captcha.captchaToken,
			}),
		});

		const result = await response.json();

		if (result.success) {
			// 提交成功
			alert("表單已成功提交！我們會盡快與您聯繫。");

			// 重置表單
			setFormData({
				name: "",
				email: "",
				message: "",
				captchaCode: "",
			});

			// 獲取新的驗證碼
			fetchCaptcha();
		} else {
			// 提交失敗，顯示後端返回的錯誤
			if (result.errors) {
				setErrors(result.errors);

				// 如果是驗證碼錯誤，重新獲取驗證碼
				if (result.errors.captchaCode || result.errors.captchaToken) {
					fetchCaptcha();
				}
			} else {
				alert(result.message || "表單提交失敗，請稍後再試");
			}
		}
	} catch (error) {
		console.error("提交表單錯誤:", error);
		alert("網路錯誤，請檢查連線");
	} finally {
		setIsSubmitting(false);
	}
};
```

### 5. JSX 渲染

```tsx
return (
	<form onSubmit={handleSubmit} className='max-w-2xl mx-auto p-6'>
		{/* 姓名欄位 */}
		<div className='mb-4'>
			<label htmlFor='name' className='block mb-2 font-semibold'>
				姓名 <span className='text-red-500'>*</span>
			</label>
			<input
				type='text'
				id='name'
				value={formData.name}
				onChange={(e) => setFormData({ ...formData, name: e.target.value })}
				className={`w-full px-4 py-2 border rounded-lg ${
					errors.name ? "border-red-500" : "border-gray-300"
				}`}
				disabled={isSubmitting}
			/>
			{errors.name && (
				<p className='text-red-500 text-sm mt-1'>{errors.name}</p>
			)}
		</div>

		{/* Email 欄位 */}
		<div className='mb-4'>
			<label htmlFor='email' className='block mb-2 font-semibold'>
				Email <span className='text-red-500'>*</span>
			</label>
			<input
				type='email'
				id='email'
				value={formData.email}
				onChange={(e) => setFormData({ ...formData, email: e.target.value })}
				className={`w-full px-4 py-2 border rounded-lg ${
					errors.email ? "border-red-500" : "border-gray-300"
				}`}
				disabled={isSubmitting}
			/>
			{errors.email && (
				<p className='text-red-500 text-sm mt-1'>{errors.email}</p>
			)}
		</div>

		{/* 訊息欄位 */}
		<div className='mb-4'>
			<label htmlFor='message' className='block mb-2 font-semibold'>
				訊息內容 <span className='text-red-500'>*</span>
			</label>
			<textarea
				id='message'
				rows={5}
				value={formData.message}
				onChange={(e) => setFormData({ ...formData, message: e.target.value })}
				className={`w-full px-4 py-2 border rounded-lg ${
					errors.message ? "border-red-500" : "border-gray-300"
				}`}
				disabled={isSubmitting}
			/>
			{errors.message && (
				<p className='text-red-500 text-sm mt-1'>{errors.message}</p>
			)}
		</div>

		{/* 圖片驗證碼 */}
		<div className='mb-6'>
			<label htmlFor='captcha' className='block mb-2 font-semibold'>
				驗證碼 <span className='text-red-500'>*</span>
			</label>

			<div className='flex items-center gap-4 mb-2'>
				{/* 驗證碼圖片 */}
				<div className='border border-gray-300 rounded-lg overflow-hidden bg-gray-100'>
					{isLoadingCaptcha ? (
						<div className='w-[120px] h-[40px] flex items-center justify-center'>
							<span className='text-sm text-gray-500'>載入中...</span>
						</div>
					) : captcha?.captchaImage ? (
						<img
							src={captcha.captchaImage}
							alt='驗證碼'
							className='w-[120px] h-[40px]'
						/>
					) : (
						<div className='w-[120px] h-[40px] flex items-center justify-center'>
							<span className='text-sm text-gray-500'>無法載入</span>
						</div>
					)}
				</div>

				{/* 重新整理按鈕 */}
				<button
					type='button'
					onClick={fetchCaptcha}
					disabled={isLoadingCaptcha || isSubmitting}
					className='px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors disabled:opacity-50'>
					🔄 重新整理
				</button>
			</div>

			{/* 驗證碼輸入框 */}
			<input
				type='text'
				id='captcha'
				value={formData.captchaCode}
				onChange={(e) => {
					// 只允許輸入數字，最多4位
					const value = e.target.value.replace(/\D/g, "").slice(0, 4);
					setFormData({ ...formData, captchaCode: value });
				}}
				placeholder='請輸入圖片中的4位數字'
				maxLength={4}
				className={`w-full px-4 py-2 border rounded-lg ${
					errors.captchaCode ? "border-red-500" : "border-gray-300"
				}`}
				disabled={isSubmitting}
			/>
			{errors.captchaCode && (
				<p className='text-red-500 text-sm mt-1'>{errors.captchaCode}</p>
			)}
			{errors.captchaToken && (
				<p className='text-red-500 text-sm mt-1'>{errors.captchaToken}</p>
			)}
		</div>

		{/* 提交按鈕 */}
		<button
			type='submit'
			disabled={isSubmitting || isLoadingCaptcha}
			className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
			{isSubmitting ? "提交中..." : "送出表單"}
		</button>
	</form>
);
```

## 完整流程說明

### 使用者操作流程

1. **載入頁面**

   - 組件 mount 時自動呼叫 `fetchCaptcha()`
   - 從後端獲取 Base64 圖片和 token
   - 顯示驗證碼圖片

2. **填寫表單**

   - 使用者填寫姓名、Email、訊息
   - 查看驗證碼圖片並輸入看到的數字
   - 如果看不清楚，可以點擊「重新整理」按鈕

3. **提交表單**

   - 前端先進行基本驗證（必填、格式、長度）
   - 將表單資料和 `captchaCode`、`captchaToken` 一起送到後端
   - 後端驗證驗證碼是否正確

4. **處理結果**
   - **成功**: 顯示成功訊息，清空表單，獲取新驗證碼
   - **失敗**: 顯示錯誤訊息，如果是驗證碼錯誤則自動重新獲取

### 錯誤處理情境

| 錯誤情境       | 前端處理                             |
| -------------- | ------------------------------------ |
| 驗證碼輸入錯誤 | 顯示錯誤訊息，自動獲取新驗證碼       |
| 驗證碼過期     | 提示使用者重新整理，自動獲取新驗證碼 |
| 表單驗證失敗   | 顯示對應欄位的錯誤訊息               |
| 網路錯誤       | 顯示錯誤提示，保留表單資料           |

### 安全性考量

1. **Token 保護**: 每次獲取驗證碼都會生成新的加密 token
2. **時效性**: 驗證碼有 5 分鐘有效期限
3. **一次性**: Token 驗證後即失效，無法重複使用
4. **前後端雙重驗證**: 前端驗證格式，後端驗證正確性

### 使用者體驗優化

1. **自動載入**: 頁面載入時自動獲取驗證碼
2. **重新整理**: 提供明顯的重新整理按鈕
3. **載入狀態**: 顯示載入中的視覺回饋
4. **錯誤提示**: 清晰的錯誤訊息和解決方案
5. **輸入限制**: 自動過濾非數字字元，限制長度為 4 位

## 後端實作建議

### Token 生成範例 (Node.js)

```javascript
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// 生成驗證碼
function generateCaptcha() {
	// 生成 4 位隨機數字
	const code = Math.floor(1000 + Math.random() * 9000).toString();

	// 生成圖片 (使用 canvas 或其他圖片庫)
	const imageBuffer = createCaptchaImage(code);
	const base64Image = `data:image/png;base64,${imageBuffer.toString("base64")}`;

	// 生成 JWT token
	const token = jwt.sign(
		{
			code: code,
			exp: Math.floor(Date.now() / 1000) + 5 * 60, // 5分鐘後過期
		},
		process.env.JWT_SECRET
	);

	return {
		captchaImage: base64Image,
		captchaToken: token,
	};
}

// 驗證驗證碼
function verifyCaptcha(captchaCode, captchaToken) {
	try {
		const decoded = jwt.verify(captchaToken, process.env.JWT_SECRET);
		return decoded.code === captchaCode;
	} catch (error) {
		// Token 無效或已過期
		return false;
	}
}
```

## 測試檢查清單

- [ ] 驗證碼圖片正確顯示
- [ ] 重新整理按鈕功能正常
- [ ] 輸入框只接受數字
- [ ] 輸入框限制為 4 位
- [ ] 表單驗證正確運作
- [ ] 驗證碼錯誤時自動重新獲取
- [ ] 驗證碼過期時自動重新獲取
- [ ] 提交成功後表單重置
- [ ] 載入狀態正確顯示
- [ ] 錯誤訊息清晰易懂
- [ ] 禁用狀態正確處理
- [ ] 響應式設計在各裝置正常顯示

---

**文檔版本**: 1.0.0  
**最後更新**: 2025-11-10
