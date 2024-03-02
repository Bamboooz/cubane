import { invoke } from "@tauri-apps/api/tauri";
import { BsFileEarmarkText, BsMarkdown } from "react-icons/bs";

type FileList = Array<{ path: string; }>;

async function getFileList(): Promise<FileList> {
    try {
        const response = await invoke("read_directory", {});
        return response as FileList;
    } catch (error) {
        console.error(error);
        return [] as FileList;
    }
}

const createFile = (fileName: string) => invoke("create_file", { fileName: fileName });
const deleteFile = (filePath: string) => invoke("delete_file", { fileName: filePath });

const getFile = (filePath: string) => {
    const baseName = filePath.replace(/^.*[\\\/]/, "")
    return { name: baseName.split(".")[0], extension: baseName.split(".")[1] ? baseName.split(".")[1] : "" };
};

const getFileIcon = (filePath: string) => {
    switch (getFile(filePath).extension) {
        case "md": {
            return <BsMarkdown />
        }
        default: {
            return <BsFileEarmarkText />
        }
    }
};

export type { FileList };
export { getFile, getFileIcon, getFileList, createFile, deleteFile };
