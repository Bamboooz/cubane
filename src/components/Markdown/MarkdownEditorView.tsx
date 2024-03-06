import React from "react";
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

import "./toolbar.css";

interface MarkdownEditorViewProps {
    editorRef: React.RefObject<MDXEditorMethods>;
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
}

const MarkdownEditorView: React.FC<MarkdownEditorViewProps> = ({ editorRef, text, setText }) => {
    return (
        <>
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
        </>
    );
};

export default MarkdownEditorView;
