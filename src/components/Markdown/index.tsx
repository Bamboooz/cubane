import React, { useState, useEffect, useRef } from "react";
import { useAutosave } from "react-autosave";
import { MDXEditorMethods } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

import { writeFile, readFile } from "../../utils/fs";
import MarkdownCounter from "./MarkdownCounter";
import MarkdownEditorView from "./MarkdownEditorView";

interface MarkdownEditorProps {
    openedFile: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ openedFile }) => {
    const [text, setText] = useState<string>("");
    const editorRef = useRef<MDXEditorMethods>(null);

    const updateFileContents = () => {
        readFile(openedFile)
            .then((value) => {
                setText(value as string);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const updateFile = () => {
        writeFile(openedFile, text)
            .catch((err) => {
                console.error(`Failed to write to a file: ${err}.`);
            });
    };
    
    useEffect(() => {
        updateFileContents();
    }, [openedFile]);

    useEffect(() => {
        editorRef.current?.setMarkdown(text);
    }, [text]);

    useAutosave({ data: text, onSave: updateFile, interval: 1000 });
    
    return (
        <>
            <div className="w-full h-full relative p-4 gap-4 overflow-hidden">
                <MarkdownEditorView editorRef={editorRef} text={text} setText={setText} />
                <MarkdownCounter text={text} />
            </div>
        </>
    );
};

export default MarkdownEditor;
