import React, { useState, useEffect } from 'react';

interface Document {
  id: string;
  title: string;
  description: string;
}

const DocumentList: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    // Uncomment this section to fetch documents from an API
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
    }, 500); // 500ms delay
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4" style={{ backgroundColor: '#1f1f1f' }}>
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="bg-gradient-to-br from-gray-400 to-gray-300 text-black shadow-md rounded-lg p-4 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-bold">{doc.title}</h3>
          <p className="text-gray-700">{doc.description}</p>
        </div>
      ))}
    </div>
  );
};

export default DocumentList;