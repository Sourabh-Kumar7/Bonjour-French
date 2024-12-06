import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import JobListings from "./pages/JobListings";
import Subscription from "./pages/Subscription";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CompanyShowcase from "./pages/CompanyShowcase";
import AdminDashboard from "./pages/AdminDashboard";
import AddJob from "./pages/AddJob";
import SignUpPage from "./pages/SignUpPage";





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/joblistings" element={<JobListings />} />
        <Route path="/subscriptionplan" element={<Subscription />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/companyshowcase" element={<CompanyShowcase />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/add-job" element={<AddJob />} />
      </Routes>
    </Router>
  );
}

export default App;
