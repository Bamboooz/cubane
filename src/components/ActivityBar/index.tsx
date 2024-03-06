import React, { useState } from "react";
import { MdOutlineViewKanban } from "react-icons/md";
import { LuFileEdit, LuTrash2, LuRefreshCcw, LuHelpCircle, LuSettings, LuCalendarDays, LuLightbulb, LuTerminal, LuArrowDownAZ, LuArrowDownZA } from "react-icons/lu";

import { createFile, deleteFile, getFile } from "../../utils/fs";
import { useAppState } from "../../state/appState";
import { SortType } from "../../utils/sort";
import { SettingsMenu } from "../Settings";
import ActivityBarButton from "./ActivityBarButton";

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
                <div className="flex flex-col items-center justify-center gap-6 mt-[2px]">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <ActivityBarButton onClick={() => newFile("md")} title="New note" icon={<LuFileEdit />} />
                        <ActivityBarButton onClick={() => newFile("schedule")} title="New schedule" icon={<LuCalendarDays />} />
                        <ActivityBarButton onClick={() => newFile("kanban")} title="New kanban board" icon={<MdOutlineViewKanban />} />
                        <ActivityBarButton onClick={() => setOpenedFile(".memo")} title="New memory" icon={<LuLightbulb />} />
                    </div>

                    <div className="flex flex-col items-center justify-center gap-2">
                        <ActivityBarButton
                            onClick={() => setSideBarSort(sideBarSort ^ SortType.AZ ^ SortType.ZA)}
                            title="Change sorting"
                            icon={sideBarSort === SortType.AZ ? <LuArrowDownAZ /> : <LuArrowDownZA />}
                        />
                        <ActivityBarButton onClick={removeFile} title="Delete file" icon={<LuTrash2 />} />
                        <ActivityBarButton onClick={updateFileList} title="Refresh files" icon={<LuRefreshCcw />} />
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-2">
                    <ActivityBarButton onClick={() => {}} title="Open command palette" icon={<LuTerminal />} />
                    <ActivityBarButton onClick={() => {}} title="Help" icon={<LuHelpCircle />} />
                    <ActivityBarButton onClick={() => setSettingsOpenModal(true)} title="Open settings" icon={<LuSettings />} />
                </div>

                <SettingsMenu openModal={settingsOpenModal} setOpenModal={setSettingsOpenModal} />
            </div> 
        </>
    );
};

export default ActivityBar;
