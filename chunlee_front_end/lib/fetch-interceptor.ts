/**
 * 全域 Fetch 攔截器
 * 自動攔截所有 fetch 請求，添加 Authorization header
 */

const TOKEN_KEY = 'auth-token'

// Token 管理函數
export function setToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token)
  }
}

export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY)
  }
  return null
}

export function clearToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY)
  }
}

// 不需要添加 token 的路徑（登入、驗證碼等）
const NO_AUTH_PATHS = ['/api/auth/login', '/api/auth/captcha']

/**
 * 初始化全域 fetch 攔截器
 * 需要在客戶端組件中調用
 */
export function setupFetchInterceptor() {
  if (typeof window === 'undefined') {
    console.warn('[Fetch Interceptor] 只能在客戶端使用')
    return
  }

  // 檢查是否已經設置過
  if ((window as any).__FETCH_INTERCEPTOR_SETUP__) {
    return
  }

  console.log('[Fetch Interceptor] 初始化全域 fetch 攔截器')

  // 保存原始的 fetch
  const originalFetch = window.fetch

  // 覆寫 fetch 方法
  window.fetch = async function (
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response> {
    // 獲取請求 URL
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url

    // 判斷是否需要添加 token
    const needsAuth = !NO_AUTH_PATHS.some((path) => url.includes(path))

    // 如果需要認證，添加 Authorization header
    if (needsAuth) {
      const token = getToken()

      if (token) {
        // 複製 init 對象，避免修改原始對象
        const modifiedInit: RequestInit = {
          ...init,
          headers: {
            ...init?.headers,
            Authorization: `Bearer ${token}`,
          },
        }

        console.log(`[Fetch Interceptor] 添加 Authorization header: ${url}`)

        // 使用修改後的配置調用原始 fetch
        const response = await originalFetch(input, modifiedInit)

        // 處理 401 未授權錯誤
        if (response.status === 401) {
          console.error('[Fetch Interceptor] 401 未授權，清除 token 並跳轉登入頁')
          clearToken()

          // 跳轉到登入頁（保存當前路徑）
          if (!window.location.pathname.includes('/login')) {
            window.location.href = `/admin/login?from=${window.location.pathname}`
          }
        }

        return response
      } else {
        console.log(`[Fetch Interceptor] 無 token，正常請求: ${url}`)
      }
    }

    // 不需要認證或沒有 token，直接調用原始 fetch
    return originalFetch(input, init)
  }

  // 標記已設置
  ;(window as any).__FETCH_INTERCEPTOR_SETUP__ = true
}

/**
 * 清理攔截器（通常不需要調用）
 */
export function cleanupFetchInterceptor() {
  if (typeof window !== 'undefined') {
    delete (window as any).__FETCH_INTERCEPTOR_SETUP__
    console.log('[Fetch Interceptor] 已清理攔截器')
  }
}
