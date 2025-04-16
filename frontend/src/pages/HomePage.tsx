import React, { useEffect, useState } from "react";
import Homebar from "../components/HomeBar";
import DocumentList from "../components/DocumentList";

const HomePage = () => {
    const [username, setUsername] = useState("");
    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState<string | null>(null);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
        console.log("User logged out");
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
                body: JSON.stringify({ userId, title: 'Untitled Document', content: '' }),
            });

            const data = await response.json();

            if (data.error) {
                console.error("Error creating document:", data.error);
            } else {
                const { documentId } = data;
                console.log("Document created with ID:", documentId);
                window.location.href = `/documents/${documentId}`; // Navigate to the new document
            }
        } catch (error) {
            console.error("Error creating document:", error);
        }
    };

    const handleSearch = async (searchTerm: string) => {
        const userData = localStorage.getItem("user_data");
        if (!userData) return;

        const { userId: userId } = JSON.parse(userData);

        try {
            const response = await fetch(`https://largeproj.alexcanapp.xyz/api/documents/search?userId=${encodeURIComponent(userId)}&searchTerm=${encodeURIComponent(searchTerm)}`);
            const data = await response.json();

            if (data.error) {
                console.error("Error searching documents:", data.error);
                setError(data.error);
            } else {
                setDocuments(data.documents);
            }
        } catch (error) {
            console.error("Error searching documents:", error);
            setError("Failed to fetch documents");
        }
    };

    useEffect(() => {
        const fetchDocuments = async () => {
            const userData = localStorage.getItem("user_data");
            if (!userData) {
                console.error("User data not found in localStorage");
                setError("User not logged in");
                return;
            }

            const { userId: userId } = JSON.parse(userData);

            try {
                const response = await fetch(`https://largeproj.alexcanapp.xyz/api/documents?userId=${encodeURIComponent(userId)}`);
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
            }
        };

        fetchDocuments();
    }, []);

    useEffect(() => {
        const fetchUsername = () => {
            const userData = localStorage.getItem("user_data");
            if (!userData) {
                console.error("User data not found in localStorage");
                return;
            }

            const parsedUserData = JSON.parse(userData);
            const username = parsedUserData.login;
            if (!username) {
                console.error("Username not found in parsed user data");
                return;
            }

            setUsername(username);
        };

        fetchUsername();
    }, []);

    return (
        <div className="min-h-screen text-white" style={{ backgroundColor: '#1f1f1f' }}>
            <Homebar
                username={username}
                onLogout={handleLogout}
                onCreateNewDocument={handleCreateNewDocument}
                onSearch={handleSearch}
            />
            <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <DocumentList
                documents={documents}
                error={error}
                onDelete={async (docId) => {
                    const confirmed = window.confirm("Are you sure you want to delete this document?");
                    if (!confirmed) return;

                    const userData = localStorage.getItem("user_data");
                    if (!userData) {
                        console.error("User data not found in localStorage");
                        return;
                    }

                    const { userId } = JSON.parse(userData);

                    try {
                        console.log("Deleting document with ID:", docId);
                        const response = await fetch(`https://largeproj.alexcanapp.xyz/api/documents/delete`, {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ userId, documentId: docId }),
                    });

                    const data = await response.json();
                    console.log("Delete response:", data);
                    if (data.error) {
                        console.error("Error deleting document:", data.error);
                    } else {
                        console.log("Document deleted successfully");
                        setDocuments((prevDocs) => prevDocs.filter((doc) => doc._id !== docId));
                    }
                    } catch (error) {
                    console.error("Error deleting document:", error);
                    }
                }}
                onDownload={(doc) => {
                    const element = document.createElement('a');
                    const fileBlob = new Blob([doc.content], { type: 'text/html' });
                    element.href = URL.createObjectURL(fileBlob);
                    element.download = `${doc.title}.html`;
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                }}
            />
            </div>
        </div>
    );
};

export default HomePage;