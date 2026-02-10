import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'var(--primary-green)', color: 'var(--white)', padding: 'var(--spacing-lg) 0' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                <div>
                    <h3 style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }}>Hawescent</h3>
                    <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>
                        Promoting pious marriage, family stability, and Islamic moral values through structured matchmaking and counselling.
                    </p>
                </div>

                <div>
                    <h4 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Quick Links</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <li><Link to="/how-it-works">How It Works</Link></li>
                        <li><Link to="/parents">Parents & Guardians</Link></li>
                        <li><Link to="/blog">Islamic Education</Link></li>
                        <li><Link to="/privacy">Privacy & Compliance</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Contact Us</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={16} /> hawescents@gmail.com</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={16} /> 09049656467</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={16} /> Lagos, Nigeria</li>
                    </ul>
                </div>
            </div>
            <div className="container" style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', fontSize: '0.8rem', opacity: 0.6 }}>
                &copy; {new Date().getFullYear()} Halal Wedlock Centre (Hawescent). All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
