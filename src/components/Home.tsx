import React from 'react';
import { appWindow } from '@tauri-apps/api/window'

const Home = () => {
    return (
        <>
            <div className="h-full w-full flex flex-col items-center justify-center gap-6">
                <h1 className="text-slate-200 text-[22px]">No file is open</h1>

                <div className="flex flex-col items-center justify-center gap-1">
                    <p className="text-slate-400 text-[16px] cursor-pointer underline-offset-2 hover:underline hover:active:text-slate-300">Create new file (Ctrl + N)</p>
                    <p className="text-slate-400 text-[16px] cursor-pointer underline-offset-2 hover:underline hover:active:text-slate-300">Go to file (Ctrl + O)</p>
                    <p onClick={() => appWindow.close()} className="text-slate-400 text-[16px] cursor-pointer underline-offset-2 hover:text-red-600 hover:underline hover:active:text-red-400">Close</p>
                </div>
            </div>
        </>
    );
};

export default Home;
