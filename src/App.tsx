import React from "react";
import Split from "react-split";

import SideBar from "./components/Sidebar";
import Header from "./components/Header";
import ActivityBar from "./components/ActivityBar";
import Page from "./components/Page";

const App: React.FC = () => {
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
                        <Page />
                    </Split>
                </div>
            </div>
        </>
    );
};

export default App;
