import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Send } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'var(--primary-green)', color: 'var(--white)', padding: 'var(--spacing-lg) 0 2rem 0' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
                <div>
                    <Link to="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textDecoration: 'none', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '2rem', margin: 0, color: 'var(--white)', letterSpacing: '1px', lineHeight: 1 }}>Hawescent</h2>
                        <span style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase' }}>Premium Fragrances</span>
                    </Link>
                    <p style={{ opacity: 0.8, fontSize: '0.95rem', lineHeight: '1.8' }}>
                        Premium scents crafted for Muslim individuals and families who value purity, sophistication and lasting impressions.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                        <a href="#" style={{ color: 'var(--accent-gold)' }}><Instagram size={20} /></a>
                        <a href="#" style={{ color: 'var(--accent-gold)' }}><Facebook size={20} /></a>
                        <a href="#" style={{ color: 'var(--accent-gold)' }}><Twitter size={20} /></a>
                    </div>
                </div>

                <div>
                    <h4 style={{ color: 'var(--white)', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: '500' }}>Quick Links</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <li><Link to="/shop" style={{ opacity: 0.8 }}>Shop Collection</Link></li>
                        <li><Link to="/about" style={{ opacity: 0.8 }}>Our Story</Link></li>
                        <li><Link to="/blog" style={{ opacity: 0.8 }}>Fragrance Guide</Link></li>
                        <li><Link to="/contact" style={{ opacity: 0.8 }}>Contact Support</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 style={{ color: 'var(--white)', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: '500' }}>Contact Us</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', opacity: 0.8 }}><Mail size={16} color="var(--accent-gold)" /> hawecents@gmail.com</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', opacity: 0.8 }}><Phone size={16} color="var(--accent-gold)" /> +234 904 965 6467</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', opacity: 0.8 }}><MapPin size={16} color="var(--accent-gold)" /> Oyo, Nigeria</li>
                    </ul>
                </div>

                <div>
                    <h4 style={{ color: 'var(--white)', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: '500' }}>Newsletter</h4>
                    <p style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '1rem' }}>Subscribe to receive updates on new collections and exclusive offers.</p>
                    <form style={{ display: 'flex', gap: '0.5rem' }}>
                        <input 
                            type="email" 
                            placeholder="Your email address" 
                            style={{ padding: '0.8rem', borderRadius: '4px', border: 'none', width: '100%', outline: 'none' }}
                        />
                        <button type="button" style={{ padding: '0.8rem 1rem', backgroundColor: 'var(--accent-gold)', color: 'var(--primary-green)', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
            <div className="container" style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', fontSize: '0.85rem', opacity: 0.6 }}>
                &copy; {new Date().getFullYear()} Hawescent Premium Fragrances. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
