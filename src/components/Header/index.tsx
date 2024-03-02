import React from "react";
import { appWindow } from "@tauri-apps/api/window";
import { VscChromeMinimize, VscChromeMaximize, VscChromeClose } from "react-icons/vsc";

import { getFile } from "../../utils/fs";
import { useAppState } from "../../state/appState";

import icon from "../../assets/icon.png";

const Header: React.FC = () => {
    const openedFile = useAppState((state) => state.openedFile);
    const setOpenedFile = useAppState((state) => state.setOpenedFile);

    const getName = () => {
        const fileName = getFile(openedFile).name;
        return fileName !== "" ? fileName : "Home";
    };

    return (
        <>
            <header data-tauri-drag-region className="relative w-full pl-4 shadow-sm flex items-center justify-between h-10 bg-header border-solid border-b-[1px] border-r-[1px] border-border">
                <div className="flex items-center justify-center z-50">
                    <button onClick={() => setOpenedFile("")} title="Home" className="flex items-center justify-center">
                        <img src={icon} className="w-6 h-6 rounded-sm" alt="logo" />
                    </button>
                </div>

                <div data-tauri-drag-region className="absolute w-full flex items-center justify-center">
                    <p data-tauri-drag-region className="text-neutral-300 text-[12px]">{getName()}</p>
                </div>

                <div className="flex h-full z-50">
                    <button title="Minimize" onClick={() => appWindow.minimize()} className="flex items-center justify-center h-full w-12 bg-transparent transition-colors duration-75 hover:bg-zinc-700">
                        <VscChromeMinimize className="text-neutral-300 text-[14px]" />
                    </button>

                    <button title="Maximize" onClick={() => appWindow.maximize()} className="flex items-center justify-center h-full w-12 bg-transparent transition-colors duration-75 hover:bg-zinc-700">
                        <VscChromeMaximize className="text-neutral-300 text-[14px]" />
                    </button>

                    <button title="Close" onClick={() => appWindow.close()} className="flex items-center justify-center h-full w-12 bg-transparent transition-colors duration-75 hover:bg-red-500">
                        <VscChromeClose className="text-neutral-300 text-[14px]" />
                    </button>
                </div>
            </header>
        </>
    );
};

export default Header;
