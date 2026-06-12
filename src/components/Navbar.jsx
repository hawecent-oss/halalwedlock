import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import logoImage from '../assets/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <nav style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'var(--background-cream)',
            boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0.05)' : 'none',
            transition: 'all 0.3s ease',
            padding: '1rem 0'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    textDecoration: 'none', 
                    color: 'var(--primary-green)' 
                }}>
                    <Heart size={28} color="var(--accent-gold)" fill="var(--accent-gold)" />
                    <span style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: '700', 
                        fontFamily: 'Playfair Display, serif',
                        letterSpacing: '1px'
                    }}>
                        Halalwedlock
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="desktop-nav" style={{ display: 'none', gap: '2rem', alignItems: 'center' }}>
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/how-it-works" className="nav-link">How It Works</Link>
                    <Link to="/success-stories" className="nav-link">Success Stories</Link>
                    <Link to="/about" className="nav-link">About</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>
                    <Link to="/register" style={{
                        padding: '0.6rem 1.5rem',
                        backgroundColor: 'var(--primary-green)',
                        color: 'white',
                        borderRadius: '30px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '0.95rem',
                        transition: 'all 0.2s'
                    }} className="btn-primary-hover">Find Your Match</Link>
                </div>

                {/* Mobile Toggle */}
                <button 
                    className="mobile-nav-toggle" 
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'block', color: 'var(--primary-green)' }}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: '100%',
                    backgroundColor: 'white',
                    padding: '2rem',
                    boxShadow: '0 10px 15px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem'
                }}>
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/how-it-works" className="nav-link">How It Works</Link>
                    <Link to="/success-stories" className="nav-link">Success Stories</Link>
                    <Link to="/about" className="nav-link">About</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>
                    <Link to="/register" style={{
                        padding: '0.8rem',
                        backgroundColor: 'var(--primary-green)',
                        color: 'white',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        textAlign: 'center',
                        fontWeight: '600'
                    }}>Find Your Match</Link>
                </div>
            )}
            
            <style>{`
                @media (min-width: 992px) {
                    .desktop-nav { display: flex !important; }
                    .mobile-nav-toggle { display: none !important; }
                }
                .nav-link {
                    color: var(--text-dark);
                    text-decoration: none;
                    font-weight: 500;
                    font-size: 0.95rem;
                    transition: color 0.2s;
                }
                .nav-link:hover { color: var(--accent-gold); }
                .btn-primary-hover:hover { background-color: var(--secondary-green) !important; transform: translateY(-2px); }
            `}</style>
        </nav>
    );
};

export default Navbar;
