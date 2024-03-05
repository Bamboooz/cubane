import React, { useState, useEffect } from "react";

import { useAppState } from "../../state/appState";
import Memories from "../Memories";
import Home from "../Home";
import MarkdownEditor from "../Markdown";
import { getFile } from "../../utils/fs";

const Page: React.FC = () => {
    const openedFile = useAppState((state) => state.openedFile);

    const getPageFromFile = (file: string) => {
        if (file === "") {
            return <Home />
        } else if (getFile(file).extension == "md") {
            return <MarkdownEditor openedFile={file} />
        } else if (getFile(file).extension == "schedule") {
            return <></>
        } else if (getFile(file).extension == "kanban") {
            return <></>
        } else if (getFile(file).extension == "memo") {
            return <Memories />
        }

        return <></>
    };

    const [page, setPage] = useState<React.ReactElement>(getPageFromFile(openedFile));

    useEffect(() => {
        setPage(getPageFromFile(openedFile));
    }, [openedFile])

    return page;
};

export default Page;
