import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // ✅ New import
import HomePage from './pages/HomePage';
import MenuBar from './components/MenuBar';
import Documents from './pages/Documents';
// import EditorNavbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> {/* ✅ New route */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/documents/:docId" element={<Documents />} />
        {/* <Route path="/new-note" element={<NewNote />} /> */}
      </Routes>
    </Router>
  );
}

export default App;