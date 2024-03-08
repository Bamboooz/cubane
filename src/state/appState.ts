import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { invoke } from "@tauri-apps/api/tauri";

import { FileList } from "../utils/fs";
import { SortType } from "../utils/sort";

enum ProductState {
    VERSION = "0.0.1",
    INSTALLER_VERSION = "0.0.1",
}

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
            const updatedFiles = await invoke("read_directory", {});
            set({ files: updatedFiles  as FileList });
        } catch (error) {
            console.error(error);
            set({ files: [] as FileList });
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

export { useAppState, ProductState };
