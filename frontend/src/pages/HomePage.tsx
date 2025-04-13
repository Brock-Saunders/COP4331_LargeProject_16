import Homebar from "../components/HomeBar"; // Make sure this matches the actual filename
import DocumentList from "../components/DocumentList";

const HomePage = () => {
    const username = "JohnDoe";
    const handleLogout = () => {
        console.log("User logged out");
    };
    const handleCreateNewDocument = () => {
        console.log("Create new document clicked");
    };
    
    return (
        <div className="min-h-screen bg-gray-100">
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