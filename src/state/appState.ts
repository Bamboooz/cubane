import { defaultAppState } from "../const/state";

type AppState = { openedFile: string };

const setAppState = (key: string, value: any) => {
    localStorage.setItem(key, value);
};

const getAppState = (key: string) => {
    const item = localStorage.getItem(key);
    return item ? item : defaultAppState[key as keyof AppState];
};

export type { AppState };
export { getAppState, setAppState };
