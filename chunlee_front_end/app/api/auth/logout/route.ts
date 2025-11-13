import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    // 清除 auth-token cookie
    const cookieStore = await cookies()
    cookieStore.delete('auth-token')

    console.log('[Logout API] 用戶已登出，cookie 已清除')

    return NextResponse.json({
      success: true,
      message: '登出成功',
    })
  } catch (error) {
    console.error('[Logout API] 登出失敗:', error)
    return NextResponse.json(
      { success: false, message: '登出失敗' },
      { status: 500 }
    )
  }
}
