type FileList = string[];

const getFile = (filePath: string) => {
    const baseName = filePath.replace(/^.*[\\\/]/, "")
    return { name: baseName.split(".")[0], extension: baseName.split(".")[1] ? baseName.split(".")[1] : "" };
};

const findFilenameSuccessor = (fileName: string, files: FileList) => {
    const regexPattern = new RegExp(`^${getFile(fileName).name} \\d+$`);

    const nextFreeUntiledNumber = files
        .map(obj => getFile(obj).name)
        .filter(str => regexPattern.test(str))
        .map(str => parseInt(str.split(' ')[str.split(' ').length - 1]))
        .sort((a, b) => a - b)
        .reduce((acc, number) => (number > acc ? acc : number + 1), 1);

    return `${getFile(fileName).name} ${nextFreeUntiledNumber}.${getFile(fileName).extension}`;
};

export type { FileList };
export { getFile, findFilenameSuccessor };
