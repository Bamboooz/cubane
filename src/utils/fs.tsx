import { invoke } from "@tauri-apps/api/tauri";

type FileList = string[];

const createFile = (fileName: string, initialContent: string = "") => invoke("create_file", { fileName: fileName, initialContent: initialContent });
const deleteFile = (filePath: string) => invoke("delete_file", { filePath: filePath });
const readFile = (filePath: string) => invoke("read_file", { filePath: filePath });
const writeFile = (filePath: string, content: string) => invoke("write_file", { filePath: filePath, content: content });

const getFile = (filePath: string) => {
    const baseName = filePath.replace(/^.*[\\\/]/, "")
    return { name: baseName.split(".")[0], extension: baseName.split(".")[1] ? baseName.split(".")[1] : "" };
};

export type { FileList };
export { getFile, createFile, deleteFile, writeFile, readFile };
