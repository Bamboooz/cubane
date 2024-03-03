import React, { useEffect, useState } from "react";
import Split from "react-split";

import { useAppState } from "./state/appState";
import SideBar from "./components/Sidebar";
import Header from "./components/Header";
import Home from "./components/Home";
import MarkdownEditor from "./components/Markdown";
import { getFile } from "./utils/fs";
import ActivityBar from "./components/ActivityBar";

const App: React.FC = () => {
    const openedFile = useAppState((state) => state.openedFile);

    const getPageFromFile = (file: string) => {
        if (file === "") {
            return <Home />
        } else if (getFile(file).extension == "md") {
            return <MarkdownEditor openedFile={file} />
        } else if (getFile(file).extension == "schedule") {
            return <></>
        } else if (getFile(file).extension == "kanban") {
            return <></>
        }

        return <></>
    };

    const [page, setPage] = useState<React.ReactElement>(getPageFromFile(openedFile));

    useEffect(() => {
        setPage(getPageFromFile(openedFile));
    }, [openedFile])

    return (
        <>
            <div className="flex flex-col w-full h-full border-solid border-l-[1px] border-t-[1px] border-border">
                <Header />

                <div className="flex items-center justify-center w-full h-full">
                    <ActivityBar />

                    {/* FIXME: split bar randomly resizing when switching between windows */}
                    <Split
                        className="split h-full w-full"
                        gutterSize={0}
                        sizes={[30, 70]}
                    >
                        <SideBar />
                        {page}
                    </Split>
                </div>
            </div>
        </>
    );
};

export default App;
