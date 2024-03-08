import React from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { LuCopy, LuPencil, LuTrash2 } from "react-icons/lu";

import { useAppState } from "../../state/appState";
import Context from "../common/Context";

interface FileContextProps {
    x: number;
    y: number;
    setEditing: React.Dispatch<React.SetStateAction<boolean>>;
    closeContextMenu: () => void;
    filePath: string;
}

const FileContext: React.FC<FileContextProps> = ({ x, y, setEditing, closeContextMenu, filePath }) => {
    const updateFileList = useAppState((state) => state.updateFileList);
    const setOpenedFile = useAppState((state) => state.setOpenedFile);

    const copyFile = () => {
        closeContextMenu();
    };

    const renameFile = () => {
        closeContextMenu();
        setEditing(true);
    };

    const removeFile = () => {
        closeContextMenu();

        invoke("delete_file", { filePath: filePath })
            .then(() => {
                setOpenedFile("");
                updateFileList();
            })
            .catch((err) => {
               console.error(err); 
            });
    };

    return (
        <>
            <Context x={x} y={y} closeContextMenu={closeContextMenu} className="w-56 bg-sidebar shadow-2xl rounded-md border-solid border-[1px] border-border">
                <div className="flex flex-col items-center justify-center p-1">
                    <button onClick={copyFile} className="w-full h-8 flex items-center justify-start gap-2 px-4 rounded-md transition-colors-fast hover:bg-header">
                        <LuCopy className="text-[14px] text-neutral-300" />
                        <p className="text-neutral-300 text-[12px]">Make a copy</p>
                    </button>

                    <button onClick={renameFile} className="w-full h-8 flex items-center justify-start gap-2 px-4 rounded-md transition-colors-fast hover:bg-header">
                        <LuPencil className="text-[14px] text-neutral-300" />
                        <p className="text-neutral-300 text-[12px]">Rename</p>
                    </button>
                </div>

                <div className="h-[1px] w-full bg-border" />

                <div className="flex flex-col items-center justify-center p-1">
                    <button onClick={removeFile} className="w-full h-8 flex items-center justify-start gap-2 px-4 rounded-md transition-colors-fast hover:bg-header">
                        <LuTrash2 className="text-[14px] text-red-500" />
                        <p className="text-red-500 text-[12px]">Delete</p>
                    </button>
                </div>
            </Context>
        </>
    );
};

export default FileContext;
