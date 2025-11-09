# 環境變數設定指南

## 📋 概述

本專案使用 Next.js 的環境變數系統來管理不同環境的配置。

## 📁 環境檔案說明

### 優先級順序 (從高到低)

1. **`.env.local`** - 本地覆蓋,所有環境都會載入 (Git 忽略)
2. **`.env.development`** - 開發/測試環境 (`npm run dev`)
3. **`.env.production`** - 正式環境 (`npm run build` + `npm run start`)
4. **`.env`** - 所有環境的預設值

### 檔案用途

| 檔案               | 用途                | Git 追蹤 |
| ------------------ | ------------------- | -------- |
| `.env.example`     | 範例檔案,供團隊參考 | ✅ 是    |
| `.env.development` | 開發/測試環境變數   | ❌ 否    |
| `.env.production`  | 正式環境變數        | ❌ 否    |
| `.env.local`       | 本地覆蓋,優先級最高 | ❌ 否    |

## 🚀 使用方式

### 本地開發

1. 複製 `.env.example` 為 `.env.development`:

   ```bash
   cp .env.example .env.development
   ```

2. 修改 `.env.development` 中的變數值

3. 執行開發伺服器:
   ```bash
   npm run dev
   ```

### 正式環境建置

1. 建立 `.env.production` 並填入正式環境變數

2. 執行建置:
   ```bash
   npm run build
   npm run start
   ```

## 🌐 Vercel 部署設定

### 方法一: Vercel Dashboard (推薦)

1. 登入 [Vercel Dashboard](https://vercel.com)
2. 選擇你的專案
3. 進入 **Settings** → **Environment Variables**
4. 添加以下變數:

#### Production 環境

| 變數名稱               | 範例值                        | 環境       |
| ---------------------- | ----------------------------- | ---------- |
| `NEXT_PUBLIC_BASE_URL` | `https://your-domain.com`     | Production |
| `NEXT_PUBLIC_API_URL`  | `https://your-domain.com/api` | Production |

#### Preview 環境 (可選)

| 變數名稱               | 範例值                                | 環境    |
| ---------------------- | ------------------------------------- | ------- |
| `NEXT_PUBLIC_BASE_URL` | `https://preview.your-domain.com`     | Preview |
| `NEXT_PUBLIC_API_URL`  | `https://preview.your-domain.com/api` | Preview |

#### Development 環境 (可選)

通常不需要在 Vercel 設定 Development 環境變數,因為只在本地使用。

### 方法二: Vercel CLI

```bash
# 安裝 Vercel CLI
npm i -g vercel

# 登入
vercel login

# 設定環境變數
vercel env add NEXT_PUBLIC_BASE_URL production
vercel env add NEXT_PUBLIC_API_URL production
```

### 方法三: vercel.json (不推薦用於敏感資料)

```json
{
	"env": {
		"NEXT_PUBLIC_BASE_URL": "https://your-domain.com"
	}
}
```

⚠️ **注意**: 不要將敏感資料 (API keys, secrets) 放在 `vercel.json`,因為它會被提交到 Git。

## 📝 環境變數命名規則

### `NEXT_PUBLIC_` 前綴

- **用途**: 暴露給瀏覽器端的變數
- **範例**: `NEXT_PUBLIC_BASE_URL`, `NEXT_PUBLIC_API_URL`
- **特性**: 會被嵌入到客戶端程式碼中

### 沒有前綴

- **用途**: 僅在伺服器端使用
- **範例**: `DATABASE_URL`, `API_SECRET`
- **特性**: 不會暴露給瀏覽器

## 💡 在程式碼中使用

### 客戶端元件

```typescript
// app/page.tsx
export default function Page() {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;

	return <div>Base URL: {baseUrl}</div>;
}
```

### 伺服器端元件

```typescript
// app/api/route.ts
export async function GET() {
	// 可以使用任何環境變數
	const secretKey = process.env.API_SECRET;
	const publicUrl = process.env.NEXT_PUBLIC_BASE_URL;

	// ...
}
```

### 使用 TypeScript 型別

建立 `env.d.ts`:

```typescript
declare namespace NodeJS {
	interface ProcessEnv {
		NEXT_PUBLIC_BASE_URL: string;
		NEXT_PUBLIC_API_URL: string;
		// 其他環境變數...
	}
}
```

## ✅ 最佳實踐

1. **永遠不要提交 `.env.local`, `.env.development`, `.env.production` 到 Git**
2. **使用 `.env.example` 作為範本供團隊參考**
3. **敏感資料 (API keys, secrets) 只放在伺服器端變數**
4. **在 Vercel 設定環境變數時,區分 Production, Preview, Development**
5. **定期檢查和更新環境變數**

## 🔍 驗證環境變數

建立一個測試頁面來驗證環境變數是否正確載入:

```typescript
// app/env-check/page.tsx (僅用於開發)
export default function EnvCheck() {
	return (
		<div>
			<h1>環境變數檢查</h1>
			<p>BASE_URL: {process.env.NEXT_PUBLIC_BASE_URL}</p>
			<p>API_URL: {process.env.NEXT_PUBLIC_API_URL}</p>
			<p>NODE_ENV: {process.env.NODE_ENV}</p>
		</div>
	);
}
```

⚠️ **記得在正式環境中移除或保護這個頁面!**

## 🐛 常見問題

### Q: 環境變數沒有載入?

A:

- 確認檔案名稱正確 (`.env.development` 不是 `.env.dev`)
- 重新啟動開發伺服器 (`npm run dev`)
- 檢查變數是否有 `NEXT_PUBLIC_` 前綴 (如果要在瀏覽器使用)

### Q: Vercel 部署後環境變數不正確?

A:

- 檢查 Vercel Dashboard 中的環境變數設定
- 確認環境 (Production/Preview/Development) 選擇正確
- 重新部署專案

### Q: 如何在建置時驗證環境變數?

A: 在 `next.config.ts` 中添加檢查:

```typescript
const requiredEnvVars = ["NEXT_PUBLIC_BASE_URL", "NEXT_PUBLIC_API_URL"];

requiredEnvVars.forEach((envVar) => {
	if (!process.env[envVar]) {
		throw new Error(`Missing required environment variable: ${envVar}`);
	}
});
```

## 📚 參考資源

- [Next.js 環境變數文件](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel 環境變數文件](https://vercel.com/docs/concepts/projects/environment-variables)
