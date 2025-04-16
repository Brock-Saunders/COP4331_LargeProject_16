import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface HomebarProps {
  username: string;
  onLogout: () => void;
  onSearch: (searchTerm: string) => void;
  onCreateNewDocument: () => Promise<void>;
}

const Homebar: React.FC<HomebarProps> = ({ username, onLogout, onSearch, onCreateNewDocument }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newDocumentTitle, setNewDocumentTitle] = useState('');

  const navigate = useNavigate();

  const handleSearchClick = () => {
    onSearch(searchTerm); // Trigger the search with the current search term
  };

  const handleCreateNewDocument = async () => {
    const userData = localStorage.getItem("user_data");
    if (!userData) {
      console.error("User data not found in localStorage");
      return;
    }

    const { userId } = JSON.parse(userData);

    try {
      const response = await fetch('https://largeproj.alexcanapp.xyz/api/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, title: newDocumentTitle || 'Untitled Document', content: '' }),
      });

      const data = await response.json();

      if (data.error) {
        console.error("Error creating document:", data.error);
      } else {
        const { documentId } = data;
        console.log("Document created with ID:", documentId);
        setIsPopupOpen(false); // Close the popup
        navigate(`/documents/${documentId}`); // Navigate to the new document
      }
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };


  return (
    <nav className="p-4 w-full fixed top-0 left-0 right-0 z-50 shadow-lg" style={{ backgroundColor: '#1f1f1f' }}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">Notes App</div>

        <div className="flex-grow mx-8 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gradient-to-br from-gray-400 to-gray-300 text-black placeholder:text-black w-full px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          <button
            onClick={handleSearchClick}
            className="bg-gradient-to-br from-gray-400 to-gray-300 text-black px-4 py-2 rounded-lg hover:from-gray-300 hover:to-gray-200 transition"
          >
            Search
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsPopupOpen(true)} // Open the popup
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
      {/* Popup for creating a new document */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="text-white p-6 rounded-lg shadow-lg w-96" style={{ backgroundColor: '#1f1f1f' }}>
            <h2 className="text-2xl font-bold mb-4 text-center ">Create New Document</h2>
            <input
              type="text"
              placeholder="Enter document title"
              value={newDocumentTitle}
              onChange={(e) => setNewDocumentTitle(e.target.value)}
              className="w-full px-4 py-2 bg-gradient-to-br from-gray-400 to-gray-300 text-black placeholder:text-black border border-gray-700 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsPopupOpen(false)} // Close the popup
                className="px-4 py-2 bg-gradient-to-br from-gray-400 to-gray-300 text-black rounded-lg hover:from-gray-300 hover:to-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNewDocument} // Create the document
                className="px-4 py-2 bg-gradient-to-br from-gray-400 to-gray-300 text-black rounded-lg hover:from-gray-300 hover:to-gray-200 transition"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Homebar;