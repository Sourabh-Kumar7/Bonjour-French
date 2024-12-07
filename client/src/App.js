import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Subscription from "./pages/Subscription";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import SignUpPage from "./pages/SignUpPage";
import EnglishToFrenchTranslator from "./pages/Demo";
import UserInfo from "./pages/UserInfo";
import CreateSubscriptionPlan from "./pages/CreatePlan";
import Home from "./pages/Home";
import UsersPage from "./pages/Users";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/subscriptionplan" element={<Subscription />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/demo" element={<EnglishToFrenchTranslator />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/create-plan" element={<CreateSubscriptionPlan />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
