import React from "react";

import logo from "../../assets/icon_nobg.png";
import SplashHeader from "./SplashHeader";

const SplashScreen: React.FC = () => {
    return (
        <>
            <div className="relative flex flex-col w-screen h-screen">
                <SplashHeader />

                <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-primary">
                    <img src={logo} alt="cubane logo" className="h-36 w-36" />
                </div>
            </div>
        </>
    );
};

export default SplashScreen;
