import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, BookOpen, CheckCircle } from 'lucide-react';
import african1 from '../assets/african_1.jpg';
import african2 from '../assets/african_2.jpg';
import african3 from '../assets/african_3.jpg';

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        {
            url: african1,
            label: "Dignified Companionship"
        },
        {
            url: african2,
            label: "Blessed Future"
        },
        {
            url: african3,
            label: "Pious Unions"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="section hero-img img-overlay" style={{
                backgroundColor: 'var(--primary-green)',
                backgroundImage: "url('https://www.transparenttextures.com/patterns/islamic-art.png')",
                padding: 'var(--spacing-xl) 0',
                color: 'white'
            }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap-reverse' }}>
                    <div style={{ flex: '1.2', minWidth: '320px', textAlign: 'left' }}>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: 'white' }}>
                            Find Your Half in a <span style={{ color: 'var(--accent-gold)' }}>Dignified</span> Way
                        </h1>
                        <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
                            Halal Wedlock Centre (Hawescent) is a faith-based platform dedicated to promoting pious marriage and family stability within the African Muslim community based on Islamic values.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/register/male" className="btn btn-primary">Male Registration</Link>
                            <Link to="/register/female" className="btn btn-accent">Female Registration</Link>
                        </div>
                    </div>

                    <div style={{ flex: '1', display: 'flex', justifyContent: 'center', minWidth: '320px' }}>
                        <div className="enclave-container">
                            {slides.map((slide, index) => (
                                <div key={index}>
                                    <img
                                        src={slide.url}
                                        alt={slide.label}
                                        className={`slideshow-img ${currentSlide === index ? 'active' : ''}`}
                                    />
                                    {currentSlide === index && (
                                        <div className="enclave-overlay">{slide.label}</div>
                                    )}
                                </div>
                            ))}
                        </div>
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
                            src="https://images.unsplash.com/photo-1585036156171-3839efc229b7?auto=format&fit=crop&q=80&w=1000"
                            alt="Islamic guidance and spiritual counsel"
                            className="content-img"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
