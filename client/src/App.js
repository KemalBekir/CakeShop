import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="body-container">
      <AuthProvider>
        <Navbar />

        <main id="site-content">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </AuthProvider>
    </div>
  );
}

export default App;
