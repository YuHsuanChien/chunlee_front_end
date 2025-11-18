"use client";

import { ReactNode, useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: ReactNode;
	size?: "sm" | "md" | "lg" | "xl" | "full";
	showCloseButton?: boolean;
	closeOnOverlayClick?: boolean;
}

export const Modal = ({
	isOpen,
	onClose,
	title,
	children,
	size = "md",
	showCloseButton = true,
	closeOnOverlayClick = true,
}: ModalProps) => {
	// 防止背景滾動
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	// ESC 鍵關閉
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isOpen) {
				onClose();
			}
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const sizes = {
		sm: "max-w-sm",
		md: "max-w-md",
		lg: "max-w-lg",
		xl: "max-w-xl",
		full: "max-w-full mx-4",
	};

	const handleOverlayClick = () => {
		if (closeOnOverlayClick) {
			onClose();
		}
	};

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8'
			onClick={handleOverlayClick}>
			{/* 遮罩層 */}
			<div className='fixed inset-0 bg-black bg-opacity-50 transition-opacity'></div>

			{/* Modal 內容 */}
			<div
				className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full ${sizes[size]} max-h-[90vh] overflow-y-auto transform transition-all`}
				onClick={(e) => e.stopPropagation()}>
				{/* Header */}
				{(title || showCloseButton) && (
					<div className='flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700'>
						{title && (
							<h3 className='text-lg sm:text-xl font-semibold text-gray-900 dark:text-white'>
								{title}
							</h3>
						)}
						{showCloseButton && (
							<button
								onClick={onClose}
								className='text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700'
								aria-label='關閉'>
								<IoClose className='w-6 h-6' />
							</button>
						)}
					</div>
				)}

				{/* Body */}
				<div className='p-4 sm:p-6'>{children}</div>
			</div>
		</div>
	);
};
