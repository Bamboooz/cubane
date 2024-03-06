import React from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";

import SideBar from "./components/Sidebar";
import Header from "./components/Header";
import ActivityBar from "./components/ActivityBar";
import Page from "./components/Page";

const App: React.FC = () => {
    return (
        <>
            <div className="flex flex-col w-screen h-screen border-solid border-l-[1px] border-t-[1px] border-border">
                <Header />

                <div className="flex items-center justify-center w-full h-full">
                    <ActivityBar />

                    <PanelGroup direction="horizontal" className="h-full w-full">
                        <Panel defaultSize={30} minSize={20}>
                            <SideBar />
                        </Panel>
                        <PanelResizeHandle />
                        <Panel defaultSize={70} minSize={30}>
                            <Page />
                        </Panel>
                    </PanelGroup>
                </div>
            </div>
        </>
    );
};

export default App;
