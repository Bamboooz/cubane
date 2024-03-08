import React from "react";
import { appWindow } from "@tauri-apps/api/window";
import { VscChromeMinimize, VscChromeMaximize, VscChromeClose } from "react-icons/vsc";

import icon from "../../assets/icon_nobg.png";

const SplashHeader: React.FC = () => {
    return (
        <>
            <header data-tauri-drag-region className="relative shrink-0 w-full z-40 pl-2 shadow-sm flex items-center justify-between h-10 bg-header border-solid border-b-[1px] border-r-[1px] border-border">
                <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center z-20">
                        <img src={icon} className="w-6 h-6 rounded-sm" alt="logo" />
                    </div>
                </div>

                <div data-tauri-drag-region className="absolute w-full flex items-center justify-center">
                    <p data-tauri-drag-region className="text-neutral-300 text-[12px]">cubane</p>
                </div>

                <div className="flex h-full z-20">
                    <button title="Minimize" onClick={() => appWindow.minimize()} className="flex items-center justify-center h-full w-12 z-20 bg-transparent transition-colors-fast hover:bg-zinc-600">
                        <VscChromeMinimize className="text-neutral-300 text-[14px]" />
                    </button>

                    <button title="Maximize" onClick={() => appWindow.maximize()} className="flex items-center justify-center h-full w-12 z-20 bg-transparent transition-colors-fast hover:bg-zinc-600">
                        <VscChromeMaximize className="text-neutral-300 text-[14px]" />
                    </button>

                    <button title="Close" onClick={() => appWindow.close()} className="flex items-center justify-center h-full w-12 z-20 bg-transparent transition-colors-fast hover:bg-red-500">
                        <VscChromeClose className="text-neutral-300 text-[14px]" />
                    </button>
                </div>
            </header>
        </>
    );
};

export default SplashHeader;
