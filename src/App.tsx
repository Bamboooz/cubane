import React, { useEffect, useState } from "react";
import Split from "react-split";

import { useAppState } from "./state/appState";
import SideBar from "./components/Sidebar";
import Header from "./components/Header";
import Home from "./components/Home";
import MarkdownEditor from "./components/Editor/Markdown";

const App: React.FC = () => {
    const openedFile = useAppState((state) => state.openedFile);

    const getPageFromFile = (openedFile: string) => {
        return openedFile !== "" ? <MarkdownEditor /> : <Home />;
    };

    const [page, setPage] = useState<React.ReactElement>(getPageFromFile(openedFile));

    useEffect(() => {
        setPage(getPageFromFile(openedFile));
    }, [openedFile])

    return (
        <>
            <div className="flex flex-col w-full h-full border-solid border-[1px] border-border overflow-hidden">
                <Header />

                <Split
                    className="split h-full w-full bg-primary"
                    gutterSize={0}
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
