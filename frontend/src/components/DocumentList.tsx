import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Download } from 'lucide-react';

interface Document {
  _id: string;
  title: string;
  description: string;
  updatedAt: string;
  content: string;
}

interface DocumentListProps {
  documents: Document[];
  error: string | null;
  onDelete: (docId: string) => void; // Add delete handler prop
  onDownload: (doc: Document) => void; // Add download handler prop
}

const DocumentList: React.FC<DocumentListProps> = ({ documents, error, onDelete, onDownload }) => {
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
          className="bg-gradient-to-br from-gray-400 to-gray-300 text-black shadow-md rounded-lg p-4 hover:shadow-lg transition relative"
        >
          <div onClick={() => handleCardClick(doc._id)} className="cursor-pointer">
          <h3 className="text-lg font-bold">{doc.title}</h3>
          <p className="text-gray-700">{doc.description}</p>
          <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-gray-600 mt-2">
            Last updated: {new Date(doc.updatedAt).toLocaleDateString()}
          </p>
          <div className=" right-2 flex space-x-2">
            <button
              className="bg-gray-400 px-3 py-1 rounded hover:bg-gray-500 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering card click
                onDelete(doc._id);
              }}
            >
                <Trash2 size={16} color="black" /> 
            </button>
            <button
              className="bg-gray-400 px-3 py-1 rounded hover:bg-gray-500 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering card click
                onDownload(doc);
              }}
            >
              <Download size={16} color="black" />
            </button>
          </div>
        </div>
        </div>
      </div>
      ))}
    </div>
  );
};

export default DocumentList;