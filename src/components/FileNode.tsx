import React from 'react';

import { cn } from '../lib/utils';

interface FileNodeProps {
    id: number;
    name: string;
    selected: boolean;
}

const FileNode: React.FC<FileNodeProps> = ({ id, name, selected }) => {
    const className = cn("w-full h-10 flex shrink-0 flex-col p-4 items-start justify-center rounded-lg", selected ? "bg-node" : "bg-transparent transition-colors hover:bg-node hover:bg-opacity-50");

    return (
        <>
            <button className={className}>
                <p className="text-[16px] font-mono text-neutral-200">{name}</p>
            </button>
        </>
    );
};

export default FileNode;
