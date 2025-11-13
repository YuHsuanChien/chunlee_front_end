'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '../../providers/AuthProvider'

export default function AdminLoginPage() {
  const { login } = useAuth()
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    account: '',
    password: '',
    captcha: '',
  })
  const [captchaData, setCaptchaData] = useState<{
    id: string
    image: string
  } | null>(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // 獲取驗證碼
  const fetchCaptcha = async () => {
    try {
      // 使用原生 fetch（此 API 在攔截器的白名單中，不會添加 token）
      const response = await fetch('/api/auth/captcha')
      if (response.ok) {
        const data = await response.json()
        setCaptchaData({
          id: data.captchaId,
          image: data.captchaImage,
        })
      }
    } catch (err) {
      console.error('獲取驗證碼失敗:', err)
    }
  }

  // 頁面初始載入時獲取驗證碼
  useEffect(() => {
    fetchCaptcha()
  }, [])

  // 處理輸入變更
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // 刷新驗證碼
  const handleRefreshCaptcha = () => {
    fetchCaptcha()
    setFormData((prev) => ({ ...prev, captcha: '' }))
  }

  // 處理登入
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (!captchaData?.id) {
        throw new Error('驗證碼尚未載入')
      }

      // 使用 AuthProvider 的 login 方法
      await login(
        formData.account,
        formData.password,
        formData.captcha,
        captchaData.id
      )

      // 登入成功，AuthProvider 會自動處理跳轉
    } catch (err) {
      setError(err instanceof Error ? err.message : '登入失敗，請重試')
      // 登入失敗後刷新驗證碼
      handleRefreshCaptcha()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        {/* Logo 和標題 */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            後台管理系統
          </h1>
          <p className="text-sm text-gray-600">群力管理顧問公司</p>
        </div>

        {/* 登入表單 */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* 錯誤訊息 */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            </div>
          )}

          {/* 帳號輸入 */}
          <div>
            <label
              htmlFor="account"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              帳號
            </label>
            <input
              id="account"
              name="account"
              type="text"
              required
              value={formData.account}
              onChange={handleChange}
              className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="請輸入帳號"
            />
          </div>

          {/* 密碼輸入 */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              密碼
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="請輸入密碼"
            />
          </div>

          {/* 驗證碼輸入 */}
          <div>
            <label
              htmlFor="captcha"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              驗證碼
            </label>
            <div className="flex gap-3">
              <input
                id="captcha"
                name="captcha"
                type="text"
                required
                value={formData.captcha}
                onChange={handleChange}
                className="flex-1 appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="請輸入驗證碼"
              />

              {/* 驗證碼圖片 */}
              <div className="flex-shrink-0 relative">
                <div
                  onClick={handleRefreshCaptcha}
                  className="w-32 h-12 bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-300 transition overflow-hidden"
                  title="點擊刷新驗證碼"
                >
                  {captchaData?.image ? (
                    <img
                      src={captchaData.image}
                      alt="驗證碼"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-xs">載入中...</span>
                  )}
                </div>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              看不清楚？點擊圖片刷新驗證碼
            </p>
          </div>

          {/* 登入按鈕 */}
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                登入中...
              </>
            ) : (
              '登入'
            )}
          </button>
        </form>

        {/* 底部資訊 */}
        <div className="text-center text-sm text-gray-500 mt-4">
          <p>請使用管理員帳號登入</p>
        </div>
      </div>
    </div>
  )
}
