import React from "react";
import { LuCommand } from "react-icons/lu";

interface CommandNodeProps {
    name: string;
    triggerKeys: string[];
}

const CommandNode: React.FC<CommandNodeProps> = ({ name, triggerKeys }) => {
    return (
        <>
            <div className="w-full flex items-center justify-between h-8 px-2 rounded-md hover:bg-node hover:bg-opacity-50">
               <p className="text-[14px] text-neutral-300">{name}</p>

               <div className="flex items-center justify-end gap-1">
                   {triggerKeys.map((key, index) => (
                       <React.Fragment key={index}>
                           <div className="bg-node rounded-md h-[20px] px-1 flex items-center justify-center">
                                {key === "CommandOrControl"
                                    ? <LuCommand className="text-[12px] text-neutral-400" />
                                    : <p className="text-[12px] text-neutral-400">{key}</p>
                                }
                           </div>
                           {index < triggerKeys.length - 1 && (
                               <p className="text-[12px] text-neutral-400">+</p>
                           )}
                       </React.Fragment>
                   ))}
               </div>
           </div>
        </>
    );
};

export default CommandNode;
