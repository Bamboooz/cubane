import { FileList, getFile } from "../utils/fs";

enum SortType {
    AZ,
    ZA,
}

const compareFileNames = (a: string, b: string): number => {
    return a.localeCompare(b, undefined, { sensitivity: 'base' });
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

export { SortType, sortListAZ, sortListZA };
