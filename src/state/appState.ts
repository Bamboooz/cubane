import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

interface AppState {
    openedFile: string;
    setOpenedFile: (filePath: string) => void;
}

const appStateStore = createStore<AppState>()((set) => ({
    openedFile: "",
    setOpenedFile: (filePath: string) => set((state: AppState) => ({ openedFile: filePath })),
}));

function useAppState(): AppState
function useAppState<T>(selector: (state: AppState) => T): T
function useAppState<T>(selector?: (state: AppState) => T) {
    return useStore(appStateStore, selector!);
}

export { useAppState };
