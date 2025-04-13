import React, { useState, useEffect } from 'react';

interface Document {
  id: string;
  title: string;
  description: string;
}

const DocumentList: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    // // Fetch documents from an API or local storage
    // async function fetchDocuments() {
    //   try {
    //     const response = await fetch('http://localhost:5000/api/documents'); // Replace with API endpoint
    //     const data = await response.json();
    //     setDocuments(data);
    //   } catch (error) {
    //     console.error('Error fetching documents:', error);
    //   }
    // }

    // fetchDocuments();

    // Mock data for testing
    const mockDocuments: Document[] = [
        { id: '1', title: 'Document 1', description: 'Description of Document 1' },
        { id: '2', title: 'Document 2', description: 'Description of Document 2' },
        { id: '3', title: 'Document 3', description: 'Description of Document 3' },
        { id: '4', title: 'Document 4', description: 'Description of Document 4' },
    ];
    
    // Simulate API delay
    setTimeout(() => {
    setDocuments(mockDocuments);
    }, 500); // 500ms delayS
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-bold">{doc.title}</h3>
          <p className="text-gray-600">{doc.description}</p>
        </div>
      ))}
    </div>
  );
};

export default DocumentList;