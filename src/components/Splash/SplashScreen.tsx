import React from "react";

import logo from "../../assets/icon_nobg.png";
import SplashHeader from "./SplashHeader";

const SplashScreen: React.FC = () => {
    return (
        <>
            <div className="relative flex flex-col w-screen h-screen">
                <SplashHeader />

                <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-primary">
                    <div className="z-40 shadow-2xl flex flex-col rounded-md items-center justify-center px-20 py-10 bg-sidebar border-solid border-[1px] border-border">
                        <img src={logo} alt="cubane logo" className="h-36 w-36 animate-pulse" />
                        <h1 className="text-neutral-300 text-[18px] animate-pulse">Loading...</h1>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SplashScreen;
