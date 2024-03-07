import React from "react";
import { LuArrowDownUp, LuCornerDownLeft } from "react-icons/lu";

import Modal from "../common/Modal";

interface CommandPaletteProps {
    commandPaletteModalOpened: boolean;
    setCommandPaletteModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ commandPaletteModalOpened, setCommandPaletteModalOpened }) => {
    return (
        <>
            <Modal modalOpened={commandPaletteModalOpened} setModalOpened={setCommandPaletteModalOpened} className="flex flex-col items-center justify-start overflow-auto h-[70vh] w-[70vw] lg:w-[60vw] xl:w-[45vw]">
                <form onSubmit={(e) => e.preventDefault()} className="w-full h-12 px-4 py-1 flex items-center justify-center">
                    <input placeholder="Select a command..." type="text" className="w-full h-full text-[14px] text-neutral-300 bg-transparent outline-none" />
                </form>
                
                <div className="w-full h-[1px] bg-border" />

                <div className="h-full w-full">

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
