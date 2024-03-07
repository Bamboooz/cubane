import React from "react";
import { LuCommand } from "react-icons/lu";

interface HomeCommandButtonProps {
    name: string;
    trigger: string;
    onClick: () => void;
}

const HomeCommandButton: React.FC<HomeCommandButtonProps> = ({ name, trigger, onClick }) => {
    return (
        <>
            <button onClick={onClick} className="flex items-center justify-center gap-2 text-neutral-500 text-[16px] hover:text-neutral-400 hover:active:text-neutral-300">
                <p>{name}</p>
            
                <div className="flex items-center justify-center gap-1">
                    <div className="bg-node rounded-md mt-1 h-[20px] px-1 text-[12px] flex items-center justify-center">
                        <LuCommand />
                    </div>

                    <p>+</p>

                    <div className="bg-node rounded-md mt-1 h-[20px] px-1 text-[12px] flex items-center justify-center">
                        <p>Shift</p>
                    </div>

                    <p>+</p>

                    <div className="bg-node rounded-md mt-1 h-[20px] px-1 text-[12px] flex items-center justify-center">
                        <p>{trigger}</p>
                    </div>
                </div>
            </button>
        </>
    );
};

export default HomeCommandButton;
