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
import Details from "./components/Details/Details";
import Profile from "./components/Profile/Profile";
import OnOffer from "./components/onOffer/OnOffer";
import React from "react";
import Edit from "./components/Edit/Edit";
import PrivateRoute from "./components/Common/PrivateRoute";

function App() {
  return (
    <div className="body-container">
      <AuthProvider>
        <Navbar />

        <main id="site-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogue" element={<Catalog />} />
            <Route path="/catalogue/details/:cakeId" element={<Details />} />
            {/* UnAuthorized Routes */}

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Private Route */}
            <Route element={<PrivateRoute />}>
              <Route path="/logout" element={<Logout />} />
              <Route path="/create" element={<Create />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            {/* Owner Route */}
            <Route path="/catalogue/details/:cakeId/edit" element={<Edit />} />
            {/* <Route path="/catalogue/deals" element={<OnOffer />} /> */}
          </Routes>
        </main>
      </AuthProvider>
    </div>
  );
}

export default App;
