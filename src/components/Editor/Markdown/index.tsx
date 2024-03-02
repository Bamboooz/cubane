import React, { useState, useEffect } from "react";
import { useAutosave } from "react-autosave";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { LuPencil } from "react-icons/lu";

import { writeFile, readFile } from "../../../utils/fs";

interface MarkdownEditorProps {
    openedFile: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ openedFile }) => {
    const [text, setText] = useState<string>("");

    const updateFileContents = () => {
        readFile(openedFile)
            .then((value) => {
                setText(value as string);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    
    useEffect(() => {
        updateFileContents();
    }, [openedFile]);
    
    const updateFile = () => {
        writeFile(openedFile, text)
            .catch((err) => {
                console.error(`Failed to write to a file: ${err}.`);
            });
    };

    useAutosave({ data: text, onSave: updateFile });

    return (
        <>
            <div className="w-full h-full relative">
                <div className="w-full h-12 p-2">
                    <div className="w-full h-full flex items-center justify-start px-2 gap-2 bg-sidebar rounded-sm border-solid border-[1px] border-border">
                        <div className="flex items-center justify-center gap-1">
                            <button className="flex items-center justify-center p-1 rounded-lg transition-colors hover:bg-zinc-700">
                                <IoChevronBackOutline className="text-neutral-300 text-md" />
                            </button>

                            <button className="flex items-center justify-center p-1 rounded-lg transition-colors hover:bg-zinc-700">
                                <IoChevronForwardOutline className="text-neutral-300 text-md" />
                            </button>
                        </div>
                    </div>
                </div>

                <textarea
                    onChange={(e) => setText(e.target.value)}
                    spellCheck={false}
                    value={text}
                    className="bg-transparent resize-none p-4 outline-none w-full h-full text-[14px] text-neutral-300"
                />

                <div className="absolute flex items-center z-50 justify-center px-2 gap-2 bg-sidebar border-solid border-l-[1px] border-t-[1px] border-border right-0 bottom-0 h-6 rounded-tl-lg">
                    <LuPencil className="text-neutral-400 text-[14px]" />
                    <p className="text-neutral-400 text-[12px]">{(text.replaceAll(" ", "").length !== 0 ? text.trim().split(/\s+/).length : 0) + " words"}</p>
                    <p className="text-neutral-400 text-[12px]">{text.length + " characters"}</p>
                </div>
            </div>
        </>
    );
};

export default MarkdownEditor;
