import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Testimonials from './pages/Testimonials';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import HowItWorks from './pages/HowItWorks';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProfessionalDashboard from './pages/admin/ProfessionalDashboard';
import SeekerDashboard from './pages/dashboard/SeekerDashboard';
import WaliDashboard from './pages/dashboard/WaliDashboard';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--background-cream)' }}>
        <Routes>
          {/* Admin Routes - No layout (Navbar/Footer) wrapper */}
          <Route path="/superadmin/*" element={
            <ProtectedRoute allowedRoles={['super_admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/professional/*" element={
            <ProtectedRoute allowedRoles={['psychologist', 'medical_officer', 'super_admin']}>
              <ProfessionalDashboard />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/*" element={<SeekerDashboard />} />
          <Route path="/wali-dashboard/*" element={<WaliDashboard />} />
          {/* Public Routes with Layout */}
          <Route path="*" element={
            <>
              <Navbar />
              <main style={{ flex: 1 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/success-stories" element={<Testimonials />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  {/* Fallback */}
                  <Route path="*" element={<Home />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
