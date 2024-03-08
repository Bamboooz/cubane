import React from "react";

import { cn } from "../../utils/tw";

interface SettingsMenuButtonProps {
    name: string;
    pageId: number;
    pageSelected: number;
    setPageSelected: React.Dispatch<React.SetStateAction<number>>
}

const SettingsMenuButton: React.FC<SettingsMenuButtonProps> = ({ name, pageId, pageSelected, setPageSelected }) => {
    return (
        <>
            <button title={name} onClick={() => setPageSelected(pageId)} className={cn("w-full flex items-center justify-start px-3 py-1 rounded-md", pageSelected === pageId ? "bg-accent shadow-2xl" : "transition-colors-fast hover:bg-node hover:bg-opacity-50")}>
                <p className={cn("text-[14px]", pageSelected === pageId ? "text-neutral-200" : "text-neutral-300")}>{name}</p>
            </button>
        </>
    );
};

export default SettingsMenuButton;
