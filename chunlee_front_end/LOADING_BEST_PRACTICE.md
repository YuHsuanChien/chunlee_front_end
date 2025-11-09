# Next.js Loading 系統 - 官方最佳實作

## 🎯 實作方式

根據 Next.js 官方文檔，我們採用 **`loading.js` 文件** 的方式來實作 Loading UI。這是 Next.js App Router 的標準做法。

## ✨ 工作原理

### 自動 Suspense 邊界

當您在路由文件夾中創建 `loading.tsx` 時：

1. Next.js 自動將該路由的 `page.tsx` 包裝在 `<Suspense>` 邊界中
2. 在路由切換時，立即顯示 `loading.tsx` 的內容
3. 當頁面內容（包括所有資料）完全載入後，自動替換為實際頁面
4. **這是真正基於資料載入完成的 Loading，不是時間延遲！**

### 架構圖

```
app/
├── layout.tsx
├── loading.tsx          ← 根路由的 loading
├── page.tsx
├── about/
│   ├── loading.tsx      ← /about 路由的 loading
│   └── page.tsx
├── consultants/
│   ├── loading.tsx      ← /consultants 路由的 loading
│   └── page.tsx
└── ...
```

## 📁 已創建的 Loading 文件

所有主要路由都已添加 `loading.tsx`：

1. ✅ `app/loading.tsx` - 首頁 loading
2. ✅ `app/about/loading.tsx` - 關於我們 loading
3. ✅ `app/business-function/loading.tsx` - 企業輔導 loading
4. ✅ `app/consultants/loading.tsx` - 顧問師群 loading
5. ✅ `app/contact-us/loading.tsx` - 聯絡我們 loading

## 🚀 優點

### 1. **真正基於資料載入**

- 不依賴 setTimeout 或手動狀態管理
- Next.js 自動偵測頁面資料載入狀態
- 包括 Server Components 的資料獲取

### 2. **零配置**

- 不需要手動 useEffect 或 useState
- 不需要全域狀態管理
- 只需創建 `loading.tsx` 文件

### 3. **更好的用戶體驗**

- 即時顯示 loading 狀態（預取）
- 可中斷導航（無需等待完整載入）
- 共享佈局保持互動性

### 4. **SEO 友好**

- Server-side streaming
- 不影響 SEO
- 自動處理 metadata

### 5. **性能優化**

- Streaming Server Rendering
- Selective Hydration
- 自動代碼分割

## 💡 Loading 文件範例

```tsx
// app/about/loading.tsx
import { Loading } from "@/components/common";

export default function AboutLoading() {
	return <Loading />;
}
```

## 🎨 自定義 Loading UI

您可以在每個 `loading.tsx` 中使用不同的 Loading UI：

```tsx
// 簡單的 spinner
export default function Loading() {
	return <p>Loading...</p>;
}

// Skeleton UI
export default function Loading() {
	return <LoadingSkeleton />;
}

// 自定義動畫
export default function Loading() {
	return <CustomLoadingAnimation />;
}
```

## 🔄 與 Suspense 組合使用

對於頁面內的特定組件，可以使用 `<Suspense>`：

```tsx
import { Suspense } from "react";

export default function Page() {
	return (
		<div>
			<h1>My Page</h1>

			{/* 這部分會立即顯示 */}
			<StaticContent />

			{/* 這部分會顯示 loading */}
			<Suspense fallback={<p>Loading data...</p>}>
				<AsyncDataComponent />
			</Suspense>
		</div>
	);
}
```

## 📊 Loading 行為

### 導航時的行為

1. **用戶點擊連結** → 立即顯示 loading UI
2. **開始獲取資料** → loading 持續顯示
3. **資料載入完成** → 自動切換到實際頁面
4. **渲染完成** → loading 消失

### 預取（Prefetching）

- Loading UI 會被預取
- 使導航幾乎瞬間完成（除非預取未完成）

### 可中斷導航

- 用戶可以在載入過程中切換到其他路由
- 不需要等待當前路由完全載入

## 🆚 與舊方法的比較

### ❌ 舊方法（手動管理）

```tsx
"use client";

export default function Page() {
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		setTimeout(() => setIsReady(true), 100); // 不準確！
	}, []);

	if (!isReady) return <Loading />;
	return <ActualContent />;
}
```

**問題：**

- 依賴固定時間，不準確
- 需要客戶端狀態管理
- 每個頁面都要重複代碼
- 不利於 SEO

### ✅ 新方法（Next.js loading.tsx）

```tsx
// app/page.tsx
export default function Page() {
	return <ActualContent />; // 簡單！
}

// app/loading.tsx
export default function Loading() {
	return <LoadingUI />; // 自動處理！
}
```

**優點：**

- 自動偵測資料載入狀態
- 零手動管理
- 更好的性能
- SEO 友好

## 📝 測試指南

1. **開啟開發伺服器**

   ```bash
   npm run dev
   ```

2. **測試頁面切換**

   - 點擊不同的頁面連結
   - 觀察 loading 動畫
   - 確認頁面完全載入後才顯示內容

3. **測試慢速網路**

   - 開啟瀏覽器開發工具
   - Network → Throttling → Slow 3G
   - 測試 loading 是否正常運作

4. **測試 React DevTools**
   - 安裝 React Developer Tools
   - 觀察 Suspense 邊界
   - 確認組件載入順序

## 🔗 參考資源

- [Next.js Loading UI 官方文檔](https://nextjs.org/docs/app/api-reference/file-conventions/loading)
- [React Suspense 文檔](https://react.dev/reference/react/Suspense)
- [Streaming Server Rendering](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)

## 🎉 總結

使用 Next.js 的 `loading.tsx` 是：

- ✅ **官方推薦**的標準做法
- ✅ **自動偵測**資料載入狀態
- ✅ **零配置**，簡單易用
- ✅ **性能優化**，SEO 友好
- ✅ **更好的用戶體驗**

這是 Next.js App Router 中處理 loading 狀態的最佳實踐！
