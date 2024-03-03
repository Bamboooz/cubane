import React, { useEffect, useState } from "react";
import Split from "react-split";

import { useAppState } from "./state/appState";
import SideBar from "./components/Sidebar";
import Header from "./components/Header";
import Home from "./components/Home";
import MarkdownEditor from "./components/Markdown";

const App: React.FC = () => {
    const openedFile = useAppState((state) => state.openedFile);

    const getPageFromFile = (file: string) => {
        return file !== "" ? <MarkdownEditor openedFile={file} /> : <Home />;
    };

    const [page, setPage] = useState<React.ReactElement>(getPageFromFile(openedFile));

    useEffect(() => {
        setPage(getPageFromFile(openedFile));
    }, [openedFile])

    return (
        <>
            <div className="flex flex-col w-full h-full border-solid border-l-[1px] border-t-[1px] border-border">
                <Header />

                <Split
                    className="split h-full w-full"
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
