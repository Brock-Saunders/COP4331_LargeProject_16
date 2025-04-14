import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface HomebarProps {
  username: string;
  onLogout: () => void;
  onCreateNewDocument: () => void;
}

const Homebar:React.FC<HomebarProps> = ({ username, onLogout, onCreateNewDocument }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  return (
    <nav className="bg-blue-600 p-4 w-full fixed top-0 left-0 right-0 z-50 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">Text Editor</div>

        <div className="flex-grow mx-8">
          <input
            type="text"
            placeholder="Search..."
            className="bg-white text-blue-600 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={onCreateNewDocument}
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            Create New Document
          </button>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition flex items-center"
            >
              <span>{username}</span>
              <span className={`ml-2 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}>
                <FaChevronDown />
              </span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <button
                  onClick={onLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Homebar;
