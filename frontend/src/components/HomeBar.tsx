import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface HomebarProps {
  username: string;
  onLogout: () => void;
}

const Homebar: React.FC<HomebarProps> = ({ username, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const handleCreateNewDocument = () => {
    navigate('/documents'); 
  };

  return (
    <nav className="p-4 w-full fixed top-0 left-0 right-0 z-50 shadow-lg" style={{ backgroundColor: '#1f1f1f' }}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">Notes App</div>

        <div className="flex-grow mx-8">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gradient-to-br from-gray-400 to-gray-300 text-black w-full px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleCreateNewDocument}
            className="bg-gradient-to-br from-gray-400 to-gray-300 text-black px-4 py-2 rounded-lg hover:from-gray-300 hover:to-gray-200 transition"
          >
            Create New Document
          </button>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-gradient-to-br from-gray-400 to-gray-300 text-black px-4 py-2 rounded-lg hover:from-gray-300 hover:to-gray-200 transition flex items-center"
            >
              <span>{username}</span>
              <span className={`ml-2 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}>
                <FaChevronDown />
              </span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-10">
                <button
                  onClick={onLogout}
                  className="block px-4 py-2 text-sm text-white hover:bg-gray-700 w-full text-left"
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