import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

import { getFileList, FileList } from "../utils/fs";

interface AppState {
    openedFile: string;
    setOpenedFile: (filePath: string) => void;
    files: FileList;
    updateFileList: () => void;
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
}));

function useAppState(): AppState
function useAppState<T>(selector: (state: AppState) => T): T
function useAppState<T>(selector?: (state: AppState) => T) {
    return useStore(appStateStore, selector!);
}

export { useAppState };
