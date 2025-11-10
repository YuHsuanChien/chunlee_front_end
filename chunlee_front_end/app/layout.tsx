import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation, Footer } from "../components";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title:
		"綜合管理顧問公司：轉虧為盈･企業轉型･管理升級－群力顧問公司（管理顧問全力協助企業管理）",
	description:
		"群力管理顧問，是合性企管顧問與管理顧問，為全國最具綜合性企管顧問公司。群力企管顧問/管理顧問，我們的管理顧問服務項目包含公開的教育訓練、企業包班地內訓課程與企業管理實務輔導，為企業提供策略與管理最佳的方案。群力企管顧問，聘請管理顧問界名師彭信良先生掌舵出任企管顧問公司總經理，群力企管顧問/管理顧問帶領製造業、批發業、物流業、零售業及服務業之輔導企管顧問公司。",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='zh-TW'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Navigation />
				<main className='lg:pt-0 pt-0'>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
