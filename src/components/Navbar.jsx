import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'Collections', path: '/collections' },
        { name: 'About Us', path: '/about' },
        { name: 'Testimonials', path: '/testimonials' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' }
    ];

    return (
        <nav style={{ 
            backgroundColor: 'var(--white)', 
            borderBottom: '1px solid #eaeaea', 
            position: 'sticky', 
            top: 0, 
            zIndex: 1000,
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}>
            <div className="container nav-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '90px' }}>
                <Link to="/" className="nav-logo" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textDecoration: 'none' }}>
                    <h1 style={{ fontSize: '2.2rem', margin: 0, color: 'var(--primary-green)', letterSpacing: '1px', lineHeight: 1 }}>Hawescent</h1>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase' }}>Premium Fragrances</span>
                </Link>

                {/* Desktop Nav */}
                <div className="nav-links" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    {navItems.map((item) => (
                        <Link 
                            key={item.name} 
                            to={item.path}
                            style={{ 
                                fontWeight: isActive(item.path) ? '600' : '400',
                                color: isActive(item.path) ? 'var(--primary-green)' : 'var(--text-dark)',
                                borderBottom: isActive(item.path) ? '2px solid var(--accent-gold)' : '2px solid transparent',
                                paddingBottom: '4px',
                                textTransform: 'uppercase',
                                fontSize: '0.9rem',
                                letterSpacing: '0.5px'
                            }}
                        >
                            {item.name}
                        </Link>
                    ))}
                    
                    <button style={{ background: 'none', border: 'none', marginLeft: '1rem', color: 'var(--primary-green)' }}>
                        <ShoppingBag size={24} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
