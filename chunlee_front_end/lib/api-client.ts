/**
 * API 客戶端 - 統一管理所有 API 請求
 * 自動添加 Authorization header 和錯誤處理
 */

// Token 存儲 key
const TOKEN_KEY = 'auth-token'

// 存儲 token 到 localStorage
export function setToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token)
  }
}

// 從 localStorage 獲取 token
export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY)
  }
  return null
}

// 清除 token
export function clearToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY)
  }
}

// API 請求配置
interface ApiRequestConfig extends RequestInit {
  // 是否需要認證（默認 true）
  requireAuth?: boolean
  // 自定義 headers
  headers?: Record<string, string>
}

// API 響應類型
interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  [key: string]: any
}

/**
 * 統一的 API 請求方法
 * 自動添加 token 到 Authorization header
 */
export async function apiClient<T = any>(
  url: string,
  config: ApiRequestConfig = {}
): Promise<T> {
  const { requireAuth = true, headers = {}, ...restConfig } = config

  // 構建請求 headers
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  }

  // 如果需要認證，添加 Authorization header
  if (requireAuth) {
    const token = getToken()
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`
      console.log('[API Client] 添加 Authorization header')
    } else {
      console.warn('[API Client] 需要認證但未找到 token')
    }
  }

  try {
    console.log(`[API Client] ${config.method || 'GET'} ${url}`)

    const response = await fetch(url, {
      ...restConfig,
      headers: requestHeaders,
      credentials: 'include', // 包含 cookies
    })

    // 檢查 HTTP 狀態碼
    if (!response.ok) {
      // 401 未授權，可能 token 過期
      if (response.status === 401) {
        console.error('[API Client] 401 未授權，清除 token')
        clearToken()

        // 如果不在登入頁，跳轉到登入頁
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
          window.location.href = `/admin/login?from=${window.location.pathname}`
        }
      }

      // 嘗試解析錯誤信息
      let errorMessage = `HTTP Error: ${response.status}`
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorMessage
      } catch (e) {
        // 無法解析 JSON，使用默認錯誤信息
      }

      throw new Error(errorMessage)
    }

    // 解析響應
    const data = await response.json()
    console.log(`[API Client] ${url} 請求成功`)

    return data as T
  } catch (error) {
    console.error(`[API Client] ${url} 請求失敗:`, error)
    throw error
  }
}

/**
 * GET 請求
 */
export function apiGet<T = any>(
  url: string,
  config?: Omit<ApiRequestConfig, 'method' | 'body'>
): Promise<T> {
  return apiClient<T>(url, { ...config, method: 'GET' })
}

/**
 * POST 請求
 */
export function apiPost<T = any>(
  url: string,
  data?: any,
  config?: Omit<ApiRequestConfig, 'method' | 'body'>
): Promise<T> {
  return apiClient<T>(url, {
    ...config,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  })
}

/**
 * PUT 請求
 */
export function apiPut<T = any>(
  url: string,
  data?: any,
  config?: Omit<ApiRequestConfig, 'method' | 'body'>
): Promise<T> {
  return apiClient<T>(url, {
    ...config,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  })
}

/**
 * DELETE 請求
 */
export function apiDelete<T = any>(
  url: string,
  config?: Omit<ApiRequestConfig, 'method' | 'body'>
): Promise<T> {
  return apiClient<T>(url, { ...config, method: 'DELETE' })
}

/**
 * PATCH 請求
 */
export function apiPatch<T = any>(
  url: string,
  data?: any,
  config?: Omit<ApiRequestConfig, 'method' | 'body'>
): Promise<T> {
  return apiClient<T>(url, {
    ...config,
    method: 'PATCH',
    body: data ? JSON.stringify(data) : undefined,
  })
}
