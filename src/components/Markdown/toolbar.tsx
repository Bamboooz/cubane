import React from "react";

import { IoChevronBackOutline, IoChevronForwardOutline, IoCode } from "react-icons/io5";
import { HiOutlineExternalLink } from "react-icons/hi";
import { GoBold, GoItalic, GoPaperclip, GoListOrdered } from "react-icons/go";
import { RiStrikethrough, RiBracesLine } from "react-icons/ri";
import { IoIosMore, IoIosLink } from "react-icons/io";
import { LuList, LuListChecks } from "react-icons/lu";

interface MarkdownToolbarProps {
    appendText: (textToAppend: string) => void;
}

interface MarkdownToolbarButtonProps {
    icon: React.ReactElement;
    title: string;
    appendText: (textToAppend: string) => void;
    text: string;
}

const MarkdownToolbarButton: React.FC<MarkdownToolbarButtonProps> = ({ icon, title, appendText, text }) => {
    return (
        <>
            <button onClick={() => appendText(text)} title={title} className="flex items-center justify-center p-1 rounded-lg transition-colors-fast hover:bg-zinc-700">
                {React.cloneElement(icon, { className: "text-neutral-300 text-md" })}
            </button>
        </>
    );
};

const MarkdownToolbar: React.FC<MarkdownToolbarProps> = ({ appendText }) => {
    const MD = {
        BOLD: "****",
        ITALIC: "**",
        STRIKETHROUGH: "~~~~",
        LINK: "[]()",
        CODE: "``````",
        UNORDERED: " \n - \n - ",
        ORDERED: " \n1. \n2. ",
        CHECKLIST: " \n - [x] \n - [ ] "
    };

    return (
        <>
            <div className="w-full h-full flex items-center justify-start z-50 px-2 gap-4 bg-sidebar rounded-sm border-solid border-[1px] border-border">
                <div className="flex items-center justify-center gap-1">
                    <button className="flex items-center justify-center p-1 rounded-lg transition-colors hover:bg-zinc-700">
                        <IoChevronBackOutline className="text-neutral-300 text-md" />
                    </button>

                    <button className="flex items-center justify-center p-1 rounded-lg transition-colors hover:bg-zinc-700">
                        <IoChevronForwardOutline className="text-neutral-300 text-md" />
                    </button>

                    {/* UNIMPLEMENTED */}
                    <MarkdownToolbarButton appendText={appendText} text={""} title="" icon={<HiOutlineExternalLink />} />
                </div>

                <div className="flex items-center justify-center gap-1">
                    <MarkdownToolbarButton appendText={appendText} text={MD.BOLD} title="Bold" icon={<GoBold />} />
                    <MarkdownToolbarButton appendText={appendText} text={MD.ITALIC} title="Italic" icon={<GoItalic />} />
                    <MarkdownToolbarButton appendText={appendText} text={MD.STRIKETHROUGH} title="Strikethrough" icon={<RiStrikethrough />} />
                </div>

                <button className="flex items-center justify-center p-1 rounded-lg transition-colors hover:bg-zinc-700">
                    <IoIosMore className="text-neutral-300 text-md" />
                </button>

                <div className="flex items-center justify-center gap-1">
                    <MarkdownToolbarButton appendText={appendText} text={MD.LINK} title="Link" icon={<IoIosLink />} />
                    <MarkdownToolbarButton appendText={appendText} text={MD.CODE} title="Code block" icon={<IoCode />} />

                    {/* UNIMPLEMENTED */}
                    <MarkdownToolbarButton appendText={appendText} text={""} title="" icon={<RiBracesLine />} />
                    <MarkdownToolbarButton appendText={appendText} text={""} title="" icon={<GoPaperclip />} />
                </div>

                <div className="flex items-center justify-center gap-1">
                    <MarkdownToolbarButton appendText={appendText} text={MD.UNORDERED} title="Unordered list" icon={<LuList />} />
                    <MarkdownToolbarButton appendText={appendText} text={MD.ORDERED} title="Ordered list" icon={<GoListOrdered />} />
                    <MarkdownToolbarButton appendText={appendText} text={MD.CHECKLIST} title="Checklist" icon={<LuListChecks />} />
                </div>

                <button className="flex items-center justify-center p-1 rounded-lg transition-colors hover:bg-zinc-700">
                    <IoIosMore className="text-neutral-300 text-md" />
                </button>
            </div>
        </>
    );
};

export default MarkdownToolbar;
