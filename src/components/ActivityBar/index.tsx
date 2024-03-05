import React, { useState } from "react";
import { MdOutlineViewKanban } from "react-icons/md";
import { LuFileEdit, LuTrash2, LuRefreshCcw, LuHelpCircle, LuSettings, LuCalendarDays, LuLightbulb, LuTerminal, LuArrowDownAZ, LuArrowDownZA } from "react-icons/lu";

import { createFile, deleteFile, getFile } from "../../utils/fs";
import { useAppState } from "../../state/appState";
import { SortType } from "../../utils/sort";
import { SettingsMenu } from "../Settings";

const ActivityBar: React.FC = () => {
    const [settingsOpenModal, setSettingsOpenModal] = useState(false);
    const files = useAppState((state) => state.files);
    const updateFileList = useAppState((state) => state.updateFileList);
    const openedFile = useAppState((state) => state.openedFile);
    const setOpenedFile = useAppState((state) => state.setOpenedFile);
    const sideBarSort = useAppState((state) => state.sideBarSort);
    const setSideBarSort = useAppState((state) => state.setSideBarSort);

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

    const removeFile = () => {
        if (openedFile !== "") {
            deleteFile(openedFile)
                .then(() => {
                    setOpenedFile("");
                    updateFileList();
                })
                .catch((err) => {
                   console.error(`Failed to remove file: ${openedFile}, error: ${err}.`); 
                });
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-between bg-sidebar h-full py-3 w-10 border-solid border-b-[1px] border-r-[1px] border-border">
                <div className="flex flex-col items-center justify-center gap-6">
                    <div className="flex flex-col items-center justify-center gap-2 mt-[2px]">
                        <button onClick={() => newFile("md")} title="New note" className="bg-transparent flex items-center justify-center p-1 rounded-md transition-colors-fast hover:bg-zinc-700">
                            <LuFileEdit className="text-neutral-300 text-[18px]" />
                        </button>

                        <button onClick={() => newFile("schedule")} title="New schedule" className="bg-transparent flex items-center justify-center p-1 rounded-md transition-colors-fast hover:bg-zinc-700">
                            <LuCalendarDays className="text-neutral-300 text-[18px]" />
                        </button>

                        <button onClick={() => newFile("kanban")} title="New kanban board" className="bg-transparent flex items-center justify-center p-1 rounded-md transition-colors-fast hover:bg-zinc-700">
                            <MdOutlineViewKanban className="text-neutral-300 text-[18px]" />
                        </button>

                        <button onClick={() => newFile("memo")} title="New memory" className="bg-transparent flex items-center justify-center p-1 rounded-md transition-colors-fast hover:bg-zinc-700">
                            <LuLightbulb className="text-neutral-300 text-[18px]" />
                        </button>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-2">
                        {/* invert sort type */}
                        <button onClick={() => setSideBarSort(sideBarSort === SortType.AZ ? SortType.ZA : SortType.AZ)} title="Change sorting" className="bg-transparent flex items-center justify-center p-1 rounded-md transition-colors-fast hover:bg-zinc-700">
                            {sideBarSort === SortType.AZ
                                ? <LuArrowDownAZ className="text-neutral-300 text-[18px]" />
                                : <LuArrowDownZA className="text-neutral-300 text-[18px]" />
                            }
                        </button>

                        <button onClick={removeFile} title="Delete file" className="bg-transparent flex items-center justify-center p-1 rounded-md transition-colors-fast hover:bg-zinc-700">
                            <LuTrash2 className="text-neutral-300 text-[18px]" />
                        </button>
        
                        <button onClick={updateFileList} title="Refresh files" className="bg-transparent flex items-center justify-center p-1 rounded-md transition-colors-fast hover:bg-zinc-700">
                            <LuRefreshCcw className="text-neutral-300 text-[18px]" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-2">
                    <button title="Open command palette" className="bg-transparent flex items-center justify-center p-1 rounded-md transition-colors-fast hover:bg-zinc-700">
                        <LuTerminal className="text-neutral-300 text-[18px]" />
                    </button>
                    
                    <button title="Help" className="bg-transparent flex items-center justify-center p-1 rounded-md transition-colors-fast hover:bg-zinc-700">
                        <LuHelpCircle className="text-neutral-300 text-[18px]" />
                    </button>

                    <button onClick={() => setSettingsOpenModal(true)} title="Open settings" className="bg-transparent flex items-center justify-center p-1 rounded-md transition-colors-fast hover:bg-zinc-700">
                        <LuSettings className="text-neutral-300 text-[18px]" />
                    </button>
                </div>

                <SettingsMenu openModal={settingsOpenModal} setOpenModal={setSettingsOpenModal} />
            </div> 
        </>
    );
};

export default ActivityBar;
