import React, { useState, useEffect, useRef } from "react";
import { useAutosave } from "react-autosave";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { invoke } from "@tauri-apps/api/tauri";
import "@mdxeditor/editor/style.css";

import MarkdownCounter from "./MarkdownCounter";
import MarkdownEditorView from "./MarkdownEditorView";

interface MarkdownEditorProps {
    openedFile: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ openedFile }) => {
    const [text, setText] = useState<string>("");
    const editorRef = useRef<MDXEditorMethods>(null);

    const updateFileContents = () => {
        invoke("read_file", { filePath: openedFile })
            .then((value) => {
                setText(value as string);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const updateFile = () => {
        invoke("write_file", { filePath: openedFile, content: text })
            .catch((err) => {
                console.error(err);
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
