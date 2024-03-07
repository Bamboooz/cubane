import React, { useEffect, useState } from "react";
import { register, unregister } from "@tauri-apps/api/globalShortcut";
import { LuArrowDownUp, LuCornerDownLeft } from "react-icons/lu";

import Modal from "../common/Modal";
import CommandNode from "./CommandNode";
import { cn } from "../../utils/tw";

interface CommandPaletteProps {
    commandPaletteModalOpened: boolean;
    setCommandPaletteModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ commandPaletteModalOpened, setCommandPaletteModalOpened }) => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        const registerPaletteOpen = async () => {
            await unregister("CommandOrControl+K");

            await register("CommandOrControl+K", () => {
                setCommandPaletteModalOpened(true);
            });
        };

        registerPaletteOpen();
    }, []);

    const commands: { [name: string]: string[] } = {
        "New note": ["CommandOrControl", "Shift", "N"],
        "New schedule": ["CommandOrControl", "Shift", "H"],
        "New kanban board": ["CommandOrControl", "Shift", "K"],
        "New memory": ["CommandOrControl", "Shift", "M"],
    };

    const displayedCommands = Object.keys(commands).filter(key => key.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return (
        <>
            <Modal modalOpened={commandPaletteModalOpened} setModalOpened={setCommandPaletteModalOpened} className="flex flex-col items-center justify-start overflow-auto w-[70vw] max-h-[70vh] lg:w-[60vw] xl:w-[45vw]">
                <div className="w-full h-12 px-4 py-1 flex items-center justify-center">
                    <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Select a command..." type="text" className="w-full h-full text-[14px] text-neutral-300 bg-transparent outline-none" />
                </div>
                
                <div className="w-full h-[1px] bg-border" />

                <div className={cn("h-full w-full min-h-[20vh] flex flex-col items-center p-2", displayedCommands.length > 0 ? "justify-start" : "justify-center")}>
                    {displayedCommands.length > 0
                        ? displayedCommands.map((name, index) => (
                            <CommandNode key={index} name={name} triggerKeys={commands[name]} />
                        ))
                        : <p className="text-[16px] text-neutral-400">No commands found.</p>
                    }
                </div>

                <div className="w-full h-[1px] bg-border" />

                <div className="w-full p-[6px] flex items-center justify-center gap-4">
                    <div className="flex items-center justify-center gap-1">
                        <LuArrowDownUp className="text-neutral-400 text-[12px] mt-[2px]" />
                        <p className="text-neutral-400 text-[12px]">to navigate</p>
                    </div>

                    <div className="flex items-center justify-center gap-1">
                        <LuCornerDownLeft className="text-neutral-400 text-[12px] mt-[2px]" />
                        <p className="text-neutral-400 text-[12px]">to use</p>
                    </div>

                    <div className="flex items-center justify-center gap-1 ">
                        <p className="text-[12px] text-neutral-400 font-semibold">esc</p>
                        <p className="text-neutral-400 text-[12px]">to dismiss</p>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export { CommandPalette };
