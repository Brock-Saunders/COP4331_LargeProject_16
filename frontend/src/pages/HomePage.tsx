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

    const handleCreateNewDocument = () => {
        console.log("Create new document clicked");
    };

    const handleSearch = async (searchTerm: string) => {
        const userData = localStorage.getItem("user_data");
        if (!userData) return;

        const { id: userId } = JSON.parse(userData);

        try {
            const response = await fetch(`http://localhost:5000/api/documents/search?userId=${encodeURIComponent(userId)}&searchTerm=${encodeURIComponent(searchTerm)}`);
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

            const { id: userId } = JSON.parse(userData);

            try {
                const response = await fetch(`http://localhost:5000/api/documents?userId=${encodeURIComponent(userId)}`);
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
                <DocumentList documents={documents} error={error} />
            </div>
        </div>
    );
};

export default HomePage;