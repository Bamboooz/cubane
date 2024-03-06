import React from "react";
import { open } from "@tauri-apps/api/shell";

const GeneralSettingsMenu: React.FC = () => {
    return (
        <>
            <div className="h-full w-full flex flex-col items-start justify-start p-6 gap-4">
                <p className="text-neutral-300 text-[16px]">App</p>

                <div className="w-full h-[1px] bg-border" />

                <div className="flex flex-col items-start justify-start w-full">
                    <p className="text-neutral-300 text-[14px]">Current version: v0.0.1</p>
                    <p className="text-neutral-400 text-[13px]">Installer version: v0.0.1</p>
                    <p className="text-neutral-400 text-[13px]">cubane is up to date!</p>
                    <p onClick={() => open("https://github.com/Bamboooz/cubane/releases/latest")} className="text-accent-2 cursor-pointer text-[13px] hover:underline hover:underline-offset-2">Read the changelog.</p>
                </div>

                <div className="w-full h-[1px] bg-border" />

                <div className="flex flex-col items-start justify-start w-full">
                    <p className="text-neutral-300 text-[14px]">Automatic Updates</p>
                    <p className="text-neutral-400 text-[13px]">Turn this off to prevent the app from checking for updates.</p>
                </div>
            </div>
        </>
    );
};

export default GeneralSettingsMenu;
