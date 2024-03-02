import React, { useEffect } from "react";
import { FiFilePlus, FiTrash2 } from "react-icons/fi";
import { IoRefresh } from "react-icons/io5";

import { createFile, deleteFile, getFile } from "../../utils/fs";
import FileNode from "../File";
import { useAppState } from "../../state/appState";

const SideBar: React.FC = () => {
    const files = useAppState((state) => state.files);
    const updateFileList = useAppState((state) => state.updateFileList);
    const openedFile = useAppState((state) => state.openedFile);
    const setOpenedFile = useAppState((state) => state.setOpenedFile);

    // load files on app load and then do it only when user refreshes
    useEffect(() => {
        updateFileList();
    }, []);

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
            <div className="h-full flex flex-col items-center justify-start w-[230px] bg-sidebar border-solid border-b-[1px] border-r-[1px] border-border pt-2 gap-2">
                <div className="flex w-full items-center justify-center px-4 gap-2">
                    <button title="Create file" onClick={newFile} className="bg-transparent flex items-center justify-center p-1 rounded-lg transition-colors hover:bg-zinc-700">
                        <FiFilePlus className="text-neutral-300 text-[18px]" />
                    </button>

                    <button title="Delete file" onClick={removeFile} className="bg-transparent flex items-center justify-center p-1 rounded-lg transition-colors hover:bg-zinc-700">
                        <FiTrash2 className="text-neutral-300 text-[18px]" />
                    </button>

                    <button title="Update file list" onClick={updateFileList} className="bg-transparent flex items-center justify-center p-1 rounded-lg transition-colors hover:bg-zinc-700">
                        <IoRefresh className="text-neutral-300 text-[18px]" />
                    </button>
                </div>

                <div className="w-full h-full flex flex-col items-center justify-start overflow-auto px-2 ">
                    {files.map((file, index) => (
                        <FileNode key={index} filePath={file.path} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default SideBar;
