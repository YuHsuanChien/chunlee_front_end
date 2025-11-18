interface LoadingProps {
	size?: "sm" | "md" | "lg";
	text?: string;
	fullScreen?: boolean;
	variant?: "spinner" | "dots" | "pulse";
}

export const Loading = ({
	size = "md",
	text,
	fullScreen = false,
	variant = "spinner",
}: LoadingProps) => {
	const sizes = {
		sm: "h-6 w-6",
		md: "h-12 w-12",
		lg: "h-16 w-16",
	};

	const textSizes = {
		sm: "text-sm",
		md: "text-base",
		lg: "text-lg",
	};

	const containerClass = fullScreen
		? "fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50"
		: "flex items-center justify-center p-4";

	// 旋轉器載入動畫
	const SpinnerLoader = () => (
		<div
			className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizes[size]}`}></div>
	);

	// 點點載入動畫
	const DotsLoader = () => (
		<div className='flex space-x-2'>
			<div
				className={`${
					size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4"
				} bg-blue-600 rounded-full animate-bounce`}
				style={{ animationDelay: "0ms" }}></div>
			<div
				className={`${
					size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4"
				} bg-blue-600 rounded-full animate-bounce`}
				style={{ animationDelay: "150ms" }}></div>
			<div
				className={`${
					size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4"
				} bg-blue-600 rounded-full animate-bounce`}
				style={{ animationDelay: "300ms" }}></div>
		</div>
	);

	// 脈衝載入動畫
	const PulseLoader = () => (
		<div
			className={`${sizes[size]} bg-blue-600 rounded-full animate-pulse`}></div>
	);

	const getLoader = () => {
		switch (variant) {
			case "dots":
				return <DotsLoader />;
			case "pulse":
				return <PulseLoader />;
			default:
				return <SpinnerLoader />;
		}
	};

	return (
		<div className={containerClass}>
			<div className='flex flex-col items-center space-y-3 sm:space-y-4'>
				{getLoader()}
				{text && (
					<p className={`text-gray-600 ${textSizes[size]} text-center`}>
						{text}
					</p>
				)}
			</div>
		</div>
	);
};
