'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'

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
      const response = await fetch('/api/auth/me', {
        credentials: 'include', // 包含 cookie
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.user) {
          setUser(data.user)
          console.log('[AuthProvider] 用戶已登入:', data.user.name)
        } else {
          setUser(null)
          console.log('[AuthProvider] 用戶未登入')
        }
      } else {
        setUser(null)
        console.log('[AuthProvider] 認證失敗，狀態碼:', response.status)
      }
    } catch (error) {
      console.error('[AuthProvider] 檢查認證失敗:', error)
      setUser(null)
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
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ account, password, captcha, captchaId }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || '登入失敗')
    }

    const data = await response.json()

    if (data.success && data.user) {
      setUser(data.user)
      console.log('[AuthProvider] 登入成功:', data.user.name)

      // 登入成功後跳轉
      const searchParams = new URLSearchParams(window.location.search)
      const from = searchParams.get('from') || '/admin/admin-home'
      router.push(from)
    } else {
      throw new Error('登入失敗')
    }
  }

  // 登出功能
  const logout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })

      if (response.ok) {
        setUser(null)
        console.log('[AuthProvider] 登出成功')
        router.push('/admin/login')
      }
    } catch (error) {
      console.error('[AuthProvider] 登出失敗:', error)
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
