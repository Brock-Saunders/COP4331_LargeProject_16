import React from "react";
import {
  FileText,
  FilePlus,
  ArrowDownAZ,
  ArrowUpAZ,
} from "lucide-react";

//import "./FileSideBar.css";

interface File {
  _id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface SideBarProps {
  files: File[];
  currentFileId: string;
  onSelectFile: (fileId: string) => void;
  onAddnewFile: () => void;
}

const FileSideBar: React.FC<SideBarProps> = ({
  files,
  currentFileId,
  onSelectFile,
  onAddnewFile,
}) => {
  return (
    <div className= "sticky pr-2 rounded-md col-span-1 text-white">
      <div className="h-screen border border-gray-500 bg-black p-5 rounded-lg shadow-md flex flex-col ">
        <div className="p-4 border-b border-gray-500 flex flex-row items-center justify-between">
          <div className="text-2xl font-semibold">Notes</div>
          <div className="flex space-x-2">
            <button 
              className="bg-slate-700 px-3 py-1 rounded hover:bg-slate-600"
              onClick={() => onAddnewFile()}
            >
              <ArrowDownAZ />
            </button>
            <button className="bg-slate-700 px-3 py-1 rounded hover:bg-slate-600">
              <ArrowUpAZ />
            </button>
            <button className="bg-slate-700 px-3 py-1 rounded hover:bg-slate-600">
              <FilePlus />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
          <ul className="space-y-2">
            {files.map((file: File) => (
              <li
                key={file._id}
                className={`flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-slate-500 ${file._id === currentFileId ? "bg-slate-600" : "hover:bg-slate-700"}`}
                onClick={() => onSelectFile(file._id)}
              >
                <FileText size={20} />
                <span className="truncate">{file.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

};

export default FileSideBar;