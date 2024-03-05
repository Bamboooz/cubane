import React, { useState } from "react";
import { LuSend, LuImage, LuLink } from "react-icons/lu";

import { useAppState } from "../../state/appState";
import { getFile, createFile } from "../../utils/fs";
import Memory from "./memory";

const Memories: React.FC = () => {
    const [newNoteText, setNewNoteText] = useState<string>("");
    const files = useAppState((state) => state.files);
    const updateFileList = useAppState((state) => state.updateFileList);
    const targetFiles = files.filter((file) => getFile(file.path).extension === "memo");

    const addMemory = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nextFreeUntiledNumber = files.map(obj => getFile(obj.path).name).filter(str => /^Untiled \d+$/.test(str)).map(str => parseInt(str.split(' ')[1])).sort((a, b) => a - b).reduce((acc, number) => (number > acc ? acc : number + 1), 1);
        const fileName = `Untiled ${nextFreeUntiledNumber}.memo`;

        if (newNoteText !== "") {
            createFile(fileName, newNoteText)
                .then(() => {
                    console.log("Successfully created a new memory.");
                    updateFileList();
                    setNewNoteText("");
                })
                .catch((err) => {
                    console.error(`Failed to create a new memory: ${err}.`);
                });
        }
    };

    return (
        <>
            <div className="flex w-full h-full flex-col items-center justify-start p-8 gap-8 overflow-auto">
                <form onSubmit={(e) => addMemory(e)} className="flex w-full flex-col items-start justify-center bg-sidebar rounded-md border-solid border-[1px] border-border">
                    <div className="flex flex-col items-start justify-center w-full p-4 gap-4">
                        <textarea value={newNoteText} onChange={(e) => setNewNoteText(e.target.value)} placeholder="Any thoughts..." className="w-full resize-none bg-transparent outline-none text-neutral-300" />

                        <div className="flex items-center justify-center gap-2">
                            <button className="flex items-center justify-center p-1 rounded-md transition-colors-fast hover:bg-header">
                                <LuImage className="text-neutral-400 text-[20px]" />
                            </button>

                            <button className="flex items-center justify-center p-1 rounded-md transition-colors-fast hover:bg-header">
                                <LuLink className="text-neutral-400 text-[20px]" />
                            </button>
                        </div>
                    </div>

                    <div className="w-full h-[1px] bg-border" />

                    <div className="w-full flex items-center justify-end p-4">
                        <button className="h-8 w-20 flex items-center justify-center gap-2 bg-border text-neutral-400 rounded-md transition-colors-fast hover:bg-accent-2 hover:active:bg-accent-2 hover:text-neutral-300">
                            <p>Save</p>
                            <LuSend className="text-[14px]" />
                        </button>
                    </div>
                </form>

                {targetFiles.map((file, index) => (
                    <Memory key={index} filePath={file.path} />
                ))}
            </div>
        </>
    );
};

export default Memories;