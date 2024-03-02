import React, { useEffect, useState } from "react";
import { appWindow } from "@tauri-apps/api/window";
import { VscChromeMinimize, VscChromeMaximize, VscChromeClose } from "react-icons/vsc";

import { getAppState } from "../../state/appState";
import { getFile } from "../../utils/fs";

import icon from "../../assets/icon.png";

const Header: React.FC = () => {
    const openedFile = getAppState("openedFile");

    const getName = (fileName: string) => {
        return fileName !== "" ? fileName : "Home";
    };

    const [name, setName] = useState<string>(getName(openedFile));

    return (
        <>
            <header data-tauri-drag-region className="w-full pl-4 flex items-center justify-between h-10 bg-sidebar border-solid border-b-[1px] border-border">
                <img src={icon} className="h-[22px] w-[22px] rounded-sm" alt="logo" />
                
                <div className="absolute left-[50%] right-[50%]">
                    <p data-tauri-drag-region className="text-neutral-300 text-[12px]">{getFile(name).name}</p>
                </div>

                <div className="flex h-full">
                    <button title="Minimize" onClick={() => appWindow.minimize()} className="flex items-center justify-center h-full w-12 bg-transparent transition-colors hover:bg-zinc-700">
                        <VscChromeMinimize className="text-neutral-300 text-[14px]" />
                    </button>

                    <button title="Maximize" onClick={() => appWindow.maximize()} className="flex items-center justify-center h-full w-12 bg-transparent transition-colors hover:bg-zinc-700">
                        <VscChromeMaximize className="text-neutral-300 text-[14px]" />
                    </button>

                    <button title="Close" onClick={() => appWindow.close()} className="flex items-center justify-center h-full w-12 bg-transparent transition-colors hover:bg-red-600">
                        <VscChromeClose className="text-neutral-300 text-[14px]" />
                    </button>
                </div>
            </header>
        </>
    );
};

export default Header;
