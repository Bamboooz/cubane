import React from "react";
import { LuCopy, LuPencil, LuTrash2 } from "react-icons/lu";

import { deleteFile } from "../../utils/fs";
import { useAppState } from "../../state/appState";
import Context from "../Context";

interface FileContextProps {
    x: number;
    y: number;
    closeContextMenu: () => void;
    filePath: string;
}

const FileContext: React.FC<FileContextProps> = ({ x, y, closeContextMenu, filePath }) => {
    const updateFileList = useAppState((state) => state.updateFileList);
    const setOpenedFile = useAppState((state) => state.setOpenedFile);

    const copyFile = () => {
        closeContextMenu();
    };

    const renameFile = () => {
        closeContextMenu();
    };

    const removeFile = () => {
        closeContextMenu();

        if (filePath !== "") {
            deleteFile(filePath)
                .then(() => {
                    setOpenedFile("");
                    updateFileList();
                })
                .catch((err) => {
                   console.error(`Failed to remove file: ${filePath}, error: ${err}.`); 
                });
        }
    };

    return (
        <>
            <Context
                x={x}
                y={y}
                closeContextMenu={closeContextMenu}
                className="w-56 bg-sidebar shadow-2xl rounded-md border-solid border-[1px] border-border p-1"
            >
                <button onClick={copyFile} className="w-full h-8 flex items-center justify-start gap-2 px-4 rounded-md transition-colors-fast hover:bg-header">
                    <LuCopy className="text-[14px] text-neutral-300" />
                    <p className="text-neutral-300 text-[12px]">Make a copy</p>
                </button>

                <button onClick={renameFile} className="w-full h-8 flex items-center justify-start gap-2 px-4 rounded-md transition-colors-fast hover:bg-header">
                    <LuPencil className="text-[14px] text-neutral-300" />
                    <p className="text-neutral-300 text-[12px]">Rename</p>
                </button>

                <div className="h-[1px] w-full bg-border my-1" />

                <button onClick={removeFile} className="w-full h-8 flex items-center justify-start gap-2 px-4 rounded-md transition-colors-fast hover:bg-header">
                    <LuTrash2 className="text-[14px] text-red-500" />
                    <p className="text-red-500 text-[12px]">Delete</p>
                </button>
            </Context>
        </>
    );
};

export default FileContext;
