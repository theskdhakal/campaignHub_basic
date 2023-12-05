import logo from "./logo.svg";
import "./App.css";

import { Home } from "./page/home/Home";
import { Login } from "./page/login-register/Login";
import { Register } from "./page/login-register/Register";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "./page/user/Dashboard";
import { useSelector } from "react-redux";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/:userId" element={<Dashboard />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
