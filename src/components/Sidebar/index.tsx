import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LuFolder } from "react-icons/lu";

import FileNode from "../File";
import { useAppState } from "../../state/appState";
import { getFile } from "../../utils/fs";
import { cn } from "../../utils/tw";

interface FileNodeListProps {
    name: string;
    targetExtension: string;
}

const FileNodeList: React.FC<FileNodeListProps> = ({ name, targetExtension }) => {
    const [nodeListOpened, setNodeListOpened] = useState<boolean>(true);
    const files = useAppState((state) => state.files);
    const targetFiles = files.filter((file) => getFile(file.path).extension === targetExtension);

    return (
        <>
            <div className="flex flex-col w-full items-center justify-start">
                <button onClick={() => setNodeListOpened(!nodeListOpened)} className="flex w-full h-8 px-4 rounded-md items-center justify-start gap-2 hover:bg-node hover:bg-opacity-50">
                    <IoIosArrowDown className={cn("text-neutral-300 text-[16px] transition-all duration-800", nodeListOpened ? "" : "-rotate-90")} />
                    <p className="text-neutral-300 text-[14px] font-normal">{name}</p>

                    <div className="bg-node rounded-md px-1 flex items-center justify-center">
                        <p className="text-neutral-300 text-[12px]">{targetFiles.length}</p>
                    </div>
                </button>

                <div className={cn("w-full transition-all overflow-hidden ease-in-out duration-800", nodeListOpened ? "max-h-screen mb-4" : "max-h-0 mb-0")}>
                    {targetFiles.map((file, index) => (
                        <FileNode key={index} filePath={file.path} />
                    ))}
                </div>
            </div>
        </>
    );
};

const SideBar: React.FC = () => {
    const updateFileList = useAppState((state) => state.updateFileList);

    // update file list once on load
    useEffect(() => {
        updateFileList();
    }, []);

    return (
        <>
            <div className="h-full flex flex-col items-start justify-start w-[230px] bg-sidebar border-solid border-b-[1px] border-r-[1px] border-border pt-2 gap-2">
                <div className="text-neutral-300 flex items-center justify-center ml-6 my-2 gap-2">
                    <LuFolder className="text-[16px] mt-[1px]" />
                    <p className="text-neutral-300 text-[14px] font-semibold">cubane</p>
                </div>

                <div className="w-full h-[1px] bg-border" />

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
