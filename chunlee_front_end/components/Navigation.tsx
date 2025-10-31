import HeaderBar from "./HeaderBar";
import SideBar from "./SideBar";

const Navigation = () => {
	return (
		<>
			{/* Desktop Header Bar - 電腦版時顯示 */}
			<HeaderBar />

			{/* Mobile/Tablet Sidebar - 手機和平板時顯示 */}
			<SideBar />
		</>
	);
};

export default Navigation;
