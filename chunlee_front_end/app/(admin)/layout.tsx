import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "群力管理顧問公司-後台管理系統",
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
				<main className='lg:pt-0 pt-0'>{children}</main>
			</body>
		</html>
	);
}
