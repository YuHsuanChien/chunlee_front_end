export const Loading = () => {
	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm'>
			<div className='flex flex-col items-center gap-4'>
				{/* Spinner */}
				<div className='relative w-16 h-16'>
					{/* 外圈 */}
					<div className='absolute inset-0 border-4 border-gray-200 rounded-full'></div>
					{/* 旋轉圈 */}
					<div className='absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin'></div>
				</div>

				{/* Loading 文字 */}
				<div className='flex items-center gap-1'>
					<span className='text-lg font-medium text-gray-700'>載入中</span>
					<span className='text-lg font-medium text-gray-700 animate-pulse'>
						.
					</span>
					<span className='text-lg font-medium text-gray-700 animate-pulse delay-100'>
						.
					</span>
					<span className='text-lg font-medium text-gray-700 animate-pulse delay-200'>
						.
					</span>
				</div>
			</div>
		</div>
	);
};
