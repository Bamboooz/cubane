import React from "react";
import { LuBookOpen, LuBug, LuGithub } from "react-icons/lu";

import icon from "../../assets/icon.png";
import HelpMenuComponent from "./HelpMenuComponent";
import { ProductState } from "../../state/appState";
import Modal from "../common/Modal";

interface HelpMenuProps {
    helpModalOpened: boolean;
    setHelpModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const HelpMenu: React.FC<HelpMenuProps> = ({ helpModalOpened, setHelpModalOpened }) => {
    return (
        <>
            <Modal modalOpened={helpModalOpened} setModalOpened={setHelpModalOpened} className="flex flex-col items-center justify-start overflow-auto gap-2 h-[80vh] w-[40vw]">
                <div className="w-full flex flex-col gap-2 p-10 items-center justify-center">
                    <img src={icon} className="w-16 h-16 rounded-sm" alt="logo" />
                    <h1 className="text-neutral-300 text-[24px] font-semibold">cubane</h1>
                    <p className="text-neutral-400 text-[12px]">{`Version ${ProductState.VERSION}`}</p>
                </div>

                <HelpMenuComponent icon={<LuGithub />} title="Official repository" description="Visit official cubane GitHub repository, to find changes, updates, and maybe even contribute!" url="https://github.com/Bamboooz/cubane" />
                <HelpMenuComponent icon={<LuBookOpen />} title="Official help site" description="Read the official help documentation of cubane, available in multiple languages." url="" />
                <HelpMenuComponent icon={<LuBug />} title="Report bugs" description="Inform the developers of cubanes about errors, issues or your suggestions." url="https://github.com/Bamboooz/cubane/issues" />
            </Modal>
        </>
    );
};

export { HelpMenu };
