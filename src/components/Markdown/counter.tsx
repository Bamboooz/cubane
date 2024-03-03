import React from "react";

import { LuPencil } from "react-icons/lu";

interface MarkdownCounterProps {
    text: string;
}

const MarkdownCounter: React.FC<MarkdownCounterProps> = ({ text }) => {
    const cleanText = text.replace(/[^a-zA-Z0-9\s]/g, "");
    
    // if empty line it would still return 1 word, for 1 word it would give also 1 word and only for 2 words and above it would work
    const words = cleanText.trim().length !== 0 ? cleanText.trim().split(/\s+/).length : 0;
    const characters = text.length;

    return (
        <>
            <div className="absolute flex items-center z-50 justify-center px-2 gap-2 bg-sidebar border-solid border-l-[1px] border-t-[1px] border-border right-0 bottom-0 h-6 rounded-tl-lg">
                <LuPencil className="text-neutral-400 text-[14px]" />

                <p className="text-neutral-400 text-[12px]">{`${words} words`}</p>
                <p className="text-neutral-400 text-[12px]">{`${characters} characters`}</p>
            </div>
        </>
    );
};

export default MarkdownCounter;
