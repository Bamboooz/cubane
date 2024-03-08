import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

import FileNode from "../File";
import { useAppState } from "../../state/appState";
import { SortType } from "../../utils/sort";
import { FileList, getFile } from "../../utils/fs";
import { cn } from "../../utils/tw";
import { invoke } from "@tauri-apps/api/tauri";

interface FileNodeListProps {
    name: string;
    targetExtension: string;
}

const FileNodeList: React.FC<FileNodeListProps> = ({ name, targetExtension }) => {
    const [nodeListOpened, setNodeListOpened] = useState<boolean>(true);
    const files = useAppState((state) => state.files);
    const sideBarSort = useAppState((state) => state.sideBarSort);
    const targetFiles = files.filter((file) => getFile(file).extension === targetExtension);
    
    const [sortedTargetFiles, setSortedTargetFiles] = useState<FileList>([]);

    useEffect(() => {
        const sortFiles = async () => {
            const sortQuery = sideBarSort === SortType.AZ
                ? "sort_files_az"
                : sideBarSort === SortType.ZA
                ? "sort_files_za"
                : sideBarSort === SortType.LAST_UPDATED
                ? "sort_files_last_updated"
                : "sort_files_first_updated";

            invoke(sortQuery, { files: targetFiles })
                .then((sorted) => {
                    setSortedTargetFiles(sorted as FileList);
                })
                .catch((err) => {
                    console.error(err);
                });
        };
    
        sortFiles();
    }, [sideBarSort, files]);

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
                    {sortedTargetFiles.map((file, index) => (
                        <FileNode key={index} filePath={file} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default FileNodeList;
