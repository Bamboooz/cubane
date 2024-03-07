import React from "react";
import { open } from "@tauri-apps/api/shell";
import { ProductState } from "../../state/appState";
import { HelpMenu } from "../Help";

interface GeneralSettingsMenuProps {
    helpModalOpened: boolean;
    setHelpModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
    setSettingsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const GeneralSettingsMenu: React.FC<GeneralSettingsMenuProps> = ({ helpModalOpened, setHelpModalOpened, setSettingsModalOpened }) => {
    const openHelpModal = () => {
        setSettingsModalOpened(false);
        setHelpModalOpened(true);
    };

    return (
        <>
            <div className="h-full w-full flex flex-col items-start justify-start gap-4 py-6">
                <div className="flex flex-col items-start justify-start w-full px-6">
                    <p className="text-neutral-300 text-[16px]">App</p>
                </div>

                <div className="w-full h-[1px] bg-border" />

                <div className="flex items-center justify-between w-full px-6">
                    <div className="flex flex-col items-start justify-start">
                        <p className="text-neutral-300 text-[14px]">{`Current version: ${ProductState.VERSION}`}</p>
                        <p className="text-neutral-400 text-[13px]">{`Installer version: ${ProductState.INSTALLER_VERSION}`}</p>
                        <p className="text-neutral-400 text-[13px]">cubane is up to date!</p>
                        <p onClick={() => open("https://github.com/Bamboooz/cubane/releases/latest")} className="text-accent-2 cursor-pointer text-[13px] hover:underline hover:underline-offset-2">Read the changelog.</p>
                    </div>

                    <button className="h-8 px-4 flex items-center justify-center text-neutral-300 bg-accent rounded-md transition-colors-fast hover:bg-accent-2">
                        <p className="text-[14px]">Check for updates</p>
                    </button>
                </div>

                <div className="w-full h-[1px] bg-border" />

                <div className="flex flex-col items-start justify-start w-full px-6">
                    <p className="text-neutral-300 text-[14px]">Automatic Updates</p>
                    <p className="text-neutral-400 text-[13px]">Turn this off to prevent the app from checking for updates.</p>
                </div>

                <div className="w-full h-[1px] bg-border" />

                <div className="flex flex-col items-start justify-start w-full px-6">
                    <p className="text-neutral-300 text-[14px]">Language</p>
                    <p className="text-neutral-400 text-[13px]">Change the display language</p>
                </div>

                <div className="w-full h-[1px] bg-border" />

                <div className="flex items-center justify-between w-full px-6">
                    <div className="flex flex-col items-start justify-start w-full">
                        <p className="text-neutral-300 text-[14px]">Help</p>
                        <p className="text-neutral-400 text-[13px]">Learn how to use cubane, report bugs and suggest features.</p>
                    </div>

                    <button onClick={openHelpModal} className="h-8 px-4 flex items-center justify-center text-neutral-300 bg-accent rounded-md transition-colors-fast hover:bg-accent-2">
                        <p className="text-[14px]">Open</p>
                    </button>

                    <HelpMenu helpModalOpened={helpModalOpened} setHelpModalOpened={setHelpModalOpened} />
                </div>
            </div>
        </>
    );
};

export default GeneralSettingsMenu;
