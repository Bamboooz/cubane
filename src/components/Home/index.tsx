import React from "react";
import { appWindow } from "@tauri-apps/api/window";

import { useAppState } from "../../state/appState";
import { createFile, getFile } from "../../utils/fs";
import icon from "../../assets/icon.png";

const Home: React.FC = () => {
    const files = useAppState((state) => state.files);
    const updateFileList = useAppState((state) => state.updateFileList);

    const newFile = () => {
        // find the next free Untiled {number} file name for creation
        const nextFreeUntiledNumber = files.map(obj => getFile(obj.path).name).filter(str => /^Untiled \d+$/.test(str)).map(str => parseInt(str.split(' ')[1])).sort((a, b) => a - b).reduce((acc, number) => (number > acc ? acc : number + 1), 1);

        createFile(`Untiled ${nextFreeUntiledNumber}.md`)
            .then((_) => {
                updateFileList();
            })
            .catch((err) => {
                console.error(`Failed to create file: Untiled ${nextFreeUntiledNumber}.md, error: ${err}.`); 
            })
    };

    return (
        <>
            <div className="h-full w-full flex flex-col items-center justify-center gap-6">
                <div className="flex flex-col items-center justify-center gap-2">
                    <img src={icon} className="w-12 h-12 rounded-sm" alt="logo" />
                    <h1 className="text-slate-200 text-[22px]">No file is open</h1>
                </div>

                <div className="flex flex-col items-center justify-center gap-1">
                    <p onClick={newFile} className="text-slate-400 text-[16px] cursor-pointer underline-offset-2 hover:underline hover:active:text-slate-300">Create new file (Ctrl + N)</p>
                    <p onClick={() => appWindow.close()} className="text-slate-400 text-[16px] cursor-pointer underline-offset-2 hover:text-red-500 hover:underline hover:active:text-red-400">Close</p>
                </div>
            </div>
        </>
    );
};

export default Home;
