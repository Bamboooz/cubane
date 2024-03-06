import { invoke } from "@tauri-apps/api/tauri";

import { FileList, getFile } from "../utils/fs";

enum SortType {
    AZ,
    ZA,
    LAST_UPDATED,
    FIRST_UPDATED,
}

const compareFileNames = (a: string, b: string): number => {
    return a.localeCompare(b, undefined, { sensitivity: 'base' });
};

const convertLastUpdatedToInt = async (filePath: string): Promise<number> => {
    const result = await invoke("last_updated", { filePath, includeFormatting: false });
    // Assuming the result is a string representation of a number, you might need to parse it accordingly.
    return parseInt(result as string, 10);
};

const sortListAZ = (list: FileList): FileList => {
    return list.slice().sort((a, b) => {
        const fileNameA = getFile(a.path).name;
        const fileNameB = getFile(b.path).name;
        return compareFileNames(fileNameA, fileNameB);
    });
};

const sortListZA = (list: FileList): FileList => {
    return list.slice().sort((a, b) => {
        const fileNameA = getFile(a.path).name;
        const fileNameB = getFile(b.path).name;
        return compareFileNames(fileNameB, fileNameA);
    });
};

const sortListLastUpdated = async (list: FileList): Promise<FileList> => {
    const promises = list.map(async (file) => {
        const lastUpdated = await convertLastUpdatedToInt(file.path);
        return { file, lastUpdated };
    });

    const sortedList = await Promise.all(promises);
    return sortedList.sort((a, b) => b.lastUpdated - a.lastUpdated).map(item => item.file);
};

const sortListFirstUpdated = async (list: FileList): Promise<FileList> => {
    const promises = list.map(async (file) => {
        const firstUpdated = await convertLastUpdatedToInt(file.path);
        return { file, firstUpdated };
    });

    const sortedList = await Promise.all(promises);
    return sortedList.sort((a, b) => a.firstUpdated - b.firstUpdated).map(item => item.file);
};

export { SortType, sortListAZ, sortListZA, sortListLastUpdated, sortListFirstUpdated };