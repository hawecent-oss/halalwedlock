import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <nav style={{ backgroundColor: 'var(--white)', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 1000 }}>
            <div className="container" style={{ height: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Heart fill="var(--accent-gold)" color="var(--accent-gold)" />
                    <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-green)', fontFamily: 'Playfair Display, serif' }}>
                        Hawescent
                    </span>
                </Link>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Link to="/about">About</Link>
                    <Link to="/how-it-works">How it Works</Link>
                    <Link to="/guidance">Guidance</Link>
                    <Link to="/register/male" className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>Male Register</Link>
                    <Link to="/register/female" className="btn btn-accent" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>Female Register</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
