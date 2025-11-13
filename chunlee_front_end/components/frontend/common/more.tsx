interface MoreProps {
	title: string;
	description?: string;
	link: string;
}

export const More = ({ title, description, link }: MoreProps) => {
	return (
		<section className='max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10 py-12 md:py-20 lg:py-24 border-t-[1.5px] border-gray-300'>
			<div className='text-center md:text-left'>
				<h2 className='text-2xl md:text-3xl font-bold mb-4'>{title}</h2>
				<p className='text-base md:text-lg text-gray-700 leading-relaxed'>
					{description}
				</p>
			</div>
			<a
				href={link}
				title='了解更多'
				className='group relative px-8 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:from-gray-100 hover:to-gray-200 hover:border-gray-400 hover:text-gray-900 transition-all duration-300 ease-in-out whitespace-nowrap shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0'>
				<span className='relative z-10'>了解更多</span>
				<div className='absolute inset-0 bg-gradient-to-r from-gray-300/15 to-gray-400/15 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
			</a>
		</section>
	);
};
