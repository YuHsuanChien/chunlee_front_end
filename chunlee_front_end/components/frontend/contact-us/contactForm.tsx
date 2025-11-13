"use client";

import { useState } from "react";

interface FormData {
	name: string;
	email: string;
	message: string;
	captcha: string;
}

interface FormErrors {
	name?: string;
	email?: string;
	message?: string;
	captcha?: string;
}

export const ContactForm = () => {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		message: "",
		captcha: "",
	});

	const [errors, setErrors] = useState<FormErrors>({});
	const [showErrors, setShowErrors] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	// 驗證函數
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

		// 驗證碼驗證 (13 - 6 = 7)
		if (!formData.captcha.trim()) {
			newErrors.captcha = "這是必填欄位";
		} else if (formData.captcha.trim() !== "7") {
			newErrors.captcha = "答案不正確，請重新計算";
		}

		return newErrors;
	};

	// 處理輸入變更
	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// 清除對應欄位的錯誤
		if (errors[name as keyof FormErrors]) {
			setErrors((prev) => ({
				...prev,
				[name]: undefined,
			}));
		}
	};

	// 處理表單送出
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// 驗證表單
		const newErrors = validateForm();
		setErrors(newErrors);
		setShowErrors(true);

		// 如果有錯誤，停止送出
		if (Object.keys(newErrors).length > 0) {
			setIsSubmitting(false);
			return;
		}

		try {
			// 這裡可以添加實際的表單送出邏輯
			// 例如：await submitContactForm(formData);

			// 模擬API呼叫
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// 成功送出後的處理
			alert("表單已成功送出！我們會盡快回覆您。");

			// 重置表單
			setFormData({
				name: "",
				email: "",
				message: "",
				captcha: "",
			});
			setErrors({});
			setShowErrors(false);
		} catch (error: unknown) {
			console.error("表單送出錯誤:", error);
			alert("送出失敗，請稍後再試。");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className='max-w-[1600px] mx-auto px-6 md:px-12 py-12 md:py-20 lg:py-24'>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16'>
				{/* Contact Form */}
				<div className='bg-white'>
					<h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-6'>
						Contact Form
					</h2>

					<form onSubmit={handleSubmit} className='space-y-6' noValidate>
						{/* Name Field */}
						<div>
							<label className='block text-gray-700 font-medium mb-2'>
								姓名 <span className='text-red-500'>*</span> 為必填欄位
							</label>
							<input
								type='text'
								name='name'
								value={formData.name}
								onChange={handleInputChange}
								className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
									errors.name
										? "border-red-500 focus:ring-red-500"
										: "border-gray-300 focus:ring-blue-500"
								}`}
							/>
							<p
								className={`text-red-500 text-sm mt-1 transition-opacity duration-300 ${
									showErrors && errors.name ? "opacity-100" : "opacity-0"
								}`}>
								{errors.name || "這是必填欄位"}
							</p>
						</div>

						{/* Email Field */}
						<div>
							<label className='block text-gray-700 font-medium mb-2'>
								Email <span className='text-red-500'>*</span>
							</label>
							<input
								type='email'
								name='email'
								value={formData.email}
								onChange={handleInputChange}
								className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
									errors.email
										? "border-red-500 focus:ring-red-500"
										: "border-gray-300 focus:ring-blue-500"
								}`}
							/>
							<p
								className={`text-red-500 text-sm mt-1 transition-opacity duration-300 ${
									showErrors && errors.email ? "opacity-100" : "opacity-0"
								}`}>
								{errors.email || "這是必填欄位"}
							</p>
						</div>

						{/* Message Field */}
						<div>
							<label className='block text-gray-700 font-medium mb-2'>
								Message <span className='text-red-500'>*</span>
							</label>
							<textarea
								name='message'
								value={formData.message}
								onChange={handleInputChange}
								rows={6}
								className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent resize-vertical transition-colors ${
									errors.message
										? "border-red-500 focus:ring-red-500"
										: "border-gray-300 focus:ring-blue-500"
								}`}
							/>
							<p
								className={`text-red-500 text-sm mt-1 transition-opacity duration-300 ${
									showErrors && errors.message ? "opacity-100" : "opacity-0"
								}`}>
								{errors.message || "這是必填欄位"}
							</p>
						</div>

						{/* Captcha Field */}
						<div>
							<label className='block text-gray-700 font-medium mb-2'>
								What is thirteen minus 6?{" "}
								<span className='text-red-500'>*</span>
							</label>
							<input
								type='text'
								name='captcha'
								value={formData.captcha}
								onChange={handleInputChange}
								className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
									errors.captcha
										? "border-red-500 focus:ring-red-500"
										: "border-gray-300 focus:ring-blue-500"
								}`}
							/>
							<p
								className={`text-red-500 text-sm mt-1 transition-opacity duration-300 ${
									showErrors && errors.captcha ? "opacity-100" : "opacity-0"
								}`}>
								{errors.captcha || "這是必填欄位"}
							</p>
						</div>

						{/* Submit Button */}
						<button
							type='submit'
							disabled={isSubmitting}
							className={`px-8 py-3 rounded-md font-medium transition-colors duration-200 ${
								isSubmitting
									? "bg-gray-400 text-gray-600 cursor-not-allowed"
									: "bg-gray-800 text-white hover:bg-gray-700"
							}`}>
							{isSubmitting ? "送出中..." : "送出"}
						</button>

						<p
							className={`text-red-500 text-sm transition-opacity duration-300 ${
								showErrors && Object.keys(errors).length > 0
									? "opacity-100"
									: "opacity-0"
							}`}>
							請先更正錯誤再提交表單。
						</p>
					</form>
				</div>

				{/* Contact Information */}
				<div className='space-y-8'>
					{/* Email */}
					<div>
						<h3 className='text-lg font-semibold text-gray-800 mb-2'>電郵：</h3>
						<p className='text-gray-600'>chunleeconsulting@gmail.com</p>
					</div>

					{/* Phone */}
					<div>
						<h3 className='text-lg font-semibold text-gray-800 mb-2'>電話：</h3>
						<p className='text-gray-600'>04-2241-5742</p>
					</div>

					{/* Fax */}
					<div>
						<h3 className='text-lg font-semibold text-gray-800 mb-2'>傳真：</h3>
						<p className='text-gray-600'>04-2241-1311</p>
					</div>

					{/* Address */}
					<div>
						<h3 className='text-lg font-semibold text-gray-800 mb-2'>地址：</h3>
						<p className='text-gray-600'>台中市北屯區北屯路390號3樓之1</p>
					</div>

					{/* Map */}
					<div className='mt-6'>
						<div className='bg-gray-200 rounded-lg overflow-hidden'>
							<iframe
								src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640.1234567890123!2d120.6745678901234!3d24.1234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDA3JzI0LjQiTiAxMjDCsDQwJzI4LjQiRQ!5e0!3m2!1szh-TW!2stw!4v1234567890123!5m2!1szh-TW!2stw'
								width='100%'
								height='250'
								style={{ border: 0 }}
								allowFullScreen
								loading='lazy'
								referrerPolicy='no-referrer-when-downgrade'
								className='w-full'
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
