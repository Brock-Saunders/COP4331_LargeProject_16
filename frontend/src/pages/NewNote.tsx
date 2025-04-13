import React, { useEffect, useRef } from 'react';
import TipTap from '../components/TipTap';
import FileSideBar from '../components/FileSideBar';

const NewNote = () => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 h-screen">
            <div className="rounded-md p-1 mb-1 p-1 ">
                <div className="rounded-md mb-1 col-span-1 bg-dark-gray-100">
                    <FileSideBar />
                </div>
            </div>

        
            <div className="col-span-3 relative bg-gray-800 p-4 overflow-y-auto">
                <TipTap />
            </div>
            
        </div>
    )
}

export default NewNote; 