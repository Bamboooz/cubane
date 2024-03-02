import React, { useEffect } from "react";
import { FiFilePlus, FiTrash2 } from "react-icons/fi";
import { IoRefresh } from "react-icons/io5";

import { createFile, deleteFile, getFile } from "../../utils/fs";
import FileNode from "../FileNode";
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
            <div className="h-full flex flex-col items-center justify-start w-[230px] bg-sidebar border-solid border-b-[1px] border-r-[1px] border-border pt-4 o gap-4">
                <div className="flex w-full items-center justify-between px-4 ">
                    <button onClick={newFile} className="bg-transparent flex items-center justify-center border-solid border-[1px] border-border py-1 px-2 rounded-lg transition-colors hover:shadow-xl hover:bg-zinc-700">
                        <FiFilePlus className="text-neutral-300 text-[18px]" />
                    </button>

                    <button onClick={removeFile} className="bg-transparent flex items-center justify-center border-solid border-[1px] border-border py-1 px-2 rounded-lg transition-colors hover:shadow-xl hover:bg-zinc-700">
                        <FiTrash2 className="text-neutral-300 text-[18px]" />
                    </button>
                </div>

                <div className="w-full h-full flex flex-col items-center justify-start overflow-auto px-2 ">
                    {files.map((file, index) => (
                        <FileNode key={index} filePath={file.path} />
                    ))}
                </div>

                <div className="px-2 py-1 flex items-center justify-center w-full">
                    <button onClick={updateFileList} className="w-full h-8 flex items-center justify-center gap-1 rounded-lg bg bg-transparent transition-colors hover:bg-node hover:bg-opacity-50">
                        <IoRefresh className="text-neutral-300 text-[16px]" />
                        <p className="text-neutral-300 text-[12px]">Refresh</p>
                    </button>
                </div>
            </div>
        </>
    );
};

export default SideBar;
