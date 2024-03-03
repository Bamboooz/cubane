import React, { useState, useEffect } from "react";
import { useAutosave } from "react-autosave";

import { writeFile, readFile } from "../../utils/fs";
import MarkdownPicker from "./toolbar";
import MarkdownCounter from "./counter";

interface MarkdownEditorProps {
    openedFile: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ openedFile }) => {
    const [text, setText] = useState<string>("");

    const updateFileContents = () => {
        readFile(openedFile)
            .then((value) => {
                setText(value as string);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    
    useEffect(() => {
        updateFileContents();
    }, [openedFile]);
    
    const updateFile = () => {
        writeFile(openedFile, text)
            .catch((err) => {
                console.error(`Failed to write to a file: ${err}.`);
            });
    };

    // add text appending for markdown function picker
    const appendText = (textToAppend: string) => {
        setText((prevText) => {
            return prevText + textToAppend;
        })
    };

    useAutosave({ data: text, onSave: updateFile });

    return (
        <>
            <div className="w-full h-full relative">
                <div className="w-full h-12 p-2">
                    <MarkdownPicker appendText={appendText} />
                </div>

                {/* FIXME: file contents reset when moving from editor to Home page */}
                <textarea
                    onChange={(e) => setText(e.target.value)}
                    spellCheck={false}
                    value={text}
                    className="bg-transparent resize-none p-4 outline-none w-full h-full text-[14px] text-neutral-300"
                />

                <MarkdownCounter text={text} />
            </div>
        </>
    );
};

export default MarkdownEditor;
