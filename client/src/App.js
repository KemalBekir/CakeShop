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
import { CakesProvider } from "./contexts/cakeContext";
import OwnerRoute from "./components/Common/OwnerRoute";
import Search from "./components/Search/Search";
import Footer from "./components/Footer/Footer";
import { ChatProvider } from "./contexts/chatContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div className="body-container">
        <AuthProvider>
          <ChatProvider>
            <Navbar />

            <main id="site-content">
              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              <CakesProvider>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/catalogue" element={<Catalog />} />
                  <Route
                    path="/catalogue/details/:cakeId"
                    element={<Details />}
                  />
                  <Route path="/catalogue/search" element={<Search />} />
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
                  <Route element={<OwnerRoute />}>
                    <Route
                      path="/catalogue/details/:cakeId/edit"
                      element={<Edit />}
                    />
                  </Route>
                  {/* <Route path="/catalogue/deals" element={<OnOffer />} /> */}
                </Routes>
              </CakesProvider>
            </main>
          </ChatProvider>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
