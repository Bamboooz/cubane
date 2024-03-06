import React, { useState } from "react";

import { cn } from "../../utils/tw";
import { getFile, getFileIcon } from "../../utils/fs";
import { useAppState } from "../../state/appState";
import FileContext from "./FileContext";

interface FileNodeProps {
    filePath: string;
}

const initialContextMenu = {
    show: false,
    x: 0,
    y: 0,
}

const FileNode: React.FC<FileNodeProps> = ({ filePath }) => {
    const [contextMenu, setContextMenu] = useState(initialContextMenu);
    const openedFile = useAppState((state) => state.openedFile);
    const setOpenedFile = useAppState((state) => state.setOpenedFile);

    const className = cn("w-full h-6 flex shrink-0 pl-12 pr-4 py-4 items-center justify-start rounded-md gap-2", openedFile === filePath ? "bg-node" : "bg-transparent hover:bg-node hover:bg-opacity-50");

    const selectFile = () => {
        setOpenedFile(filePath);
    };

    const handleContextMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const {pageX, pageY} = e;
        setContextMenu({ show: true, x: pageX, y: pageY });
    };

    const contextMenuClose = () => setContextMenu(initialContextMenu);

    return (
        <>
            <button onContextMenu={(e) => handleContextMenu(e)} onClick={selectFile} className={className}>
                {React.cloneElement(getFileIcon(filePath), { className: "text-neutral-300 text-[18px]" })}
                <p className="text-[12px] text-neutral-300">{getFile(filePath).name}</p>

                {contextMenu.show &&
                    <FileContext x={contextMenu.x} y={contextMenu.y} closeContextMenu={contextMenuClose} filePath={filePath} />
                }
            </button>
        </>
    );
};

export default FileNode;
