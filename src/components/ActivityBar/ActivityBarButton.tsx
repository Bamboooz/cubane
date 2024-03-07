import React from "react";
import { cn } from "../../utils/tw";

interface ActivityBarButtonProps {
    title: string;
    onClick: () => void;
    icon: React.ReactElement;
}

const ActivityBarButton: React.FC<ActivityBarButtonProps> = ({ title, onClick, icon }) => {
    return (
        <>
            <button onClick={onClick} title={title} className="group bg-transparent flex items-center justify-center p-1 rounded-md transition-colors-fast hover:bg-zinc-700">
                {React.cloneElement(icon, { className: cn("text-neutral-300 text-[18px] transition-colors-fast", icon.props.className) })}
            </button>
        </>
    );
};

export default ActivityBarButton;
