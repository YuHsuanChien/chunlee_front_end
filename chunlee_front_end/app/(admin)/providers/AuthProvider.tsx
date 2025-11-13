'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { apiGet, apiPost, setToken, clearToken } from '@/lib/api-client'

// 用戶資料類型
export interface User {
  id: string
  account: string
  name: string
  role: string
}

// 認證上下文類型
interface AuthContextType {
  user: User | null
  login: (account: string, password: string, captcha: string, captchaId: string) => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
  refreshUser: () => Promise<void>
}

// 創建認證上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // 檢查用戶認證狀態
  const checkAuth = async () => {
    try {
      const data = await apiGet<{ success: boolean; user?: User }>('/api/auth/me')

      if (data.success && data.user) {
        setUser(data.user)
        console.log('[AuthProvider] 用戶已登入:', data.user.name)
      } else {
        setUser(null)
        console.log('[AuthProvider] 用戶未登入')
      }
    } catch (error) {
      console.error('[AuthProvider] 檢查認證失敗:', error)
      setUser(null)
      clearToken() // 清除無效的 token
    } finally {
      setIsLoading(false)
    }
  }

  // 頁面載入時檢查認證
  useEffect(() => {
    checkAuth()
  }, [])

  // 登入功能
  const login = async (
    account: string,
    password: string,
    captcha: string,
    captchaId: string
  ) => {
    const data = await apiPost<{
      success: boolean
      message?: string
      token?: string
      user?: User
    }>('/api/auth/login',
      { account, password, captcha, captchaId },
      { requireAuth: false } // 登入請求不需要認證
    )

    if (!data.success || !data.user || !data.token) {
      throw new Error(data.message || '登入失敗')
    }

    // 保存 token 到 localStorage
    setToken(data.token)
    setUser(data.user)
    console.log('[AuthProvider] 登入成功:', data.user.name)
    console.log('[AuthProvider] Token 已保存')

    // 登入成功後跳轉
    const searchParams = new URLSearchParams(window.location.search)
    const from = searchParams.get('from') || '/admin/admin-home'
    router.push(from)
  }

  // 登出功能
  const logout = async () => {
    try {
      await apiPost('/api/auth/logout')

      // 清除 token 和用戶狀態
      clearToken()
      setUser(null)
      console.log('[AuthProvider] 登出成功，token 已清除')

      router.push('/admin/login')
    } catch (error) {
      console.error('[AuthProvider] 登出失敗:', error)
      // 即使 API 失敗，也清除本地狀態
      clearToken()
      setUser(null)
      router.push('/admin/login')
    }
  }

  // 刷新用戶資料
  const refreshUser = async () => {
    await checkAuth()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// 自定義 Hook 來使用認證上下文
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
