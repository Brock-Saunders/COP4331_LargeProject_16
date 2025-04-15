import React, { useEffect, useState } from "react";
import Homebar from "../components/HomeBar"; // Make sure this matches the actual filename
import DocumentList from "../components/DocumentList";

const HomePage = () => {
    const [username, setUsername] = useState(""); // Use state to manage the username
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
        console.log("User logged out");
    };
    const handleCreateNewDocument = () => {
        console.log("Create new document clicked");
    };

    useEffect(() => {
        // Fetch the username from localStorage
        const fetchUsername = () => {
            const userData = localStorage.getItem("user_data"); // Retrieve the full user data
            if (!userData) {
                console.error("User data not found in localStorage");
                return;
            }
    
            const parsedUserData = JSON.parse(userData); // Parse the user data
            const username = parsedUserData.login; // Extract the username
            if (!username) {
                console.error("Username not found in parsed user data");
                return;
            }
    
            setUsername(username); // Set the username in state
        };
    
        fetchUsername();
    }, []); // Empty dependency array ensures this runs only once on component mount
    
    return (
        <div className="min-h-screen text-white" style={{ backgroundColor: '#1f1f1f' }}>
            <Homebar
                username={username}
                onLogout={handleLogout}
                onCreateNewDocument={handleCreateNewDocument}
            />
            <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <DocumentList />
            </div>
        </div>
    );
}

export default HomePage;