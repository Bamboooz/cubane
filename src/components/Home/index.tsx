import React from "react";
import { invoke } from "@tauri-apps/api/tauri";

import { useAppState } from "../../state/appState";
import { getFile } from "../../utils/fs";
import icon from "../../assets/icon.png";
import HomeCommandButton from "./HomeCommandButton";

const Home: React.FC = () => {
    const files = useAppState((state) => state.files);
    const updateFileList = useAppState((state) => state.updateFileList);

    const newFile = (extension: string) => {
        // find the next free Untiled {number} file name for creation
        const nextFreeUntiledNumber = files.map(obj => getFile(obj).name).filter(str => /^Untiled \d+$/.test(str)).map(str => parseInt(str.split(' ')[1])).sort((a, b) => a - b).reduce((acc, number) => (number > acc ? acc : number + 1), 1);
        const fileName = `Untiled ${nextFreeUntiledNumber}.${extension}`;

        invoke("create_file", { fileName: fileName, initialContent: "" })
            .then(() => {
                updateFileList();
            })
            .catch((err) => {
                console.error(`Failed to create file: ${fileName}, error: ${err}.`); 
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
                    <HomeCommandButton name="New note" trigger="N" onClick={() => newFile("md")} />
                    <HomeCommandButton name="New schedule" trigger="H" onClick={() => newFile("schedule")} />
                    <HomeCommandButton name="New kanban board" trigger="K" onClick={() => newFile("kanban")} />
                    <HomeCommandButton name="New memory" trigger="M" onClick={() => newFile("memo")} />
                </div>
            </div>
        </>
    );
};

export default Home;
