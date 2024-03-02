import React from "react";

import { cn } from "../../utils/tw";
import { getFile, getFileIcon } from "../../utils/fs";
import { useAppState } from "../../state/appState";

interface FileNodeProps {
    filePath: string;
}

const FileNode: React.FC<FileNodeProps> = ({ filePath }) => {
    const openedFile = useAppState((state) => state.openedFile);
    const setOpenedFile = useAppState((state) => state.setOpenedFile);

    const className = cn("w-full h-6 flex shrink-0 p-4 items-center justify-start rounded-lg gap-2", openedFile === filePath ? "bg-node" : "bg-transparent hover:bg-node hover:bg-opacity-50");

    const selectFile = () => {
        setOpenedFile(filePath);
    };

    return (
        <>
            <button onClick={selectFile} className={className}>
                {React.cloneElement(getFileIcon(filePath), { className: "text-neutral-300 text-[20px]" })}
                <p className="text-[12px] text-neutral-300">{getFile(filePath).name}</p>
            </button>
        </>
    );
};

export default FileNode;
