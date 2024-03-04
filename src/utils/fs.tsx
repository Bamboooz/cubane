import { invoke } from "@tauri-apps/api/tauri";
import { BsMarkdown } from "react-icons/bs";
import { LuCalendarDays, LuFile, LuLightbulb } from "react-icons/lu";
import { MdOutlineViewKanban } from "react-icons/md";

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

const createFile = (fileName: string, initialContent: string = "") => invoke("create_file", { fileName: fileName, initialContent: initialContent });
const deleteFile = (filePath: string) => invoke("delete_file", { filePath: filePath });
const readFile = (filePath: string) => invoke("read_file", { filePath: filePath });
const writeFile = (filePath: string, content: string) => invoke("write_file", { filePath: filePath, content: content });

const getFile = (filePath: string) => {
    const baseName = filePath.replace(/^.*[\\\/]/, "")
    return { name: baseName.split(".")[0], extension: baseName.split(".")[1] ? baseName.split(".")[1] : "" };
};

const getFileIcon = (filePath: string) => {
    switch (getFile(filePath).extension) {
        case "md": {
            return <BsMarkdown />
        }
        case "schedule": {
            return <LuCalendarDays />
        }
        case "kanban": {
            return <MdOutlineViewKanban />
        }
        case "memo": {
            return <LuLightbulb />
        }
        default: {
            return <LuFile />
        }
    }
};

export type { FileList };
export { getFile, getFileIcon, getFileList, createFile, deleteFile, writeFile, readFile };
