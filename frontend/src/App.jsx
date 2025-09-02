import React from "react";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserProvider from "./context/userContext.jsx";

const App = () => {
  return (
    <div>
      <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/dashboard" exact element={<Home />} />
        <Route path="/income" exact element={<Income />} />
        <Route path="/expense" exact element={<Expense />} />
      </Routes>
    </Router>
    </UserProvider>
    </div>
  );
};

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Replace with your authentication logic

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

export default App;
