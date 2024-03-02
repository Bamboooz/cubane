import { BsFileEarmarkText, BsMarkdown } from "react-icons/bs";

const getFile = (file_path: string) => {
    const url = new URL('file://' + file_path);
    const baseName = url.pathname.split('/').pop() || '';
    const fileName = baseName.split(".")[0];
    const extension = baseName.split(".")[1];
    const verifiedExtension = extension ? extension : "";

    return { name: fileName, extension: verifiedExtension };
};

const getFileIcon = (file_path: string) => {
    switch (getFile(file_path).extension) {
        case "md": {
            return <BsMarkdown />
        }
        default: {
            return <BsFileEarmarkText />
        }
    }
};

export { getFile, getFileIcon };
