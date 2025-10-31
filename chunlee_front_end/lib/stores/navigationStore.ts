import { create } from "zustand";

interface NavigationState {
	// Sidebar 狀態
	isSidebarOpen: boolean;
	openSubmenus: string[];
	isTranslatedHeader: boolean;

	// Actions
	toggleSidebar: () => void;
	closeSidebar: () => void;
	toggleSubmenu: (label: string) => void;
	closeAllSubmenus: () => void;
	translateHeader: (hidden: boolean) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
	// 初始狀態
	isSidebarOpen: false,
	openSubmenus: [],
	isTranslatedHeader: false,

	// Actions
	toggleSidebar: () =>
		set((state) => ({
			isSidebarOpen: !state.isSidebarOpen,
		})),

	closeSidebar: () =>
		set(() => ({
			isSidebarOpen: false,
			openSubmenus: [], // 關閉 sidebar 時也清空子選單
		})),

	toggleSubmenu: (label: string) =>
		set((state) => ({
			openSubmenus: state.openSubmenus.includes(label)
				? state.openSubmenus.filter((item) => item !== label)
				: [...state.openSubmenus, label],
		})),

	closeAllSubmenus: () =>
		set(() => ({
			openSubmenus: [],
		})),

	translateHeader: (hidden: boolean) =>
		set(() => ({
			isTranslatedHeader: hidden,
		})),
}));
