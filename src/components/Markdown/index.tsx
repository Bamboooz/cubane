import React, { useState, useEffect, useRef } from "react";
import { useAutosave } from "react-autosave";
import {
    MDXEditor,
    headingsPlugin,
    UndoRedo,
    BoldItalicUnderlineToggles,
    ListsToggle,
    CodeToggle,
    BlockTypeSelect,
    toolbarPlugin,
    listsPlugin,
    markdownShortcutPlugin,
    quotePlugin,
    thematicBreakPlugin,
    MDXEditorMethods
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

import { writeFile, readFile } from "../../utils/fs";
import MarkdownCounter from "./counter";
import "./toolbar.css";

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
            <div className="w-full h-full relative p-2 overflow-hidden">
                {/* FIXME: file contents reset when moving from editor to Home page */}

                <MDXEditor
                    ref={editorRef}
                    markdown={text}
                    onChange={setText}
                    contentEditableClassName="text-neutral-300"
                    plugins={
                        [
                            headingsPlugin(),
                            listsPlugin(),
                            markdownShortcutPlugin(),
                            quotePlugin(),
                            thematicBreakPlugin(),
                            toolbarPlugin({
                                toolbarContents: () => (
                                    <>
                                        {" "}
                                        <UndoRedo />
                                        <BoldItalicUnderlineToggles />
                                        <CodeToggle />
                                        {" "}
                                        <ListsToggle />
                                        {""}
                                        <BlockTypeSelect />
                                    </>
                                )
                            })
                        ]
                    }
                />

                <MarkdownCounter text={text} />
            </div>
        </>
    );
};

export default MarkdownEditor;
