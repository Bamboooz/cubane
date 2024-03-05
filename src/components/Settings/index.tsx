import React, { useRef, useState } from "react";
import { LuPlus } from "react-icons/lu";

import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { cn } from "../../utils/tw";
import GeneralSettingsMenu from "./general";

interface SettingsMenuProps {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

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

const SettingsMenu: React.FC<SettingsMenuProps> = ({ openModal, setOpenModal }) => {
    const [pageSelected, setPageSelected] = useState<number>(0);
    const settingsMenuRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(settingsMenuRef, () => setOpenModal(false));

    return (
        <>
            <div className={cn("w-screen h-screen absolute top-0 left-0 z-40 bg-primary bg-opacity-50", openModal ? "flex items-center justify-center" : "hidden")}>
                <div ref={settingsMenuRef} className="relative flex items-center justify-center bg-sidebar h-[80vh] w-[70vw] z-50 shadow-2xl rounded-md border-solid border-[1px] border-border">
                    <button onClick={() => setOpenModal(false)} title="Close settings" className="absolute top-3 right-3 p-1 rounded-md transition-colors-fast hover:bg-zinc-700">
                        <LuPlus className="text-neutral-300 rotate-45 text-2xl" />
                    </button>

                    <div className="h-full flex flex-col items-start p-3 gap-2 justify-start grow-3 border-solid border-r-[1px] border-border">
                        <p className="text-neutral-500 font-semibold text-[13px] ml-3 mb-1">Options</p>

                        <SettingsMenuButton name="General" pageId={0} pageSelected={pageSelected} setPageSelected={setPageSelected} />
                        <SettingsMenuButton name="Editor" pageId={1} pageSelected={pageSelected} setPageSelected={setPageSelected} />
                        <SettingsMenuButton name="Files and links" pageId={2} pageSelected={pageSelected} setPageSelected={setPageSelected} />
                        <SettingsMenuButton name="Appearance" pageId={3} pageSelected={pageSelected} setPageSelected={setPageSelected} />
                        <SettingsMenuButton name="Hotkeys" pageId={4} pageSelected={pageSelected} setPageSelected={setPageSelected} />
                    </div>

                    <div className="h-full grow-7">
                        {pageSelected === 0
                            ? <GeneralSettingsMenu />
                            : pageSelected === 1
                            ? <GeneralSettingsMenu />
                            : pageSelected === 2
                            ? <GeneralSettingsMenu />
                            : pageSelected === 3
                            ? <GeneralSettingsMenu />
                            : <GeneralSettingsMenu />
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export { SettingsMenu };
