import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Document {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
}

const DocumentList: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      const userData = localStorage.getItem("user_data");
      if (!userData) {
        console.error("User data not found in localStorage");
        setError("User not logged in");
        setLoading(false);
        return;
      }
   
      const parsedUserData = JSON.parse(userData);
      const userId = parsedUserData.id;
   
      try {
        // Using GET with query parameters - proper RESTful approach
        const response = await fetch(`http://localhost:5000/api/documents?userId=${encodeURIComponent(userId)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
   
        const data = await response.json();
   
        if (data.error) {
          console.error("Error fetching documents:", data.error);
          setError(data.error);
        } else {
          setDocuments(data.documents);
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
        setError("Failed to fetch documents");
      } finally {
        setLoading(false);
      }
    };
    
    fetchDocuments();
  }, []);
  
  if (loading) {
    return <div className="p-4 text-center">Loading documents...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }
  
  if (documents.length === 0) {
    return <div className="p-4 text-center">No documents found.</div>;
  }

  const handleCardClick = (docId: string) => {
    navigate(`/documents/${docId}`); // Navigate to the document editor page
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4" style={{ backgroundColor: '#1f1f1f' }}>
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="bg-gradient-to-br from-gray-400 to-gray-300 text-black shadow-md rounded-lg p-4 hover:shadow-lg transition"
          onClick={() => handleCardClick(doc.id)} //navaigate to document on card click
        >
          <h3 className="text-lg font-bold">{doc.title}</h3>
          <p className="text-gray-700">{doc.description}</p>
          <p className="text-xs text-gray-600 mt-2">
            Last updated: {new Date(doc.updatedAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DocumentList;
