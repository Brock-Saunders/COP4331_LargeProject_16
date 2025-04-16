import React, { useEffect, useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@heroui/react";

import { File } from 'lucide-react';
import { Download, Trash2, SaveIcon, User2Icon } from "lucide-react";


interface EditorNavbarProps {
  onSave: () => void;
  onDeleteFile: () => void;
  disabled?: boolean;
}

const EditorNavbar: React.FC<EditorNavbarProps> = ({ onSave, onDeleteFile, disabled }) => {
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const userDataStr = localStorage.getItem("user_data");
    if (!userDataStr) return;

    const userData = JSON.parse(userDataStr);
    const userId = userData.userId;

    if (!userId) return;

    fetch(`https://largeproj.alexcanapp.xyz/api/users/username?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.username) {
          setUsername(data.username);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch username:", err);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user_data");
    window.location.href = "/";
  };

  return (
    <Navbar className="rounded-md border-gray-500 bg-zinc-900 px-4">
      <NavbarBrand>
      <button
        className="flex items-center space-x-2 cursor-pointer focus:outline-none"
        onClick={() => (window.location.href = "/home")}
      >
        <File />
        <p className="font-bold text-inherit">Notes App</p>
      </button>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <div className="flex gap-4">
            <button className="cursor-pointer items-center space-x-2 focus:outline-none" onClick={onSave} disabled={disabled}>
              <div className="flex items-center justify-center gap-x-1.5">
                <SaveIcon />
                Save
              </div>
            </button>
            <button className="cursor-pointer items-center space-x-2 focus:outline-none">
              <div className="flex items-center justify-center gap-x-1.5">
                <Download />
                Download
              </div>
            </button>
            <button className="cursor-pointer items-center space-x-2 focus:outline-none"  
            onClick={onDeleteFile} // Pass the current file ID
            disabled={disabled}
            >
              <div className="flex items-center justify-center gap-x-1.5">
                <Trash2 />
                Delete
              </div>
            </button>
          </div>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className=''>
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <button className="cursor-pointer items-center space-x-2 focus:outline-none">
                <div className="flex items-center justify-center gap-x-1.5">
                  <User2Icon />
                  {username || "User"}
                </div>
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat" className='bg-black rounded-md'>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default EditorNavbar;
