import React from "react";

import logo from "../../assets/icon.png";

const HelpView: React.FC = () => {
    return (
        <>
            <div className="w-full h-full flex flex-col items-center justify-center p-6 gap-2">
                <img src={logo} className="h-24 w-24 shadow-2xl" alt="cubane logo" />
                <h1 className="text-neutral-300 font-semibold">cubane</h1>
                <h2 className="text-neutral-300 text-[16px]">v0.0.1</h2>
            </div>
        </>
    );
};

export default HelpView;
