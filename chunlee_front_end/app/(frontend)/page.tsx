import { Slides, Products, Intro } from "@/components/frontend/home";

export default function Home() {
	return (
		<div className='flex flex-col min-h-screen  items-start justify-center'>
			<Slides />
			<Products />
			<Intro />
		</div>
	);
}
