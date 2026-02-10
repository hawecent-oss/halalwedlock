import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PagePlaceholder from './components/PagePlaceholder';

import Home from './pages/Home';
import RegisterMale from './pages/RegisterMale';
import RegisterFemale from './pages/RegisterFemale';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import MarriageGuidance from './pages/MarriageGuidance';
import ParentsGuardians from './pages/ParentsGuardians';

import Compatibility from './pages/Compatibility';
import Testimonials from './pages/Testimonials';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AdminDashboard from './pages/AdminDashboard';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/register/male" element={<RegisterMale />} />
            <Route path="/register/female" element={<RegisterFemale />} />
            <Route path="/compatibility" element={<Compatibility />} />
            <Route path="/guidance" element={<MarriageGuidance />} />
            <Route path="/parents" element={<ParentsGuardians />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
