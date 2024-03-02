import React, { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { FiFilePlus, FiTrash2 } from "react-icons/fi";
import { IoRefresh } from "react-icons/io5";

import FileNode from "../FileNode";

type FileList = { files: Array<{ path: string; }> };

const SideBar: React.FC = () => {
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
    };

    async function create_file() {
        await invoke("create_file", { fileName: "hey" });
    };

    // load files on app load and then do it only when user refreshes
    useEffect(() => {
        update_file_list();
    }, []);
    
    return (
        <>
            <div className="h-full flex flex-col items-center justify-start w-[230px] bg-sidebar border-solid border-r-[1px] border-border pt-4 o gap-4">
                <div className="flex w-full items-center justify-between px-4 ">
                    <button onClick={create_file} className="bg-transparent flex items-center justify-center border-solid border-[1px] border-border py-1 px-2 rounded-lg transition-colors hover:shadow-xl hover:bg-zinc-700">
                        <FiFilePlus className="text-neutral-300 text-[18px]" />
                    </button>

                    <button className="bg-transparent flex items-center justify-center border-solid border-[1px] border-border py-1 px-2 rounded-lg transition-colors hover:shadow-xl hover:bg-zinc-700">
                        <FiTrash2 className="text-neutral-300 text-[18px]" />
                    </button>
                </div>

                <div className="w-full h-full flex flex-col items-center justify-start overflow-auto px-2 ">
                    {files.files.map((file, index) => (
                        <FileNode key={index} name={file.path} />
                    ))}
                </div>

                <div className="p-2 flex items-center justify-center w-full">
                    <button onClick={update_file_list} className="w-full h-8 flex items-center justify-center gap-1 rounded-lg bg bg-transparent transition-colors hover:bg-node hover:bg-opacity-50">
                        <IoRefresh className="text-neutral-300 text-[16px]" />
                        <p className="text-neutral-300 text-[12px]">Refresh</p>
                    </button>
                </div>
            </div>
        </>
    );
};

export default SideBar;
