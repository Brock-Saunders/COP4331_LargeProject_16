import React from "react";
import {
  FileText,
  FileImage,
  FileCode,
  FileSpreadsheet,
  FileArchive,
  FileAudio,
  FileVideo,
  FilePlus,
} from "lucide-react";

import "./FileSideBar.css"

const FileSideBar: React.FC = () => {

    const sidebarFiles = [
        { icon: <FileText size={20} />, filename: "report_q1_2024.docx" },
        { icon: <FileText size={20} />, filename: "project_proposal.pdf" },
        { icon: <FileImage size={20} />, filename: "logo_final.png" },
        { icon: <FileImage size={20} />, filename: "mockup_v2.jpg" },
        { icon: <FileCode size={20} />, filename: "dashboard.jsx" },
        { icon: <FileCode size={20} />, filename: "api_routes.ts" },
        { icon: <FileSpreadsheet size={20} />, filename: "budget_2024.xlsx" },
        { icon: <FileSpreadsheet size={20} />, filename: "attendance.csv" },
        { icon: <FileArchive size={20} />, filename: "assets.zip" },
        { icon: <FileAudio size={20} />, filename: "meeting_audio.mp3" },
        { icon: <FileVideo size={20} />, filename: "promo_video.mp4" },
        { icon: <FilePlus size={20} />, filename: "new_document.txt" },
        { icon: <FileText size={20} />, filename: "client_notes.txt" },
        { icon: <FileCode size={20} />, filename: "style.css" },
        { icon: <FileCode size={20} />, filename: "config.json" },
        { icon: <FileText size={20} />, filename: "readme.md" },
        { icon: <FileImage size={20} />, filename: "banner.jpg" },
        { icon: <FileVideo size={20} />, filename: "intro.mov" },
        { icon: <FileAudio size={20} />, filename: "voice_memo.wav" },
        { icon: <FileArchive size={20} />, filename: "project_backup.tar.gz" },
    ];
return (
    <div className="rounded-md h-screen col-span-1 p-2 bg-gray-900 text-white">
      <div className="h-full bg-gray-800 rounded-lg shadow-md flex flex-col ">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Files</h2>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 no-scrollbar">
          <ul className="space-y-2">
            {sidebarFiles.map((file, index) => (
              <li
                key={index}
                className="flex items-center gap-2 p-2 hover:bg-light-gray-700 rounded-md cursor-pointer"
              >
                {file.icon}
                <span className="truncate">{file.filename}</span>
              </li>
            ))}
          </ul>
        </div>
        
      </div>
    </div>
  );

}

export default FileSideBar; 