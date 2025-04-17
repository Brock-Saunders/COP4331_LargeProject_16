import React, { useState , useEffect} from "react";
import {
  FileText,
  FilePlus,
  ArrowDownAZ,
  ArrowUpAZ,
  Trash2,
  Clock,
  Download,
} from "lucide-react";

import "../styles/FileSideBar.css";

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
  onAddnewFile: () => Promise<string>;
  onDeleteFile: () => void;
  onDownload: () => void;
}

const FileSideBar: React.FC<SideBarProps> = ({
  files,
  currentFileId,
  onSelectFile,
  onAddnewFile,
  onDeleteFile,
  onDownload,
}) => {
  const [sortedFiles, setSortedFiles] = useState<File[]>(files);

  // Update sortedFiles whenever the files prop changes
  useEffect(() => {
    setSortedFiles(files);
  }, [files]);

  const sortFilesAscending = () => {
    const sorted = [...sortedFiles].sort((a, b) => a.title.localeCompare(b.title));
    setSortedFiles(sorted);
  };

  const sortFilesDescending = () => {
    const sorted = [...sortedFiles].sort((a, b) => b.title.localeCompare(a.title));
    setSortedFiles(sorted);
  };

  const resetToLastUpdated = () => {
    const sorted = [...files].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    setSortedFiles(sorted);
  };

  const handleAddNewFile = async () => {
    const newFileId = await onAddnewFile(); // Call the function and get the new file ID
    if (newFileId) {
      onSelectFile(newFileId); // Navigate to the new file
    }
  };

  return (
    <div className= "w-80 sticky pr-2 rounded-md col-span-1 text-white">
      <div className="h-full border border-gray-500 bg-black rounded-lg shadow-md flex flex-col ">
        <div className="p-4 border-b border-gray-500 flex flex-row items-center justify-between">
          <div className="text-2xl font-semibold">Docs</div>
          <div className="flex space-x-2">
            <button 
              className="bg-slate-700 px-3 py-1 rounded hover:bg-slate-600"
              onClick={sortFilesAscending}
            >
              <ArrowDownAZ size={20} />
            </button>
            <button className="bg-slate-700 px-3 py-1 rounded hover:bg-slate-600"
            onClick={sortFilesDescending}
            >
              <ArrowUpAZ size={20} />
            </button>
            <button
              className="bg-slate-700 px-3 py-1 rounded hover:bg-slate-600"
              onClick={resetToLastUpdated}
            >
              <Clock size={20} />
            </button>
            <button 
              className="bg-slate-700 px-3 py-1 rounded hover:bg-slate-600"
              onClick={handleAddNewFile}
            >
              <FilePlus size={20} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
          <ul className="space-y-2">
            {sortedFiles.map((file: File) => (
              <li
                key={file._id}
                className={`flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-slate-500 
                ${file._id === currentFileId ? "bg-slate-600" : "hover:bg-slate-700"}`}
                >
                <div
                className="flex-1 flex items-center gap-2"
                onClick={() => onSelectFile(file._id)}
              >
                <FileText size={20} />
                <span className="truncate">{file.title}</span>
              </div>
              <button
                className="bg-slate-700 px-3 py-1 rounded hover:bg-slate-600"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering onSelectFile
                  onDeleteFile(file._id);
                }}
              >
                <Trash2 size={16} />
              </button>
              <button
                className="bg-slate-700 px-3 py-1 rounded hover:bg-slate-600"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering onSelectFile
                  onDownload(file);
                }}
              >
                <Download size={16} />
              </button>
                </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

};

export default FileSideBar;