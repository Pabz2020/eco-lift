import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./App.css";
import SubNavBar from "./Components/SubNavBar/SubNavBar";
import Hero from "./Pages/Hero section/Hero";
import OurService from "./Pages/Our services/OurService";
import AboutUs from "./Pages/About us/AboutUs";
import Contact from "./Pages/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/login/Login";
import Register from "./Components/register/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import ServiceDetails from './Pages/Our services/ServiceDetails';
import AllServices from './Pages/Our services/AllServices';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Whether animation should happen only once
    });
  }, []);

  return (
    <div className="container">

      <SubNavBar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Hero />} />
        <Route path="/OurService" element={<OurService />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Hero" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<OurService />} />
        <Route path="/services/all" element={<AllServices />} />
        <Route path="/services/:serviceId" element={<ServiceDetails />} />

        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
