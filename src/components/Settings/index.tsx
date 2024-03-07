import React, { useState } from "react";
import { LuSettings } from "react-icons/lu";

import GeneralSettingsMenu from "./GeneralSettingsMenu";
import SettingsMenuButton from "./SettingsMenuButton";
import Modal from "../common/Modal";

interface SettingsMenuProps {
    helpModalOpened: boolean;
    setHelpModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
    settingsModalOpened: boolean;
    setSettingsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ helpModalOpened, setHelpModalOpened, settingsModalOpened, setSettingsModalOpened }) => {
    const [pageSelected, setPageSelected] = useState<number>(0);

    return (
        <>
            <Modal modalOpened={settingsModalOpened} setModalOpened={setSettingsModalOpened} className="flex items-center justify-center h-[80vh] w-[70vw]">
                <div className="h-full flex flex-col items-start p-3 gap-2 justify-start w-[30%] border-solid border-r-[1px] border-border">
                    <div className="flex items-center justify-center gap-2">
                        <LuSettings className="text-neutral-500 text-[14px]" />
                        <p className="text-neutral-500 font-semibold text-[13px] mb-[2px]">Options</p>
                    </div>

                    <SettingsMenuButton name="General" pageId={0} pageSelected={pageSelected} setPageSelected={setPageSelected} />
                    <SettingsMenuButton name="Editor" pageId={1} pageSelected={pageSelected} setPageSelected={setPageSelected} />
                    <SettingsMenuButton name="Appearance" pageId={2} pageSelected={pageSelected} setPageSelected={setPageSelected} />
                    <SettingsMenuButton name="Hotkeys" pageId={3} pageSelected={pageSelected} setPageSelected={setPageSelected} />
                </div>

                <div className="h-full w-[70%]">
                    {pageSelected === 0
                        ? <GeneralSettingsMenu helpModalOpened={helpModalOpened} setHelpModalOpened={setHelpModalOpened} setSettingsModalOpened={setSettingsModalOpened} />
                        : pageSelected === 1
                        ? <></>
                        : pageSelected === 2
                        ? <></>
                        : <></>
                    }
                </div>
            </Modal>
        </>
    );
};

export { SettingsMenu };
