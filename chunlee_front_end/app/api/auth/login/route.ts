import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { captchaStore } from '../captcha/route'

// 假的用戶資料（實際應該從資料庫獲取）
const MOCK_USERS = [
  {
    id: '1',
    account: 'admin',
    password: 'admin123', // 實際應該使用加密密碼
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

// 驗證驗證碼
function verifyCaptcha(captchaId: string, captchaInput: string): boolean {
  const stored = captchaStore.get(captchaId)

  if (!stored) {
    return false // 驗證碼不存在
  }

  if (stored.expiresAt < Date.now()) {
    captchaStore.delete(captchaId)
    return false // 驗證碼已過期
  }

  // 不區分大小寫比對
  const isValid = stored.text.toLowerCase() === captchaInput.toLowerCase()

  // 驗證後刪除（一次性使用）
  if (isValid) {
    captchaStore.delete(captchaId)
  }

  return isValid
}

// 生成簡單的 token（實際應該使用 JWT）
function generateToken(userId: string): string {
  return `token_${userId}_${Date.now()}_${Math.random().toString(36).substring(2)}`
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { account, password, captcha, captchaId } = body

    // 驗證必填欄位
    if (!account || !password || !captcha || !captchaId) {
      return NextResponse.json(
        { success: false, message: '請填寫完整資訊' },
        { status: 400 }
      )
    }

    // 1. 驗證驗證碼
    const isCaptchaValid = verifyCaptcha(captchaId, captcha)
    if (!isCaptchaValid) {
      return NextResponse.json(
        { success: false, message: '驗證碼錯誤或已過期' },
        { status: 400 }
      )
    }

    // 2. 驗證帳號密碼
    const user = MOCK_USERS.find(
      (u) => u.account === account && u.password === password
    )

    if (!user) {
      return NextResponse.json(
        { success: false, message: '帳號或密碼錯誤' },
        { status: 401 }
      )
    }

    // 3. 生成 token
    const token = generateToken(user.id)

    // 4. 設定 cookie
    const cookieStore = await cookies()
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 天
      path: '/',
    })

    // 5. 返回用戶資訊（不包含密碼）
    return NextResponse.json({
      success: true,
      message: '登入成功',
      user: {
        id: user.id,
        account: user.account,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('登入錯誤:', error)
    return NextResponse.json(
      { success: false, message: '登入失敗，請稍後再試' },
      { status: 500 }
    )
  }
}
