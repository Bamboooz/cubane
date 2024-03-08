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
            <button onClick={onClick} className="flex items-center justify-center gap-2 text-neutral-400 hover:text-neutral-300">
                <p  className="text-[12px]">{`${name}:`}</p>
            
                <div className="flex items-center justify-center gap-1">
                    <div className="bg-node rounded-md h-[20px] px-1 flex items-center justify-center">
                        <LuCommand className="text-[12px]" />
                    </div>

                    <p className="text-[12px]">+</p>

                    <div className="bg-node rounded-md h-[20px] px-1 flex items-center justify-center">
                        <p className="text-[12px]">Shift</p>
                    </div>

                    <p className="text-[12px]">+</p>

                    <div className="bg-node rounded-md h-[20px] px-1 flex items-center justify-center">
                        <p className="text-[12px]">{trigger}</p>
                    </div>
                </div>
            </button>
        </>
    );
};

export default HomeCommandButton;
