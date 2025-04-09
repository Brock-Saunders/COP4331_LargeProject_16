import React, { useState } from 'react';

interface HomebarProps {
  username: string;
  onLogout: () => void;
  onCreateNewDocument: () => void;
}

const Homebar: React.FC<HomebarProps> = ({ username, onLogout, onCreateNewDocument }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Text Editor</div>
        <button
          onClick={onCreateNewDocument}
          className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
        >
          Create New Document
        </button>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
          >
            {username}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <div className="py-1">
                <button
                  onClick={onLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Homebar;