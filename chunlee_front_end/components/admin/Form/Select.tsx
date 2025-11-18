import { SelectHTMLAttributes, ReactNode } from "react";

interface SelectOption {
	value: string | number;
	label: string;
	disabled?: boolean;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	error?: string;
	helperText?: string;
	options: SelectOption[];
	placeholder?: string;
	fullWidth?: boolean;
	icon?: ReactNode;
}

export const Select = ({
	label,
	error,
	helperText,
	options,
	placeholder = "請選擇...",
	fullWidth = true,
	icon,
	className = "",
	...props
}: SelectProps) => {
	const baseSelectStyles =
		"px-4 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed appearance-none bg-white dark:bg-gray-700 dark:text-white cursor-pointer";

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

			{/* Select Container */}
			<div className='relative'>
				{/* Left Icon */}
				{icon && (
					<div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none'>
						{icon}
					</div>
				)}

				{/* Select Field */}
				<select
					className={`${baseSelectStyles} ${errorStyles} ${widthClass} ${
						icon ? "pl-10" : ""
					} pr-10`}
					{...props}>
					{placeholder && (
						<option value='' disabled>
							{placeholder}
						</option>
					)}
					{options.map((option) => (
						<option
							key={option.value}
							value={option.value}
							disabled={option.disabled}>
							{option.label}
						</option>
					))}
				</select>

				{/* Dropdown Arrow */}
				<div className='absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none'>
					<svg
						className='w-5 h-5 text-gray-400 dark:text-gray-500'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M19 9l-7 7-7-7'
						/>
					</svg>
				</div>
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
