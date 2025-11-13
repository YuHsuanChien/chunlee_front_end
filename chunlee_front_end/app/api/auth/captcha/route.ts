import { NextResponse } from 'next/server'

// 生成隨機驗證碼 ID
function generateCaptchaId(): string {
  return `captcha_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

// 生成隨機驗證碼文字（4位數字+字母）
function generateCaptchaText(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // 排除容易混淆的字符
  let result = ''
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// 創建驗證碼圖片（使用 Canvas 或返回假圖片）
function generateCaptchaImage(text: string): string {
  // 這裡先返回一個假的 base64 圖片
  // 實際使用時，你可以使用 node-canvas 或其他套件生成真實的驗證碼圖片

  // 創建一個簡單的 SVG 驗證碼
  const svg = `
    <svg width="120" height="40" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="40" fill="#f3f4f6"/>
      <text x="10" y="28" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#1f2937">
        ${text}
      </text>
      <line x1="0" y1="15" x2="120" y2="15" stroke="#9ca3af" stroke-width="1"/>
      <line x1="0" y1="25" x2="120" y2="25" stroke="#9ca3af" stroke-width="1"/>
      <circle cx="20" cy="10" r="2" fill="#6b7280"/>
      <circle cx="60" cy="30" r="2" fill="#6b7280"/>
      <circle cx="100" cy="20" r="2" fill="#6b7280"/>
    </svg>
  `

  // 將 SVG 轉換為 base64
  const base64 = Buffer.from(svg).toString('base64')
  return `data:image/svg+xml;base64,${base64}`
}

// 簡易的記憶體儲存（實際應用中應該使用 Redis 或資料庫）
const captchaStore = new Map<string, { text: string; expiresAt: number }>()

// 定期清理過期的驗證碼
setInterval(() => {
  const now = Date.now()
  for (const [id, data] of captchaStore.entries()) {
    if (data.expiresAt < now) {
      captchaStore.delete(id)
    }
  }
}, 60000) // 每分鐘清理一次

export async function GET() {
  try {
    // 生成驗證碼
    const captchaId = generateCaptchaId()
    const captchaText = generateCaptchaText()
    const captchaImage = generateCaptchaImage(captchaText)

    // 儲存驗證碼（5分鐘後過期）
    captchaStore.set(captchaId, {
      text: captchaText,
      expiresAt: Date.now() + 5 * 60 * 1000,
    })

    return NextResponse.json({
      success: true,
      captchaId,
      captchaImage,
    })
  } catch (error) {
    console.error('生成驗證碼失敗:', error)
    return NextResponse.json(
      { success: false, message: '生成驗證碼失敗' },
      { status: 500 }
    )
  }
}

// 驗證驗證碼（供登入 API 使用）
export function verifyCaptcha(captchaId: string, captchaInput: string): boolean {
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

// 匯出 captchaStore 供其他模組使用
export { captchaStore }
