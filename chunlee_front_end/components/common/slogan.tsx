interface PageSloganProps {
	title: string;
	description: string;
}

export const Slogan = ({ title, description }: PageSloganProps) => {
	return (
		<section className='mx-auto w-full py-12 md:py-20 lg:py-24 '>
			<div className='max-w-7xl mx-auto px-6 md:px-12 text-base md:text-lg flex flex-col justify-center items-center gap-8 md:gap-10 text-center'>
				<h2
					className='text-2xl md:text-3xl lg:text-4xl font-medium 
	flex flex-col items-center gap-4
	after:content-[""] after:w-16 after:h-1 after:bg-[#10243d]'>
					{title}
				</h2>
				<p className='text-base md:text-lg'>
					{description}
				</p>
			</div>
		</section>
	);
};
