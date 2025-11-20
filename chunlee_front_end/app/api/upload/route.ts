import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();
		const file = formData.get("file") as File;

		if (!file) {
			return NextResponse.json(
				{ success: false, error: "沒有檔案上傳" },
				{ status: 400 }
			);
		}

		// 驗證檔案類型 (允許 PDF 和 Word)
		const allowedTypes = [
			"application/pdf",
			"application/msword", // .doc
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
		];
		if (!allowedTypes.includes(file.type)) {
			return NextResponse.json(
				{ success: false, error: "只允許上傳 PDF 或 Word 檔案" },
				{ status: 400 }
			);
		}

		// 驗證檔案大小 (最大 10MB)
		const maxSize = 10 * 1024 * 1024; // 10MB
		if (file.size > maxSize) {
			return NextResponse.json(
				{ success: false, error: "檔案大小不能超過 10MB" },
				{ status: 400 }
			);
		}

		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		// 產生唯一檔名
		const timestamp = Date.now();
		const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
		const fileName = `${timestamp}_${originalName}`;

		// 確保 uploads 目錄存在
		const uploadsDir = path.join(process.cwd(), "public", "uploads", "courses");
		try {
			await mkdir(uploadsDir, { recursive: true });
		} catch (error) {
			console.error("建立目錄失敗:", error);
		}

		// 儲存檔案
		const filePath = path.join(uploadsDir, fileName);
		await writeFile(filePath, buffer);

		// 回傳檔案路徑 (相對於 public 目錄)
		const publicPath = `/uploads/courses/${fileName}`;

		return NextResponse.json({
			success: true,
			filePath: publicPath,
			fileName: file.name,
			fileSize: file.size,
		});
	} catch (error) {
		console.error("檔案上傳失敗:", error);
		return NextResponse.json(
			{ success: false, error: "檔案上傳失敗" },
			{ status: 500 }
		);
	}
}
