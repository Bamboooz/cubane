import React from "react";

import { useAppState } from "../../state/appState";
import { createFile, getFile } from "../../utils/fs";
import icon from "../../assets/icon.png";

interface HomeCommandButtonProps {
    name: string;
    trigger: string;
    onClick: () => void;
}

const HomeCommandButton: React.FC<HomeCommandButtonProps> = ({ name, trigger, onClick }) => {
    return (
        <>
            <button onClick={onClick} className="flex items-center justify-center gap-2 text-neutral-500 text-[16px] hover:text-neutral-400 hover:active:text-neutral-300">
                <p>{name}</p>
            
                <div className="flex items-center justify-center gap-1">
                    <div className="bg-node rounded-md mt-1 px-1 text-[12px] flex items-center justify-center">
                        <p>Ctrl</p>
                    </div>

                    <p>+</p>

                    <div className="bg-node rounded-md mt-1 px-1 text-[12px] flex items-center justify-center">
                        <p>{trigger}</p>
                    </div>
                </div>
            </button>
        </>
    );
};

const Home: React.FC = () => {
    const files = useAppState((state) => state.files);
    const updateFileList = useAppState((state) => state.updateFileList);

    const newFile = (extension: string) => {
        // find the next free Untiled {number} file name for creation
        const nextFreeUntiledNumber = files.map(obj => getFile(obj.path).name).filter(str => /^Untiled \d+$/.test(str)).map(str => parseInt(str.split(' ')[1])).sort((a, b) => a - b).reduce((acc, number) => (number > acc ? acc : number + 1), 1);
        const fileName = `Untiled ${nextFreeUntiledNumber}.${extension}`;

        createFile(fileName)
            .then((_) => {
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
