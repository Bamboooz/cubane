import React from "react";

import { cn } from "../../utils/tw";
import { getFile, getFileIcon } from "../../utils/fs";
import { getAppState, setAppState } from "../../appState";

interface FileNodeProps {
    name: string;
}

const FileNode: React.FC<FileNodeProps> = ({ name }) => {
    const appState = getAppState();
    const selected = appState.openedFile === name;

    const className = cn("w-full h-6 flex shrink-0 p-4 items-center justify-start rounded-lg gap-2", selected ? "bg-node" : "bg-transparent hover:bg-node hover:bg-opacity-50");

    const selectFile = () => {
        setAppState({ ...appState, openedFile: name });
    };

    return (
        <>
            <button onClick={selectFile} className={className}>
                {React.cloneElement(getFileIcon(name), { className: "text-neutral-300 text-[20px]" })}
                <p className="text-[12px] text-neutral-300">{getFile(name).name}</p>
            </button>
        </>
    );
};

export default FileNode;
