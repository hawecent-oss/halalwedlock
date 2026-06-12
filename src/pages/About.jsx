import React from 'react';
import { Heart, Shield, Users, Sparkles, BookOpen } from 'lucide-react';
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
                    <h1 style={{ fontSize: '3.5rem', margin: '1rem 0', color: 'white' }}>Facilitating Halal Unions</h1>
                    <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', opacity: 0.9, lineHeight: '1.6' }}>
                        Halalwedlock was created to solve a modern problem with a timeless solution: providing a safe, dignified, and Shariah-compliant platform for African Muslims to find their life partners.
                    </p>
                </div>
            </section>

            <section style={{ backgroundColor: 'var(--background-cream)', padding: '6rem 0' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ marginBottom: '1.5rem', fontSize: '2.5rem', color: 'var(--primary-green)' }}>Our Mission</h2>
                        <img
                            src={familyImage}
                            alt="Happy Muslim Family"
                            style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '12px', marginBottom: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                        />
                        <p style={{ marginBottom: '1rem', color: 'var(--text-dark)', lineHeight: '1.7', fontSize: '1.05rem' }}>
                            Our mission is to help single Muslims fulfill half their Deen by connecting them with compatible partners in an environment that respects Islamic boundaries and family values.
                        </p>
                        <p style={{ color: 'var(--text-dark)', lineHeight: '1.7', fontSize: '1.05rem' }}>
                            We understand that finding a spouse who shares your level of faith, cultural background, and life goals can be challenging in today's world. Halalwedlock bridges this gap while maintaining the modesty and seriousness that Nikah demands.
                        </p>
                    </div>
                    
                    <div style={{ backgroundColor: 'var(--white)', padding: '3rem', borderRadius: '20px', border: '1px solid #eaeaea', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ marginBottom: '2rem', color: 'var(--primary-green)', fontSize: '2rem' }}>Our Core Values</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <li style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{ backgroundColor: 'var(--background-cream)', padding: '1rem', borderRadius: '50%' }}>
                                    <BookOpen color="var(--accent-gold)" size={24} />
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--text-dark)', fontSize: '1.2rem', marginBottom: '0.3rem' }}>Deen First</h4>
                                    <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.5' }}>We prioritize Islamic principles in every feature we build, encouraging users to focus on character and faith over superficial metrics.</p>
                                </div>
                            </li>
                            <li style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{ backgroundColor: 'var(--background-cream)', padding: '1rem', borderRadius: '50%' }}>
                                    <Shield color="var(--accent-gold)" size={24} />
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--text-dark)', fontSize: '1.2rem', marginBottom: '0.3rem' }}>Privacy & Modesty (Haya)</h4>
                                    <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.5' }}>Advanced photo privacy options and strict moderation ensure a respectful environment free from inappropriate behavior.</p>
                                </div>
                            </li>
                            <li style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{ backgroundColor: 'var(--background-cream)', padding: '1rem', borderRadius: '50%' }}>
                                    <Users color="var(--accent-gold)" size={24} />
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--text-dark)', fontSize: '1.2rem', marginBottom: '0.3rem' }}>Family Involvement</h4>
                                    <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.5' }}>We actively support and encourage the involvement of Walis (guardians) in the matchmaking process, keeping things transparent and blessed.</p>
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
