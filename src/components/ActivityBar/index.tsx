import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { MdOutlineViewKanban } from "react-icons/md";
import { LuFileEdit, LuTrash2, LuRefreshCcw, LuHelpCircle, LuSettings, LuArrowUp01, LuArrowUp10, LuCalendarDays, LuLightbulb, LuTerminal, LuArrowDownAZ, LuArrowDownZA } from "react-icons/lu";

import { getFile } from "../../utils/fs";
import { useAppState } from "../../state/appState";
import { SortType } from "../../utils/sort";
import { SettingsMenu } from "../Settings";
import ActivityBarButton from "./ActivityBarButton";
import { HelpMenu } from "../Help";
import { CommandPalette } from "../CommandPalette";

const ActivityBar: React.FC = () => {
    const [spinning, setSpinning] = useState<boolean>(false);
    const [helpModalOpened, setHelpModalOpened] = useState<boolean>(false);
    const [settingsModalOpened, setSettingsModalOpened] = useState<boolean>(false);
    const [commandPaletteModalOpened, setCommandPaletteModalOpened] = useState<boolean>(false);

    const files = useAppState((state) => state.files);
    const updateFileList = useAppState((state) => state.updateFileList);
    const openedFile = useAppState((state) => state.openedFile);
    const setOpenedFile = useAppState((state) => state.setOpenedFile);
    const sideBarSort = useAppState((state) => state.sideBarSort);
    const setSideBarSort = useAppState((state) => state.setSideBarSort);

    const newFile = (extension: string) => {
        // find the next free Untiled {number} file name for creation
        const nextFreeUntiledNumber = files.map(obj => getFile(obj).name).filter(str => /^Untiled \d+$/.test(str)).map(str => parseInt(str.split(' ')[1])).sort((a, b) => a - b).reduce((acc, number) => (number > acc ? acc : number + 1), 1);
        const fileName = `Untiled ${nextFreeUntiledNumber}.${extension}`;

        invoke("create_file", { fileName: fileName, initialContent: "" })
            .then(() => {
                updateFileList();
            })
            .catch((err) => {
                console.error(err); 
            })
    };

    const formatIcon = () => {
        switch (sideBarSort) {
            case SortType.AZ:
                return <LuArrowDownAZ />;
            case SortType.ZA:
                return <LuArrowDownZA />;
            case SortType.LAST_UPDATED:
                return <LuArrowUp01 />;
            case SortType.FIRST_UPDATED:
                return <LuArrowUp10 />;
        }
    };

    const formatTitle = () => {
        switch (sideBarSort) {
            case SortType.AZ:
                return "Alphabetical sorting";
            case SortType.ZA:
                return "Reversed alphabetical sorting";
            case SortType.LAST_UPDATED:
                return "Sort by last updated";
            case SortType.FIRST_UPDATED:
                return "Sort by first updated";
        }
    };

    const nextFormat = () => {
        switch (sideBarSort) {
            case SortType.AZ:
                return SortType.ZA;
            case SortType.ZA:
                return SortType.LAST_UPDATED;
            case SortType.LAST_UPDATED:
                return SortType.FIRST_UPDATED;
            case SortType.FIRST_UPDATED:
                return SortType.AZ;
        }
    };

    const removeFile = () => {
        if (openedFile !== "") {
            invoke("delete_file", { filePath: openedFile })
                .then(() => {
                    setOpenedFile("");
                    updateFileList();
                })
                .catch((err) => {
                   console.error(err); 
                });
        }
    };

    const refreshFileList = () => {
        setSpinning(true);

        updateFileList();

        setTimeout(() => {
            setSpinning(false);
        }, 800);
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
                        <ActivityBarButton onClick={removeFile} title="Delete file" icon={<LuTrash2 className="group-hover:text-red-500" />} />
                    </div>

                    <div className="flex flex-col items-center justify-center gap-2">
                        <ActivityBarButton onClick={() => setSideBarSort(nextFormat())} title={formatTitle()} icon={formatIcon()} />
                        <ActivityBarButton onClick={refreshFileList} title="Refresh files" icon={<LuRefreshCcw className={spinning ? "animate-spin-once" : ""} />} />
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-2">
                    <ActivityBarButton onClick={() => setCommandPaletteModalOpened(true)} title="Open command palette" icon={<LuTerminal />} />
                    <ActivityBarButton onClick={() => setHelpModalOpened(true)} title="Help" icon={<LuHelpCircle />} />
                    <ActivityBarButton onClick={() => setSettingsModalOpened(true)} title="Open settings" icon={<LuSettings />} />
                </div>

                <SettingsMenu helpModalOpened={helpModalOpened} setHelpModalOpened={setHelpModalOpened} settingsModalOpened={settingsModalOpened} setSettingsModalOpened={setSettingsModalOpened} />
                <HelpMenu helpModalOpened={helpModalOpened} setHelpModalOpened={setHelpModalOpened} />
                <CommandPalette commandPaletteModalOpened={commandPaletteModalOpened} setCommandPaletteModalOpened={setCommandPaletteModalOpened} />
            </div> 
        </>
    );
};

export default ActivityBar;
