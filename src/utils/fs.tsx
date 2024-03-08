type FileList = string[];

const getFile = (filePath: string) => {
    const baseName = filePath.replace(/^.*[\\\/]/, "")
    return { name: baseName.split(".")[0], extension: baseName.split(".")[1] ? baseName.split(".")[1] : "" };
};

export type { FileList };
export { getFile };
