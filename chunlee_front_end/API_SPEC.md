# API 規格文檔

本文檔定義了前端所需的 API 端點及其數據格式。

## 目錄

- [API 規格文檔](#api-規格文檔)
  - [目錄](#目錄)
  - [1. 後台管理 API](#1-後台管理-api)
    - [1.1 獲取驗證碼](#11-獲取驗證碼)
    - [1.2 登入](#12-登入)
    - [1.3 驗證當前用戶](#13-驗證當前用戶)
    - [1.4 登出](#14-登出)
  - [2. 教育訓練 API](#2-教育訓練-api)
    - [2.1 獲取內部訓練課程](#21-獲取內部訓練課程)
    - [2.2 獲取公開課程類別](#22-獲取公開課程類別)
    - [2.3 獲取公開課程列表](#23-獲取公開課程列表)
  - [3. 聯絡我們 API](#3-聯絡我們-api)
    - [3.1 獲取圖片驗證碼](#31-獲取圖片驗證碼)
    - [2.2 提交聯絡表單](#22-提交聯絡表單)
  - [3. 企業輔導 API](#3-企業輔導-api)
    - [3.1 獲取輔導服務列表](#31-獲取輔導服務列表)
    - [3.2 獲取特定類型服務](#32-獲取特定類型服務)
  - [通用規範](#通用規範)
    - [HTTP 狀態碼](#http-狀態碼)
    - [錯誤響應格式](#錯誤響應格式)
    - [Headers](#headers)
  - [TypeScript 類型定義匯總](#typescript-類型定義匯總)
  - [測試範例](#測試範例)
    - [1. 測試獲取課程列表](#1-測試獲取課程列表)
    - [2. 測試獲取圖片驗證碼](#2-測試獲取圖片驗證碼)
    - [3. 測試提交聯絡表單](#3-測試提交聯絡表單)
    - [4. 測試獲取企業輔導服務](#4-測試獲取企業輔導服務)
  - [備註](#備註)

---

## 1. 後台管理 API

### 1.1 獲取驗證碼

**端點**: `GET /api/auth/captcha`

**描述**: 獲取圖片驗證碼,用於登入時驗證

**請求參數**: 無

**響應格式**:

```json
{
	"success": true,
	"captchaToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
	"captchaImage": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0i..."
}
```

**數據結構說明**:

```typescript
interface CaptchaResponse {
	success: boolean;
	captchaToken: string; // JWT 加密的驗證碼 token,提交登入時需要
	captchaImage: string; // Base64 格式的驗證碼圖片
	message?: string; // 錯誤時的訊息
}
```

**錯誤響應**:

```json
{
	"success": false,
	"message": "生成驗證碼失敗"
}
```

**注意事項**:

- ✅ 使用 JWT Token 加密,安全性更高
- ✅ Token 包含驗證碼答案和過期時間
- ✅ 驗證碼有效期為 5 分鐘
- ✅ 無狀態設計,不需要伺服器端存儲
- ✅ 建議前端提供刷新驗證碼功能

---

### 1.2 登入

**端點**: `POST /api/auth/login`

**描述**: 使用帳號密碼和驗證碼登入系統

**請求 Header**:

```
Content-Type: application/json
```

**請求參數**:

```json
{
	"account": "admin",
	"password": "admin123",
	"captcha": "ABCD",
	"captchaToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**數據結構說明**:

```typescript
interface LoginRequest {
	account: string; // 帳號
	password: string; // 密碼
	captcha: string; // 驗證碼文字
	captchaToken: string; // JWT 加密的驗證碼 token
}
```

**成功響應**:

```json
{
	"success": true,
	"message": "登入成功",
	"user": {
		"id": "1",
		"account": "admin",
		"name": "系統管理員",
		"role": "admin"
	},
	"token": "token_1_1699876543210_xyz789"
}
```

**數據結構說明**:

```typescript
interface User {
	id: string;
	account: string;
	name: string;
	role: string;
}

interface LoginResponse {
	success: boolean;
	message: string;
	user: User;
	token: string; // JWT token,用於後續 API 驗證
}
```

**錯誤響應**:

```json
// 缺少必填欄位
{
  "success": false,
  "message": "請填寫完整資訊"
}

// 驗證碼錯誤
{
  "success": false,
  "message": "驗證碼錯誤或已過期"
}

// 帳號或密碼錯誤
{
  "success": false,
  "message": "帳號或密碼錯誤"
}
```

**後端需要設定的 Cookie**:

```javascript
// 後端必須設定 HTTP-only Cookie
response.cookie("auth-token", token, {
	httpOnly: true, // 防止 JavaScript 讀取
	secure: true, // HTTPS only (production)
	sameSite: "lax", // CSRF 防護
	maxAge: 7 * 24 * 60 * 60 * 1000, // 7 天有效期
	path: "/",
});
```

**Cookie 設定說明**:

- **Cookie 名稱**: `auth-token`
- **httpOnly**: 必須為 `true`,防止 XSS 攻擊
- **secure**: 生產環境必須為 `true`,僅在 HTTPS 下傳輸
- **sameSite**: 設為 `lax`,防止 CSRF 攻擊
- **maxAge**: 7 天 (604800000 毫秒)
- **path**: `/`,全站可用

**注意事項**:

- ✅ Token 會同時儲存在 **Cookie** (用於伺服器端驗證) 和 **響應 JSON** (用於客戶端存儲)
- ✅ Cookie 由後端設定,前端無法透過 JavaScript 讀取 (安全)
- ✅ 前端會將 token 存到 localStorage,用於 API 請求的 Authorization header
- ✅ Middleware 可以從 `request.cookies.get('auth-token')` 讀取 token 進行路由保護

---

### 1.3 驗證當前用戶

**端點**: `GET /api/auth/me`

**描述**: 驗證 token 並獲取當前登入用戶資訊

**請求 Header**:

```
Authorization: Bearer {token}
```

**請求參數**: 無

**成功響應**:

```json
{
	"success": true,
	"user": {
		"id": "1",
		"account": "admin",
		"name": "系統管理員",
		"role": "admin"
	}
}
```

**數據結構說明**:

```typescript
interface MeResponse {
	success: boolean;
	user: User;
	message?: string;
}
```

**錯誤響應**:

```json
// 未提供 token
{
  "success": false,
  "message": "未登入"
}

// Token 無效或已過期
{
  "success": false,
  "message": "登入已過期"
}
```

**注意事項**:

- 此 API 需要在 Header 中攜帶 Authorization token
- 前端 Axios 攔截器會自動添加此 Header
- 用於頁面載入時檢查用戶登入狀態

---

### 1.4 登出

**端點**: `POST /api/auth/logout`

**描述**: 登出系統,清除 token

**請求 Header**:

```
Authorization: Bearer {token}
```

**請求參數**: 無

**成功響應**:

```json
{
	"success": true,
	"message": "登出成功"
}
```

**錯誤響應**:

```json
{
	"success": false,
	"message": "登出失敗"
}
```

**注意事項**:

- 前端應同時清除 localStorage 中的 token
- 清除後跳轉到登入頁

---

## 2. 教育訓練 API

### 2.1 獲取內部訓練課程

**端點**: `GET /api/training/interior`

**描述**: 獲取所有內部教育訓練課程資料

**請求參數**: 無

**響應格式**:

```json
{
	"success": true,
	"data": [
		{
			"courseId": "FT",
			"courseName": "機能訓練",
			"courseList": [
				{
					"id": 1,
					"title": "行銷管理",
					"content": [
						"如何以市場調查搶占市場佔有率（6H）",
						"市場通路規劃與銷售實務管理（6H）",
						"創造第一品牌商品法則（6H）"
					]
				}
			]
		},
		{
			"courseId": "HT",
			"courseName": "層別訓練",
			"courseList": [
				{
					"id": 1,
					"title": "經營者訓練",
					"content": ["高階經營級領導養成班（36H）", "願景經營（3H）"]
				}
			]
		}
	]
}
```

**數據結構說明**:

```typescript
interface Course {
	id: number; // 課程 ID
	title: string; // 課程標題
	content: string[]; // 課程內容列表
}

interface CourseCategory {
	courseId: string; // 課程類別 ID (例: "FT", "HT", "RT", "OI")
	courseName: string; // 課程類別名稱
	courseList: Course[]; // 該類別下的課程列表
}

interface TrainingCoursesResponse {
	success: boolean;
	data: CourseCategory[];
	message?: string; // 錯誤時的訊息
}
```

**錯誤響應**:

```json
{
	"success": false,
	"message": "獲取課程資料失敗",
	"error": "錯誤詳情"
}
```

**課程類別說明**:

- `FT` (Function Training): 機能訓練
- `HT` (Hierarchical Training): 層別訓練
- `RT` (Required Training): 必修訓練
- `OI` (Organization Improvement): 組織改善

---

### 2.2 獲取公開課程類別

**端點**: `GET /api/training/exterior/categories`

**描述**: 獲取公開課程的所有類別列表

**請求參數**: 無

**響應格式**:

```json
{
	"success": true,
	"data": [
		{
			"id": 1,
			"code": "TC-R",
			"name": "台中班(零售業)"
		},
		{
			"id": 2,
			"code": "TY",
			"name": "桃園班"
		},
		{
			"id": 3,
			"code": "TC-M",
			"name": "台中班(工)"
		}
	]
}
```

**數據結構說明**:

```typescript
interface ExteriorListData {
	id: number;
	code: string; // 類別代碼
	name: string; // 類別名稱
}

interface ExteriorCategoriesResponse {
	success: boolean;
	data: ExteriorListData[];
	message?: string;
}
```

---

### 2.3 獲取公開課程列表

**端點**: `GET /api/training/exterior/courses`

**描述**: 獲取所有公開課程資料

**查詢參數** (選填):

- `code`: 按類別代碼篩選,例如 `TC-R`
- `year`: 按年份篩選,例如 `2025`

**請求範例**:

```
GET /api/training/exterior/courses
GET /api/training/exterior/courses?code=TC-R
GET /api/training/exterior/courses?year=2025
GET /api/training/exterior/courses?code=TC-R&year=2025
```

**響應格式**:

```json
{
	"success": true,
	"data": [
		{
			"id": 1,
			"code": "TC-R",
			"title": "115年零售業教育訓練需求調查表",
			"loction": "台中",
			"startAt": "115/01/01",
			"endAt": "115/01/01",
			"trainingHours": "依課程而定",
			"fee": "依課程而定",
			"filePath": "http://www.chunlee.com.tw/..."
		},
		{
			"id": 2,
			"code": "TC-R",
			"title": "多店式或連鎖店店長與幹部培訓班(第七期)",
			"loction": "台中",
			"startAt": "114/10/01",
			"endAt": "114/10/01",
			"trainingHours": "36",
			"fee": 11500,
			"filePath": "http://www.chunlee.com.tw/..."
		}
	]
}
```

**數據結構說明**:

```typescript
interface ExteriorCourseItem {
	id: number;
	code: string; // 課程類別代碼 (對應 ExteriorListData 的 code)
	title: string; // 課程標題
	loction: string; // 課程地點
	startAt: string; // 開始日期 (格式: YYY/MM/DD)
	endAt: string; // 結束日期 (格式: YYY/MM/DD)
	trainingHours: string; // 訓練時數
	fee: string | number; // 費用 (可能是數字或文字如"依課程而定")
	filePath: string; // 課程詳情連結
}

interface ExteriorCoursesResponse {
	success: boolean;
	data: ExteriorCourseItem[];
	message?: string;
}
```

**錯誤響應**:

```json
{
	"success": false,
	"message": "獲取課程資料失敗",
	"error": "錯誤詳情"
}
```

---

## 3. 聯絡我們 API

### 3.1 獲取圖片驗證碼

**端點**: `GET /api/contact/captcha`

**描述**: 獲取圖片驗證碼

**請求參數**: 無

**響應格式**:

```json
{
	"success": true,
	"data": {
		"captchaImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
		"captchaToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
	}
}
```

**數據結構**:

```typescript
interface CaptchaResponse {
	success: boolean;
	data: {
		captchaImage: string; // Base64 編碼的圖片資料 (data URL 格式)
		captchaToken: string; // 驗證碼 token，提交表單時需要傳送
	};
	message?: string;
}
```

**說明**:

- `captchaImage`: Base64 編碼的 PNG 圖片，可直接用於 `<img>` 標籤的 `src` 屬性
- `captchaToken`: 後端生成的加密 token，用於驗證使用者輸入的驗證碼，前端無需解析
- 圖片尺寸建議: 120x40 像素
- 驗證碼有效期: 5 分鐘

### 2.2 提交聯絡表單

**端點**: `POST /api/contact/submit`

**描述**: 提交聯絡表單資料，並驗證圖片驗證碼

**請求格式**:

```json
{
	"name": "張三",
	"email": "example@email.com",
	"message": "我想了解更多關於企業輔導的資訊...",
	"captchaCode": "1234",
	"captchaToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**請求數據結構**:

```typescript
interface ContactFormRequest {
	name: string; // 姓名 (必填，最少2個字元)
	email: string; // Email (必填，需符合 email 格式)
	message: string; // 訊息內容 (必填，最少10個字元)
	captchaCode: string; // 使用者輸入的驗證碼數字 (必填，4位數字)
	captchaToken: string; // 從 GET /api/contact/captcha 獲取的 token (必填)
}
```

**驗證規則**:

- `name`: 必填，最少 2 個字元
- `email`: 必填，需符合標準 email 格式 (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- `message`: 必填，最少 10 個字元
- `captchaCode`: 必填，4 位數字
- `captchaToken`: 必填，需與後端驗證碼 token 匹配且未過期

**成功響應**:

```json
{
	"success": true,
	"message": "表單已成功提交",
	"data": {
		"id": "contact_123456",
		"submittedAt": "2025-11-10T10:30:00Z"
	}
}
```

**錯誤響應**:

```json
{
	"success": false,
	"message": "表單提交失敗",
	"errors": {
		"name": "姓名至少需要2個字元",
		"email": "請輸入有效的Email格式",
		"captchaCode": "驗證碼錯誤",
		"captchaToken": "驗證碼已過期，請重新整理"
	}
}
```

**錯誤代碼說明**:

- `captchaCode`: 驗證碼數字不正確
- `captchaToken`: token 無效或已過期
- `name`: 姓名格式錯誤
- `email`: Email 格式錯誤
- `message`: 訊息內容格式錯誤

---

## 3. 企業輔導 API

### 3.1 獲取輔導服務列表

**端點**: `GET /api/business-function/services`

**描述**: 獲取所有企業輔導服務項目

**請求參數**: 無

**響應格式**:

```json
{
	"success": true,
	"data": [
		{
			"id": 1,
			"type": "diagnosis",
			"title": "經營體系診斷",
			"itemList": ["製造診斷", "批發診斷", "零售診斷", "服務診斷", "海外診斷"]
		},
		{
			"id": 2,
			"type": "counseling",
			"title": "策略體系輔導",
			"itemList": ["願景管理", "策略管理", "年度計劃", "部門績效", "企業文化"]
		}
	]
}
```

**數據結構說明**:

```typescript
interface BusinessFunctionItem {
	id: number; // 服務項目 ID (建議新增)
	type: string; // 服務類型 ("diagnosis" | "counseling" | "project" | "professional")
	title: string; // 服務標題
	itemList: string[]; // 服務內容列表
}

interface BusinessFunctionResponse {
	success: boolean;
	data: BusinessFunctionItem[];
	message?: string; // 錯誤時的訊息
}
```

**服務類型說明**:

- `diagnosis`: 診斷類服務
- `counseling`: 輔導類服務
- `project`: 專案類服務
- `professional`: 專業類服務

### 3.2 獲取特定類型服務

**端點**: `GET /api/business-function/services/:type`

**描述**: 根據類型獲取特定企業輔導服務

**請求參數**:

- `type`: 服務類型 (diagnosis | counseling | project | professional)

**範例**: `GET /api/business-function/services/counseling`

**響應格式**:

```json
{
	"success": true,
	"data": [
		{
			"id": 2,
			"type": "counseling",
			"title": "策略體系輔導",
			"itemList": ["願景管理", "策略管理", "年度計劃", "部門績效", "企業文化"]
		},
		{
			"id": 3,
			"type": "counseling",
			"title": "組織管理輔導",
			"itemList": ["組織規劃", "單位職掌", "個人工作", "經營會議", "權限劃分"]
		}
	]
}
```

**錯誤響應**:

```json
{
	"success": false,
	"message": "無效的服務類型",
	"error": "Type 'invalid_type' not found"
}
```

---

## 通用規範

### HTTP 狀態碼

- `200 OK`: 請求成功
- `201 Created`: 資源創建成功 (適用於 POST 請求)
- `400 Bad Request`: 請求參數錯誤或驗證失敗
- `404 Not Found`: 資源不存在
- `500 Internal Server Error`: 伺服器內部錯誤

### 錯誤響應格式

所有 API 的錯誤響應應遵循以下格式：

```json
{
	"success": false,
	"message": "錯誤描述",
	"error": "詳細錯誤訊息 (可選)",
	"errors": {
		"field1": "field1 的錯誤訊息",
		"field2": "field2 的錯誤訊息"
	}
}
```

### Headers

**請求 Headers**:

```
Content-Type: application/json
Accept: application/json
```

**響應 Headers**:

```
Content-Type: application/json; charset=utf-8
```

---

## TypeScript 類型定義匯總

以下是所有 API 的完整 TypeScript 類型定義，可直接使用於前端專案：

```typescript
// ==================== 內部訓練 ====================
export interface Course {
	id: number;
	title: string;
	content: string[];
}

export interface InteriorData {
	courseId: string;
	courseName: string;
	courseList: Course[];
}

export interface TrainingCoursesResponse {
	success: boolean;
	data: InteriorData[];
	message?: string;
}

// ==================== 公開課程 ====================
export interface ExteriorListData {
	id: number;
	code: string; // 類別代碼
	name: string; // 類別名稱
}

export interface ExteriorCourseItem {
	id: number;
	code: string; // 課程類別代碼 (對應 ExteriorListData 的 code)
	title: string; // 課程標題
	loction: string; // 課程地點
	startAt: string; // 開始日期 (格式: YYY/MM/DD)
	endAt: string; // 結束日期 (格式: YYY/MM/DD)
	trainingHours: string; // 訓練時數
	fee: string | number; // 費用 (可能是數字或文字如"依課程而定")
	filePath: string; // 課程詳情連結
}

export interface ExteriorCategoriesResponse {
	success: boolean;
	data: ExteriorListData[];
	message?: string;
}

export interface ExteriorCoursesResponse {
	success: boolean;
	data: ExteriorCourseItem[];
	message?: string;
}

// ==================== 聯絡我們 ====================
export interface CaptchaResponse {
	success: boolean;
	data: {
		captchaImage: string; // Base64 編碼的圖片 (data URL)
		captchaToken: string; // 驗證用 token
	};
	message?: string;
}

export interface ContactFormRequest {
	name: string;
	email: string;
	message: string;
	captchaCode: string; // 使用者輸入的驗證碼數字
	captchaToken: string; // 從 captcha API 獲取的 token
}

export interface ContactFormResponse {
	success: boolean;
	message: string;
	data?: {
		id: string;
		submittedAt: string;
	};
	errors?: {
		[key: string]: string;
	};
}

// ==================== 企業輔導 ====================
export interface BusinessFunctionItem {
	id: number;
	type: "diagnosis" | "counseling" | "project" | "professional";
	title: string;
	itemList: string[];
}

export interface BusinessFunctionResponse {
	success: boolean;
	data: BusinessFunctionItem[];
	message?: string;
}

// ==================== 通用 ====================
export interface ApiError {
	success: false;
	message: string;
	error?: string;
	errors?: {
		[key: string]: string;
	};
}
```

---

## 測試範例

### 1. 測試獲取課程列表

```bash
curl -X GET http://localhost:3000/api/training/courses \
  -H "Content-Type: application/json"
```

### 2. 測試獲取圖片驗證碼

```bash
curl -X GET http://localhost:3000/api/contact/captcha \
  -H "Content-Type: application/json"
```

### 3. 測試提交聯絡表單

```bash
curl -X POST http://localhost:3000/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "張三",
    "email": "test@example.com",
    "message": "這是測試訊息，至少需要10個字元。",
    "captchaCode": "1234",
    "captchaToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }'
```

### 4. 測試獲取企業輔導服務

```bash
curl -X GET http://localhost:3000/api/business-function/services \
  -H "Content-Type: application/json"
```

---

## 備註

1. **日期格式**: 所有日期時間使用 ISO 8601 格式 (例: `2025-11-10T10:30:00Z`)
2. **字符編碼**: 統一使用 UTF-8
3. **圖片驗證碼**:
   - 圖片格式: PNG
   - 圖片尺寸: 建議 120x40 像素
   - 驗證碼長度: 4 位數字
   - 有效期限: 10 分鐘
   - 每次獲取驗證碼都會生成新的 token
   - Base64 編碼格式: `data:image/png;base64,{base64_string}`
4. **驗證流程**:
   - 前端載入頁面時呼叫 `GET /api/contact/captcha` 獲取圖片和 token
   - 使用者填寫表單並輸入看到的驗證碼數字
   - 提交表單時將 `captchaCode` 和 `captchaToken` 一起傳送給後端
   - 後端驗證 token 有效性和驗證碼是否正確
   - 若驗證碼錯誤或過期，前端需重新獲取新的驗證碼
5. **分頁**: 如果資料量大，建議在未來版本加入分頁功能
6. **快取**: GET 請求建議加入適當的快取策略（驗證碼 API 除外）
7. **CORS**: 確保後端正確設定 CORS 政策

---

**文檔版本**: 1.0.0  
**最後更新**: 2025-11-10  
**維護者**: Frontend Team
