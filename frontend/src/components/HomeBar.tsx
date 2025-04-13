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
    <nav className="bg-blue-600 p-4 w-full fixed top-0 z-50 shadow">
      <div className="max-w-7xl mx-auto flex flex-row justify-between items-center px-4">
        <div className="text-white text-xl font-bold">Text Editor</div>
        <div className="flex flex-row items-center space-x-4">
          <button
            onClick={onCreateNewDocument}
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition whitespace-nowrap"
          >
            Create New Document
          </button>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition whitespace-nowrap"
            >
              {username}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <button
                  onClick={onLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Homebar;
