import React, { useRef } from "react";
import { open } from "@tauri-apps/api/shell";
import { LuBookOpen } from "react-icons/lu";

import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { cn } from "../../utils/tw";
import icon from "../../assets/icon.png";

interface HelpMenuProps {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const HelpMenu: React.FC<HelpMenuProps> = ({ openModal, setOpenModal }) => {
    const helpMenuRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(helpMenuRef, () => setOpenModal(false));

    return (
        <>
            <div className={cn("w-screen h-screen absolute top-0 left-0 z-40 bg-primary bg-opacity-50", openModal ? "flex items-center justify-center" : "hidden")}>
                <div ref={helpMenuRef} className="relative flex flex-col items-center justify-start gap-2 bg-sidebar h-[80vh] w-[40vw] z-50 shadow-2xl rounded-md border-solid border-[1px] border-border">
                    <div className="w-full flex flex-col gap-2 p-6 items-center justify-center">
                        <img src={icon} className="w-16 h-16 rounded-sm" alt="logo" />
                        <h1 className="text-neutral-300 text-[24px] font-semibold">cubane</h1>
                        <p className="text-neutral-400 text-[12px]">Version 0.0.1</p>
                    </div>

                    <div className="w-full h-[1px] bg-border" />

                    <div className="w-full flex gap-4 p-6 items-start justify-start">
                        <LuBookOpen className="text-neutral-300 text-[32px]" />

                        <div className="flex flex-col items-start justify-start">
                            <p className="text-neutral-300 text-[12px]">Official help site</p>
                            <p className="text-neutral-400 text-[12px]">Read the official help documentation of cubane, available in multiple languages.</p>
                        </div>

                        <div className="flex items-center justify-center">
                            {/* put help page link here */}
                            <button onClick={() => open("")} className="h-8 w-20 flex items-center justify-center gap-2 text-neutral-400 bg-border rounded-md transition-colors-fast hover:bg-accent-2 hover:active:bg-accent-2 hover:text-neutral-300">
                                <p className="text-[14px]">Visit</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export { HelpMenu };
