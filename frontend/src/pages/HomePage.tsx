import Homebar from "../components/HomeBar";
import DocumentList from "../components/DocumentList";

const CardPage = () => {
    const username = "JohnDoe"; // Replace with dynamic username
    const handleLogout = () => {
        console.log("User logged out");
        // Add logout logic here
    };
    const handleCreateNewDocument = () => {
        console.log("Create new document clicked");
        // Add logic to create a new document here
    };

    return (
        <div>
            <Homebar
                username = {username}
                onLogout = {handleLogout}
                onCreateNewDocument = {handleCreateNewDocument}
            />
            <DocumentList />
        </div>
    );
}
export default CardPage;