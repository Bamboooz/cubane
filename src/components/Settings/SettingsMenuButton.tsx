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
            <button title={name} onClick={() => setPageSelected(pageId)} className={cn("w-full flex items-center justify-start px-3 py-1 rounded-md", pageSelected === pageId ? "bg-accent-2 text-neutral-200 shadow-2xl" : "text-neutral-300 transition-colors-fast hover:bg-node hover:bg-opacity-50")}>
                <p className="text-[14px]">{name}</p>
            </button>
        </>
    );
};

export default SettingsMenuButton;
