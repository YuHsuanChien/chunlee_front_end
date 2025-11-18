import { FormHTMLAttributes, ReactNode } from "react";

interface FormWrapperProps extends FormHTMLAttributes<HTMLFormElement> {
	children: ReactNode;
	title?: string;
	description?: string;
	footer?: ReactNode;
}

export const FormWrapper = ({
	children,
	title,
	description,
	footer,
	className = "",
	...props
}: FormWrapperProps) => {
	return (
		<div className='w-full'>
			<form
				className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}
				{...props}>
				{/* Form Header */}
				{(title || description) && (
					<div className='px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700'>
						{title && (
							<h3 className='text-lg sm:text-xl font-semibold text-gray-900 dark:text-white'>
								{title}
							</h3>
						)}
						{description && (
							<p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
								{description}
							</p>
						)}
					</div>
				)}

				{/* Form Body */}
				<div className='px-4 py-5 sm:p-6 space-y-4 sm:space-y-6'>
					{children}
				</div>

				{/* Form Footer */}
				{footer && (
					<div className='px-4 py-4 sm:px-6 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 rounded-b-lg flex flex-col sm:flex-row justify-end gap-3 sm:gap-2'>
						{footer}
					</div>
				)}
			</form>
		</div>
	);
};
