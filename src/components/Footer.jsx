import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Instagram, Twitter, Facebook, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{ backgroundColor: 'var(--primary-green)', color: 'var(--white)', paddingTop: '5rem' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
                    
                    {/* Brand Info */}
                    <div>
                        <Link to="/" style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '0.5rem', 
                            textDecoration: 'none', 
                            color: 'var(--white)',
                            marginBottom: '1.5rem'
                        }}>
                            <Heart size={24} color="var(--accent-gold)" fill="var(--accent-gold)" />
                            <span style={{ fontSize: '1.5rem', fontWeight: '700', fontFamily: 'Playfair Display, serif', letterSpacing: '1px' }}>Halalwedlock</span>
                        </Link>
                        <p style={{ opacity: 0.8, lineHeight: '1.6', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                            The premium, trustworthy Halal matchmaking platform for African Muslims. Find your life partner the Halal way.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a href="#" style={{ color: 'var(--white)', opacity: 0.8, transition: 'opacity 0.2s' }}><Instagram size={20} /></a>
                            <a href="#" style={{ color: 'var(--white)', opacity: 0.8, transition: 'opacity 0.2s' }}><Twitter size={20} /></a>
                            <a href="#" style={{ color: 'var(--white)', opacity: 0.8, transition: 'opacity 0.2s' }}><Facebook size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem', fontSize: '1.1rem', letterSpacing: '1px' }}>Platform</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <li><Link to="/how-it-works" style={{ color: 'var(--white)', textDecoration: 'none', opacity: 0.8, fontSize: '0.95rem' }}>How It Works</Link></li>
                            <li><Link to="/success-stories" style={{ color: 'var(--white)', textDecoration: 'none', opacity: 0.8, fontSize: '0.95rem' }}>Success Stories</Link></li>
                            <li><Link to="/register" style={{ color: 'var(--white)', textDecoration: 'none', opacity: 0.8, fontSize: '0.95rem' }}>Register Now</Link></li>
                            <li><Link to="/blog" style={{ color: 'var(--white)', textDecoration: 'none', opacity: 0.8, fontSize: '0.95rem' }}>Islamic Marriage Blog</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem', fontSize: '1.1rem', letterSpacing: '1px' }}>Company</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <li><Link to="/about" style={{ color: 'var(--white)', textDecoration: 'none', opacity: 0.8, fontSize: '0.95rem' }}>About Us</Link></li>
                            <li><Link to="/contact" style={{ color: 'var(--white)', textDecoration: 'none', opacity: 0.8, fontSize: '0.95rem' }}>Contact Us</Link></li>
                            <li><Link to="/privacy" style={{ color: 'var(--white)', textDecoration: 'none', opacity: 0.8, fontSize: '0.95rem' }}>Privacy Policy</Link></li>
                            <li><a href="#" style={{ color: 'var(--white)', textDecoration: 'none', opacity: 0.8, fontSize: '0.95rem' }}>Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem', fontSize: '1.1rem', letterSpacing: '1px' }}>Get in Touch</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', opacity: 0.8 }}>
                                <MapPin size={18} style={{ marginTop: '3px', flexShrink: 0 }} />
                                <span style={{ fontSize: '0.95rem' }}>Abuja, Nigeria</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', opacity: 0.8 }}>
                                <Phone size={18} style={{ flexShrink: 0 }} />
                                <span style={{ fontSize: '0.95rem' }}>+234 (0) 800 000 0000</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', opacity: 0.8 }}>
                                <Mail size={18} style={{ flexShrink: 0 }} />
                                <span style={{ fontSize: '0.95rem' }}>info@halalwedlock.com</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div style={{ 
                    borderTop: '1px solid rgba(255,255,255,0.1)', 
                    padding: '2rem 0', 
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    alignItems: 'center'
                }}>
                    <p style={{ opacity: 0.7, fontSize: '0.9rem', margin: 0 }}>
                        &copy; {currentYear} Halalwedlock (by Hawescent). All rights reserved.
                    </p>
                    <p style={{ opacity: 0.5, fontSize: '0.8rem', margin: 0 }}>
                        Strictly for Halal intentions. We do not support dating or non-Islamic practices.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
