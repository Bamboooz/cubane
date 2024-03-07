import React from "react";
import { open } from "@tauri-apps/api/shell";

interface HelpMenuComponent {
    icon: React.ReactElement;
    title: string;
    description: string;
    url: string;
}

const HelpMenuComponent: React.FC<HelpMenuComponent> = ({ icon, title, description, url }) => {
    return (
        <>
            <div className="w-full flex p-6 gap-6 items-start justify-between">
                <div className="flex items-center justify-center gap-6">
                    {React.cloneElement(icon, { className: "text-neutral-300 text-[86px] lg:text-[32px]" })}

                    <div className="flex flex-col items-start justify-start">
                        <p className="text-neutral-300 text-[12px]">{title}</p>
                        <p className="text-neutral-400 text-[12px]">{description}</p>
                    </div>
                </div>

                <div className="flex h-full items-center justify-center">
                    <button onClick={() => open(url)} className="h-8 w-20 flex items-center justify-center text-neutral-400 bg-border rounded-md transition-colors-fast hover:bg-accent-2 hover:text-neutral-300">
                        <p className="text-[14px]">Visit</p>
                    </button>
                </div>
            </div>
        </>
    );
};

export default HelpMenuComponent;
