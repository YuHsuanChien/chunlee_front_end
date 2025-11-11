import Image from "next/image";

export const Intro = () => {
	return (
		<div className='max-w-[1600px] mx-auto w-full pb-12 md:pb-14 lg:pb-18 grid grid-cols-1 md:grid-cols-2 gap-6 px-2 md:px-4'>
			<div className='w-full'>
				<h2 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-6'>
					群力顧問公司
				</h2>
				<p className='mb-4'>
					本公司聘請管理顧問界名師
					彭信良先生掌舵出任總經理，帶領製造業、批發業、物流業、零售業及服務業之管理顧問，授課經驗在10,000小時以上；輔導經驗在1,000家以上之實力派管理顧問全力服務企業。
				</p>
				<p>
					群力企管顧問公司服務項目包含公開的教育訓練、企業包班內訓課程與企業實務輔導三大項，群力企管顧問公司為國內最具綜合性的企業管理顧問公司，為企業提供策略與管理最佳的方案。
				</p>
			</div>
			<div className='w-full h-[200px] md:h-full relative'>
				<Image
					src='/images/home/logo.png'
					alt='投資亞洲新未來'
					fill
					className='object-contain'
					quality={90}
				/>
			</div>
		</div>
	);
};
