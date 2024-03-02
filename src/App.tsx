import React from "react";
import Split from "react-split";

import SideBar from "./components/SideBar";
import Header from "./components/Header";
import Home from "./components/Home";

const App = () => {
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
                    <Home />
                </Split>
            </div>
        </>
    );
};

export default App;
