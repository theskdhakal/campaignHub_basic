import logo from "./logo.svg";
import "./App.css";

import { Home } from "./page/home/Home";
import { Login } from "./page/login-register/Login";
import { Register } from "./page/login-register/Register";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "./page/user/Dashboard";
import { useSelector } from "react-redux";
import { EditProfile } from "./page/user/EditProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Dashboard/:userId" element={<Dashboard />} />
        <Route path="/editProfile/:userId" element={<EditProfile />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
