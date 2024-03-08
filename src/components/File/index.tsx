import React, { useEffect, useRef, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { BsMarkdown } from "react-icons/bs";
import { LuCalendarDays, LuLightbulb } from "react-icons/lu";
import { MdOutlineViewKanban } from "react-icons/md";

import { cn } from "../../utils/tw";
import { getFile } from "../../utils/fs";
import { useAppState } from "../../state/appState";
import FileContext from "./FileContext";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

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
    const [editing, setEditing] = useState<boolean>(false);
    const [editingText, setEditingText] = useState<string>(getFile(filePath).name);

    const fileNodeRef = useRef<HTMLDivElement>(null);
    const inputEditorRef = useRef<HTMLInputElement>(null);

    useOnClickOutside(fileNodeRef, () => {
        setEditing(false);
        setEditingText(getFile(filePath).name);
    });

    const openedFile = useAppState((state) => state.openedFile);
    const setOpenedFile = useAppState((state) => state.setOpenedFile);
    const updateFileList = useAppState((state) => state.updateFileList);

    const fileIcon = getFile(filePath).extension === "md"
        ? <BsMarkdown />
        : getFile(filePath).extension === "schedule"
        ? <LuCalendarDays />
        : getFile(filePath).extension === "kanban"
        ? <MdOutlineViewKanban />
        : <LuLightbulb />;

    const selectFile = () => {
        setOpenedFile(filePath);
    };

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();

        const {pageX, pageY} = e;
        setContextMenu({ show: true, x: pageX, y: pageY });
    };

    const contextMenuClose = () => setContextMenu(initialContextMenu);

    const renameFile = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (editingText === getFile(filePath).name) {
            // optimize
            setEditing(false);
            return;
        }

        invoke("rename_file", { filePath: filePath, newName: editingText })
            .then(() => {
                updateFileList();
                setEditing(false);
                setEditingText(getFile(filePath).name);
            })
            .catch((err) => {
                console.error(err); 
            });
    };

    useEffect(() => {
        if (editing) {
            inputEditorRef.current?.focus();
        }
    }, [editing]);

    return (
        <>

            {!editing
                ? <div ref={fileNodeRef} onContextMenu={(e) => handleContextMenu(e)} onClick={selectFile} className={cn("w-full h-6 flex shrink-0 pl-12 pr-4 py-4 items-center border-solid border-[1px] border-transparent justify-start rounded-md gap-2", openedFile === filePath ? "bg-node" : "bg-transparent hover:bg-node hover:bg-opacity-50")}>
                    {React.cloneElement(fileIcon, { className: "text-neutral-300 text-[18px]" })}
                    <p className="text-[12px] text-neutral-300">{getFile(filePath).name}</p>

                    {contextMenu.show &&
                        <FileContext x={contextMenu.x} y={contextMenu.y} setEditing={setEditing} closeContextMenu={contextMenuClose} filePath={filePath} />
                    }
                </div>
                : <div ref={fileNodeRef} className="w-full h-6 flex shrink-0 pl-12 pr-4 py-4 items-center justify-start rounded-md gap-2 bg-node bg-opacity-50 border-solid border-[1px] border-accent">
                    {React.cloneElement(fileIcon, { className: "text-neutral-300 text-[18px]" })}
                    <form onSubmit={(e) => renameFile(e)} className="flex items-center justify-center h-full">
                        <input ref={inputEditorRef} onFocus={(e) => e.target.select()} type="text" value={editingText} onChange={(e) => setEditingText(e.target.value)} className="text-[12px] text-neutral-300 bg-transparent outline-none" />
                    </form>

                    {contextMenu.show &&
                        <FileContext x={contextMenu.x} y={contextMenu.y} setEditing={setEditing} closeContextMenu={contextMenuClose} filePath={filePath} />
                    }
                </div>
            }
        </>
    );
};

export default FileNode;
