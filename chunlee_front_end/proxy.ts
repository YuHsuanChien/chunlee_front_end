import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Next.js 16 將 middleware 重命名為 proxy
// 使用 Node.js runtime（不再支援 Edge runtime）
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 檢查是否訪問 admin 路徑（排除登入頁）
  const isAdminRoute = pathname.startsWith('/admin')
  const isLoginPage = pathname === '/admin/login'

  if (isAdminRoute && !isLoginPage) {
    // 從 cookie 檢查認證 token
    const token = request.cookies.get('auth-token')?.value

    // 如果沒有 token，重定向到登入頁
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url)
      // 保存原本要訪問的頁面，登入後可以跳轉回去
      loginUrl.searchParams.set('from', pathname)

      // console.log(`[Proxy] 未授權訪問: ${pathname}, 重定向到登入頁`)
      return NextResponse.redirect(loginUrl)
    }

    // 這裡可以進一步驗證 token 是否有效
    // 例如：呼叫 API 驗證或解碼 JWT
    // console.log(`[Proxy] 已授權訪問: ${pathname}`)
  }

  // 如果已登入但訪問登入頁，可以選擇重定向到後台首頁
  if (isLoginPage && request.cookies.get('auth-token')?.value) {
    const from = request.nextUrl.searchParams.get('from')
    const homeUrl = new URL(from || '/admin/admin-home', request.url)
    // console.log(`[Proxy] 已登入用戶訪問登入頁，重定向到: ${homeUrl.pathname}`)
    return NextResponse.redirect(homeUrl)
  }

  return NextResponse.next()
}

// 配置哪些路徑需要執行 proxy
export const config = {
  matcher: [
    // 匹配所有 admin 路徑
    '/admin/:path*',
  ],
}
