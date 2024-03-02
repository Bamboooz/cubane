import React, { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";

interface MarkdownEditorProps {
    openedFile: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ openedFile }) => {
    const [text, setText] = useState<string>("");

    const updateFileContents = () => {
        const response = invoke("read_file", { fileName: openedFile });

        response
            .then((value) => {
                setText(value as string);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        updateFileContents();
    }, []);

    return (
        <>
            <div className="w-full h-full">
                <textarea spellCheck={false} defaultValue={text} className="bg-transparent p-4 outline-none w-full h-full text-[14px] text-white">

                </textarea>
            </div>
        </>
    );
};

export default MarkdownEditor;
