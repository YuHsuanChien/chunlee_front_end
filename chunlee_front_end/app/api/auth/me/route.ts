import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// 假的用戶資料（實際應該從資料庫獲取）
const MOCK_USERS = [
  {
    id: '1',
    account: 'admin',
    password: 'admin123',
    name: '系統管理員',
    role: 'admin',
  },
  {
    id: '2',
    account: 'test',
    password: 'test123',
    name: '測試用戶',
    role: 'user',
  },
]

// Token 儲存（實際應該使用 Redis 或資料庫）
// 格式: token => userId
const tokenStore = new Map<string, string>()

// 根據 token 獲取用戶 ID
function getUserIdFromToken(token: string): string | null {
  // 這裡簡化處理，實際應該解碼 JWT 或從 Redis 查詢
  const match = token.match(/^token_(\d+)_/)
  return match ? match[1] : null
}

export async function GET() {
  try {
    // 從 cookie 獲取 token
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { success: false, message: '未登入' },
        { status: 401 }
      )
    }

    // 解析 token 獲取用戶 ID
    const userId = getUserIdFromToken(token)

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Token 無效' },
        { status: 401 }
      )
    }

    // 根據用戶 ID 查找用戶
    const user = MOCK_USERS.find((u) => u.id === userId)

    if (!user) {
      return NextResponse.json(
        { success: false, message: '用戶不存在' },
        { status: 404 }
      )
    }

    // 返回用戶資訊（不包含密碼）
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        account: user.account,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('獲取用戶資訊失敗:', error)
    return NextResponse.json(
      { success: false, message: '伺服器錯誤' },
      { status: 500 }
    )
  }
}
