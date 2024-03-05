import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

import { getFileList, FileList } from "../utils/fs";
import { SortType } from "../utils/sort";

interface AppState {
    openedFile: string;
    setOpenedFile: (filePath: string) => void;
    files: FileList;
    updateFileList: () => void;
    sideBarSort: SortType;
    setSideBarSort: (sortType: SortType) => void;
}

// TODO: Make app state persistent across windows / reloads

const appStateStore = createStore<AppState>()((set) => ({
    openedFile: "",
    setOpenedFile: (filePath: string) => set((state: AppState) => ({ openedFile: filePath })),
    files: [] as FileList,
    updateFileList: async () => {
        try {
            const updatedFiles = await getFileList();
            set({ files: updatedFiles });
        } catch (error) {
            console.error(error);
        }
    },
    sideBarSort: SortType.AZ,
    setSideBarSort: (sortType: SortType) => set((state: AppState) => ({ sideBarSort: sortType })),
}));

function useAppState(): AppState
function useAppState<T>(selector: (state: AppState) => T): T
function useAppState<T>(selector?: (state: AppState) => T) {
    return useStore(appStateStore, selector!);
}

export { useAppState };
