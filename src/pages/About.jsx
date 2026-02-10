import React from 'react';
import { Heart, Shield, Users } from 'lucide-react';

const About = () => {
    return (
        <div className="about-page">
            <section className="section hero-img img-overlay" style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1528459199261-2bc450199d70?auto=format&fit=crop&q=80&w=2000')",
                color: 'white'
            }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'white' }}>About Hawescent</h1>
                    <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem', opacity: 0.9 }}>
                        Halal Wedlock Centre (Hawescent) is more than a matchmaking site; it's a movement towards restoring the sanctity of the Muslim family unit.
                    </p>
                </div>
            </section>

            <section className="section" style={{ backgroundColor: 'white' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ marginBottom: '1.5rem' }}>Our Mission</h2>
                        <img
                            src="https://images.unsplash.com/photo-1584281729221-3965673d3301?auto=format&fit=crop&q=80&w=1000"
                            alt="Islamic study and guidance"
                            className="content-img"
                            style={{ marginBottom: '2rem' }}
                        />
                        <p style={{ marginBottom: '1rem' }}>
                            In an age where modern dating culture often conflicts with Islamic values, Hawescent provides a sanctuary for Muslims to find their lifelong partners through a process that is dignified, modest, and strictly compliant with the Shariah.
                        </p>
                        <p>
                            We aim to reduce the prevalence of adultery and fornication by facilitating early and piously guided marriages, while also providing the tools necessary for long-term marital success.
                        </p>
                    </div>
                    <div style={{ backgroundColor: 'var(--background-cream)', padding: '3rem', borderRadius: '20px', border: '1px solid var(--accent-gold)' }}>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--primary-green)' }}>Our Core Values</h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li style={{ display: 'flex', gap: '1rem' }}>
                                <Heart color="var(--accent-gold)" fill="var(--accent-gold)" size={20} />
                                <span><strong>Sincerity (Ikhlas):</strong> Every match is approached with the intention of pleasing Allah.</span>
                            </li>
                            <li style={{ display: 'flex', gap: '1rem' }}>
                                <Shield color="var(--accent-gold)" fill="var(--accent-gold)" size={20} />
                                <span><strong>Modesty (Haya):</strong> We guard the privacy and dignity of our brothers and sisters.</span>
                            </li>
                            <li style={{ display: 'flex', gap: '1rem' }}>
                                <Users color="var(--accent-gold)" fill="var(--accent-gold)" size={20} />
                                <span><strong>Community (Ummah):</strong> We believe strong families are the foundation of a strong Ummah.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
