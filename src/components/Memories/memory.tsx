import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { LuMoreVertical, LuLightbulb } from "react-icons/lu";

import { useAppState } from "../../state/appState";
import MemoryContext from "./MemoryContext";

interface MemoryProps {
    filePath: string;
}

const initialContextMenu = {
    show: false,
    x: 0,
    y: 0,
}

const Memory: React.FC<MemoryProps> = ({ filePath }) => {
    const updateFileList = useAppState((state) => state.updateFileList);
    const [contextMenu, setContextMenu] = useState(initialContextMenu);
    const [modifiedDate, setModifiedDate] = useState<string>("");
    const [text, setText] = useState<string>("");

    useEffect(() => {
        invoke("read_file", { filePath: filePath })
            .then((value) => {
                setText(value as string);
                updateFileList();
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);
    
    const handleContextMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const {pageX, pageY} = e;
        setContextMenu({ show: true, x: pageX, y: pageY });
    };

    const contextMenuClose = () => setContextMenu(initialContextMenu);

    invoke("last_updated", { filePath: filePath, includeFormatting: true })
        .then((date) => {
            setModifiedDate(date as string);
        })
        .catch((err) => {
            console.error(err);
        })

    return (
        <>
            <div className="flex w-full flex-col items-start justify-center break-words px-2 py-3 gap-2 bg-sidebar rounded-md border-solid border-[1px] border-border">
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center justify-center ml-2 gap-1">
                        <LuLightbulb className="text-[12px] text-neutral-400" />
                        <p className="text-[12px] text-neutral-400">{modifiedDate}</p>
                    </div>
                    
                    <button onClick={handleContextMenu} className="p-1 rounded-md transition-colors-fast hover:bg-header">
                        <LuMoreVertical className="text-neutral-300 text-[18px]" />
                    </button>
                </div>

                <p className="text-[14px] text-neutral-300 ml-2">{text}</p>

                {contextMenu.show &&
                    <MemoryContext x={contextMenu.x} y={contextMenu.y} closeContextMenu={contextMenuClose} filePath={filePath} />
                }
            </div>
        </>
    );
};

export default Memory;
