import React from "react";

interface ActivityBarButtonProps {
    title: string;
    onClick: () => void;
    icon: React.ReactElement;
}

const ActivityBarButton: React.FC<ActivityBarButtonProps> = ({ title, onClick, icon }) => {
    return (
        <>
            <button onClick={onClick} title={title} className="bg-transparent flex items-center justify-center p-1 rounded-md transition-colors-fast hover:bg-zinc-700">
                {React.cloneElement(icon, { className: "text-neutral-300 text-[18px]" })}
            </button>
        </>
    );
};

export default ActivityBarButton;
