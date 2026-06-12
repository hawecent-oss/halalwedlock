import React from 'react';
import { Link } from 'react-router-dom';
import perfume1 from '../assets/perfume_1.png';
import familyImage from '../assets/family.png';

const Collections = () => {
    return (
        <div style={{ backgroundColor: 'var(--white)', minHeight: '100vh', padding: '4rem 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3.5rem', color: 'var(--primary-green)', marginBottom: '1rem' }}>Our Collections</h1>
                    <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                        Curated fragrance profiles to match your unique style and values.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
                    {/* Collection 1 */}
                    <div style={{ position: 'relative', height: '500px', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                        <img src={perfume1} alt="The Royal Oud Collection" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
                        <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', color: 'white' }}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontFamily: 'Playfair Display' }}>The Royal Oud</h2>
                            <p style={{ opacity: 0.9, marginBottom: '1.5rem', maxWidth: '300px' }}>Deep, rich, and traditionally elegant. For those who appreciate heritage.</p>
                            <Link to="/shop" style={{ color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Explore Collection →</Link>
                        </div>
                    </div>

                    {/* Collection 2 */}
                    <div style={{ position: 'relative', height: '500px', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                        <img src={familyImage} alt="The Family Heritage Collection" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
                        <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', color: 'white' }}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontFamily: 'Playfair Display' }}>Family Heritage</h2>
                            <p style={{ opacity: 0.9, marginBottom: '1.5rem', maxWidth: '300px' }}>Soft, welcoming, and pure. Scents that make a house feel like home.</p>
                            <Link to="/shop" style={{ color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Explore Collection →</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Collections;
