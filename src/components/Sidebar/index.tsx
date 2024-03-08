import React, { useEffect } from "react";
import { LuFolder } from "react-icons/lu";
import { useAppState } from "../../state/appState";

import { invoke } from "@tauri-apps/api/tauri";
import FileNodeList from "./FileNodeList";

const SideBar: React.FC = () => {
    const updateFileList = useAppState((state) => state.updateFileList);

    // update file list once on load
    useEffect(() => {
        updateFileList();
    }, []);

    async function openFolderInExplorer() {
        const folderPath = await invoke("cubane_path", {});
        await invoke("open_in_explorer", { filePath: folderPath });
    };

    return (
        <>
            <div className="h-full flex flex-col items-start justify-start bg-sidebar border-solid border-b-[1px] border-r-[1px] border-border gap-2">
                <button onClick={openFolderInExplorer} className="w-full text-neutral-300 flex items-center justify-start pl-6 py-4 gap-2 border-solid border-b-[1px] border-border">
                    <LuFolder className="text-[16px] mt-[1px]" />
                    <p className="text-neutral-300 text-[14px] font-semibold">cubane</p>
                </button>

                <div className="w-full h-full flex flex-col items-center justify-start overflow-auto px-2">
                    <FileNodeList name="Notes" targetExtension="md" />
                    <FileNodeList name="Schedules" targetExtension="schedule" />
                    <FileNodeList name="Boards" targetExtension="kanban" />
                    <FileNodeList name="Memories" targetExtension="memo" />
                </div>
            </div>
        </>
    );
};

export default SideBar;
