import React from 'react';
import { Heart, Shield, Users, Sparkles } from 'lucide-react';
import familyImage from '../assets/family.png';

const About = () => {
    return (
        <div className="about-page">
            <section style={{
                backgroundColor: 'var(--primary-green)',
                color: 'white',
                padding: '6rem 0',
                textAlign: 'center'
            }}>
                <div className="container">
                    <span style={{ color: 'var(--accent-gold)', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem' }}>Our Story</span>
                    <h1 style={{ fontSize: '3.5rem', margin: '1rem 0', color: 'white' }}>Crafting Elegance</h1>
                    <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem', opacity: 0.9, lineHeight: '1.6' }}>
                        Hawescent is a premium fragrance house dedicated to providing luxurious, halal-certified scents that honor Islamic traditions while embracing modern sophistication.
                    </p>
                </div>
            </section>

            <section style={{ backgroundColor: 'var(--background-cream)', padding: '6rem 0' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ marginBottom: '1.5rem', fontSize: '2.5rem', color: 'var(--primary-green)' }}>Our Mission</h2>
                        <img
                            src={familyImage}
                            alt="Premium Islamic lifestyle"
                            style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '12px', marginBottom: '2rem', boxShadow: 'var(--shadow-md)' }}
                        />
                        <p style={{ marginBottom: '1rem', color: 'var(--text-dark)', lineHeight: '1.7', fontSize: '1.05rem' }}>
                            Our mission is to provide premium fragrances that align with Islamic values while helping Muslims express confidence, dignity, and excellence. We believe that smelling good is a Sunnah that should be accessible in its most premium form.
                        </p>
                        <p style={{ color: 'var(--text-dark)', lineHeight: '1.7', fontSize: '1.05rem' }}>
                            Every bottle of Hawescent is meticulously crafted using the finest ethically sourced ingredients, ensuring purity (Taharah) without compromising on longevity or projection.
                        </p>
                    </div>
                    
                    <div style={{ backgroundColor: 'var(--white)', padding: '3rem', borderRadius: '20px', border: '1px solid #eaeaea', boxShadow: 'var(--shadow-md)' }}>
                        <h3 style={{ marginBottom: '2rem', color: 'var(--primary-green)', fontSize: '2rem' }}>The Hawescent Standard</h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <li style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{ backgroundColor: 'var(--background-cream)', padding: '1rem', borderRadius: '50%' }}>
                                    <Sparkles color="var(--accent-gold)" size={24} />
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--text-dark)', fontSize: '1.2rem', marginBottom: '0.3rem' }}>Excellence (Ihsan)</h4>
                                    <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.5' }}>We craft the highest quality fragrances with attention to every single detail.</p>
                                </div>
                            </li>
                            <li style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{ backgroundColor: 'var(--background-cream)', padding: '1rem', borderRadius: '50%' }}>
                                    <Shield color="var(--accent-gold)" size={24} />
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--text-dark)', fontSize: '1.2rem', marginBottom: '0.3rem' }}>Trustworthiness (Amanah)</h4>
                                    <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.5' }}>Transparent ingredient sourcing and 100% alcohol-free options for the conscious buyer.</p>
                                </div>
                            </li>
                            <li style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{ backgroundColor: 'var(--background-cream)', padding: '1rem', borderRadius: '50%' }}>
                                    <Users color="var(--accent-gold)" size={24} />
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--text-dark)', fontSize: '1.2rem', marginBottom: '0.3rem' }}>Family (Usrah)</h4>
                                    <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.5' }}>Creating memorable scents that become part of beautiful family traditions and Eid celebrations.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
