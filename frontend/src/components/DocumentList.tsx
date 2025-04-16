import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Document {
  _id: string;
  title: string;
  description: string;
  updatedAt: string;
}

interface DocumentListProps {
  documents: Document[];
  error: string | null;
}

const DocumentList: React.FC<DocumentListProps> = ({ documents, error }) => {
  const navigate = useNavigate();

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  if (documents.length === 0) {
    return <div className="p-4 text-center">No documents found.</div>;
  }

  const handleCardClick = (docId: string) => {
    console.log("Documents array:", documents);
    navigate(`/documents/${docId}`); // Navigate to the document editor page
    console.log("Doc Id click:", docId)
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4" style={{ backgroundColor: '#1f1f1f' }}>
      {documents.map((doc, index) => (
        <div
          key={doc._id || index} // Use `doc.id` if available, otherwise fallback to `index`
          className="bg-gradient-to-br from-gray-400 to-gray-300 text-black shadow-md rounded-lg p-4 hover:shadow-lg transition"
          onClick={() => handleCardClick(doc._id)} // Navigate to document on card click
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