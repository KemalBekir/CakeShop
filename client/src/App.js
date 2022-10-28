import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Register from "./components/Register/Register";
import Create from "./components/Create/Create";
import Catalog from "./components/Catalog/Catalog";

function App() {
  return (
    <div className="body-container">
      <AuthProvider>
        <Navbar />

        <main id="site-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<Create />} />
            <Route path="/catalogue" element={<Catalog />} />
          </Routes>
        </main>
      </AuthProvider>
    </div>
  );
}

export default App;
