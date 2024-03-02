type AppState = { openedFile: string };

const defaultAppState: AppState = {
    openedFile: "",
};

const loadedState = localStorage.getItem("appState");
let appState = loadedState ? JSON.parse(loadedState) : defaultAppState;

function setAppState(newAppState: AppState) {
    localStorage.setItem("appState", JSON.stringify(newAppState));
    appState = newAppState;
}

function getAppState() {
    return appState;
}

export { getAppState, setAppState };
