import React, { useEffect, useState } from "react";
import Split from "react-split";

import SideBar from "./components/Sidebar";
import Header from "./components/Header";
import Home from "./components/Home";
import { getAppState } from "./state/appState";
import MarkdownEditor from "./components/Editor/Markdown";

const App: React.FC = () => {
    const openedFile = getAppState("openedFile");

    const getPageFromFile = (openedFile: string) => {
        return openedFile !== "" ? <MarkdownEditor /> : <Home />;
    };

    const [page, setPage] = useState<React.ReactElement>(getPageFromFile(openedFile));

    return (
        <>
            <div className="flex flex-col w-full h-full border-solid border-[1px] border-border overflow-hidden">
                <Header />

                <Split
                    className="split h-full w-full bg-primary"
                    gutterSize={1}
                    sizes={[30, 70]}
                >
                    <SideBar />
                    {page}
                </Split>
            </div>
        </>
    );
};

export default App;
