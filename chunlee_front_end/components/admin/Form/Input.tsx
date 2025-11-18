import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	helperText?: string;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	fullWidth?: boolean;
}

export const Input = ({
	label,
	error,
	helperText,
	leftIcon,
	rightIcon,
	fullWidth = true,
	className = "",
	...props
}: InputProps) => {
	const baseInputStyles =
		"px-4 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-white";

	const errorStyles = error
		? "border-red-500 focus:ring-red-500"
		: "border-gray-300 dark:border-gray-600 focus:border-blue-500";

	const widthClass = fullWidth ? "w-full" : "";

	return (
		<div className={`${widthClass} ${className}`}>
			{/* Label */}
			{label && (
				<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
					{label}
					{props.required && <span className='text-red-500 ml-1'>*</span>}
				</label>
			)}

			{/* Input Container */}
			<div className='relative'>
				{/* Left Icon */}
				{leftIcon && (
					<div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500'>
						{leftIcon}
					</div>
				)}

				{/* Input Field */}
				<input
					className={`${baseInputStyles} ${errorStyles} ${widthClass} ${
						leftIcon ? "pl-10" : ""
					} ${rightIcon ? "pr-10" : ""}`}
					{...props}
				/>

				{/* Right Icon */}
				{rightIcon && (
					<div className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500'>
						{rightIcon}
					</div>
				)}
			</div>

			{/* Error Message */}
			{error && <p className='mt-1 text-sm text-red-500'>{error}</p>}

			{/* Helper Text */}
			{helperText && !error && (
				<p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
					{helperText}
				</p>
			)}
		</div>
	);
};
