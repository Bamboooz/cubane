import React, { useState } from 'react';
import { invoke } from "@tauri-apps/api/tauri";
import { FiFilePlus, FiTrash2 } from "react-icons/fi";

import FileNode from './FileNode';

type FileList = { files: Array<{ path: string; }> };

const SideBar = () => {
    const [files, setFiles] = useState<FileList>({ files: [] });
  
    const update_file_list = () => {
        const response = invoke("read_directory", {});

        response
            .then((value) => {
                setFiles(value as FileList);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    update_file_list();
    
    return (
        <>
            <div className="h-full flex flex-col items-center justify-start w-[230px] bg-sidebar border-solid border-r-[1px] border-border pt-4 gap-4">
                <div className="flex w-full items-center justify-between px-2 ">
                    <button className="bg-transparent flex items-center justify-center border-solid border-[1px] border-border py-1 px-2 rounded-lg transition-colors hover:shadow-xl hover:bg-zinc-700">
                        <FiFilePlus className="text-neutral-300 text-[18px]" />
                    </button>

                    <button className="bg-transparent flex items-center justify-center border-solid border-[1px] border-border py-1 px-2 rounded-lg transition-colors hover:shadow-xl hover:bg-zinc-700">
                        <FiTrash2 className="text-neutral-300 text-[18px]" />
                    </button>
                </div>

                <div className="w-full h-full flex flex-col items-center justify-start gap-2 overflow-auto px-2 ">
                    {files.files.map((file, index) => (
                        <FileNode key={index} id={index} name={file.path} selected={false} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default SideBar;
