import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, BookOpen, CheckCircle } from 'lucide-react';

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="section hero-img img-overlay" style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&q=80&w=2000')",
                padding: 'var(--spacing-xl) 0',
                color: 'white'
            }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', maxWidth: '800px', margin: '0 auto 1.5rem', color: 'white' }}>
                        Find Your Half in a <span style={{ color: 'var(--accent-gold)' }}>Dignified</span> Way
                    </h1>
                    <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2rem', opacity: 0.9 }}>
                        Halal Wedlock Centre (Hawescent) is a faith-based platform dedicated to promoting pious marriage and family stability based on Islamic values.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link to="/register/male" className="btn btn-primary">Male Registration</Link>
                        <Link to="/register/female" className="btn btn-accent">Female Registration</Link>
                    </div>
                </div>
            </section>

            {/* Vision/Features Section */}
            <section className="section" style={{ backgroundColor: 'var(--white)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Our Islamic Vision</h2>
                        <p style={{ opacity: 0.7 }}>Building stronger communities through blessed unions.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        <div className="card" style={{ padding: '2rem', border: '1px solid #eee', borderRadius: '12px', textAlign: 'center' }}>
                            <Shield size={48} color="var(--primary-green)" style={{ marginBottom: '1rem' }} />
                            <h3>Strict Compliance</h3>
                            <p>Following Islamic principles (Halal) with no public chatting and mandatory guardian involvement.</p>
                        </div>
                        <div className="card" style={{ padding: '2rem', border: '1px solid #eee', borderRadius: '12px', textAlign: 'center' }}>
                            <Users size={48} color="var(--primary-green)" style={{ marginBottom: '1rem' }} />
                            <h3>Family Stability</h3>
                            <p>Reducing divorce rates through structured matchmaking and professional counselling.</p>
                        </div>
                        <div className="card" style={{ padding: '2rem', border: '1px solid #eee', borderRadius: '12px', textAlign: 'center' }}>
                            <BookOpen size={48} color="var(--primary-green)" style={{ marginBottom: '1rem' }} />
                            <h3>Education</h3>
                            <p>Supporting marriage preparation and child upbringing based on Sunnah and Quranic values.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Teaser */}
            <section className="section">
                <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1', minWidth: '300px' }}>
                        <h2 style={{ fontSize: '2.2rem', marginBottom: '1.5rem' }}>How Hawescent Works</h2>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <CheckCircle color="var(--accent-gold)" /> <span>Confidential registration and verification.</span>
                            </li>
                            <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <CheckCircle color="var(--accent-gold)" /> <span>Compatibility scoring based on religion and values.</span>
                            </li>
                            <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <CheckCircle color="var(--accent-gold)" /> <span>Moderated introduction with mahram involvement.</span>
                            </li>
                        </ul>
                        <Link to="/how-it-works" className="btn btn-primary" style={{ marginTop: '2rem' }}>Learn More</Link>
                    </div>
                    <div style={{ flex: '1', minWidth: '300px' }}>
                        <img
                            src="https://images.unsplash.com/photo-1512412023212-f054a9ff3f0f?auto=format&fit=crop&q=80&w=1000"
                            alt="Serene Islamic environment"
                            className="content-img"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
