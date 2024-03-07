import React, { useRef } from "react";

import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { cn } from "../../../utils/tw";

interface ContextProps {
    x: number;
    y: number;
    closeContextMenu: () => void;
    className: string;
    children?: React.ReactNode;
}

const Context: React.FC<ContextProps> = ({ x, y, closeContextMenu, className, children }) => {
    const contextMenuRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(contextMenuRef, closeContextMenu);

    return (
        <>
            <div ref={contextMenuRef} className={cn("fixed z-30", className)} style={{ top: `${y}px`, left: `${x}px` }}>
                {children}
            </div>
        </>
    );
};

export default Context;
