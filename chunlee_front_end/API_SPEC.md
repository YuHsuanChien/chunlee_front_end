# API 規格文檔

本文檔定義了前端所需的 API 端點及其數據格式。

## 目錄

1. [內部訓練 API](#1-內部訓練-api)
2. [聯絡我們 API](#2-聯絡我們-api)
3. [企業輔導 API](#3-企業輔導-api)

---

## 1. 內部訓練 API

### 1.1 獲取課程列表

**端點**: `GET /api/training/courses`

**描述**: 獲取所有內部訓練課程資料

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

---

## 2. 聯絡我們 API

### 2.1 獲取圖片驗證碼

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

export interface CourseCategory {
	courseId: string;
	courseName: string;
	courseList: Course[];
}

export interface TrainingCoursesResponse {
	success: boolean;
	data: CourseCategory[];
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
