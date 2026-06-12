import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Users, Star, CheckCircle, Lock } from 'lucide-react';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

import heroImage from '../assets/hero_couple.png';
import familyImage from '../assets/family.png';
import weddingImage from '../assets/wedding.png';
import niqabImage from '../assets/niqab_woman.png';
import ustadhImage from '../assets/ustadh_man.png';

const carouselImages = [heroImage, niqabImage, ustadhImage, familyImage, weddingImage];

const Home = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
        }, 5000); // Change image every 5 seconds
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="home-page" style={{ backgroundColor: 'var(--background-cream)' }}>
            <FloatingWhatsApp />
            
            {/* Hero Section */}
            <section style={{
                position: 'relative',
                minHeight: '85vh',
                display: 'flex',
                alignItems: 'center',
                padding: '4rem 0',
                backgroundColor: 'var(--primary-green)',
                overflow: 'hidden'
            }}>
                {/* Carousel Backgrounds */}
                {carouselImages.map((img, index) => (
                    <div key={index} style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: index === currentImageIndex ? 0.7 : 0,
                        transition: 'opacity 1.5s ease-in-out',
                        mixBlendMode: 'overlay',
                        zIndex: 1
                    }}></div>
                ))}
                
                {/* Transparent Gradient Overlay */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to right, rgba(6,78,59,0.3) 0%, rgba(6,78,59,0.05) 100%)',
                    zIndex: 2
                }}></div>
                
                <div className="container" style={{ position: 'relative', zIndex: 10, color: 'var(--white)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '800px' }}>
                    <span style={{ 
                        display: 'inline-block',
                        padding: '0.5rem 1rem', 
                        backgroundColor: 'rgba(212, 175, 55, 0.2)', 
                        color: 'var(--accent-gold)', 
                        borderRadius: '30px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        marginBottom: '1.5rem',
                        border: '1px solid rgba(212, 175, 55, 0.4)'
                    }}>Bismillah. Start Your Journey Here.</span>
                    
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: '1.1', marginBottom: '1.5rem', color: 'var(--white)', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                        Find Your <span style={{ color: 'var(--accent-gold)', fontStyle: 'italic' }}>Halal</span> Life Partner
                    </h1>
                    
                    <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', marginBottom: '2.5rem', opacity: 0.9, lineHeight: '1.6', maxWidth: '600px' }}>
                        Join the most trusted matchmaking platform for African Muslims. We focus on Deen, character, and compatibility to help you complete half your faith.
                    </p>
                    
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <Link to="/register" style={{ 
                            padding: '1rem 2.5rem', 
                            backgroundColor: 'var(--accent-gold)', 
                            color: 'var(--primary-green)', 
                            fontWeight: '600', 
                            borderRadius: '4px',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)'
                        }}>Create Free Profile</Link>
                        <Link to="/how-it-works" style={{ 
                            padding: '1rem 2.5rem', 
                            backgroundColor: 'transparent', 
                            color: 'var(--white)', 
                            fontWeight: '600', 
                            borderRadius: '4px',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            border: '2px solid var(--white)',
                            transition: 'all 0.3s ease'
                        }}>How It Works</Link>
                    </div>

                    <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '2rem', width: '100%' }}>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent-gold)' }}>5,000+</div>
                            <div style={{ fontSize: '0.85rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px' }}>Active Members</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent-gold)' }}>500+</div>
                            <div style={{ fontSize: '0.85rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px' }}>Successful Marriages</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section style={{ padding: '5rem 0', backgroundColor: 'var(--white)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span style={{ color: 'var(--accent-gold)', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem' }}>The Halalwedlock Difference</span>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-green)', marginTop: '0.5rem' }}>Matchmaking Based on Islamic Principles</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {[
                            { icon: <ShieldCheck size={40} color="var(--accent-gold)" />, title: 'Verified Profiles', desc: 'Every profile is manually vetted to ensure authenticity and serious intentions.' },
                            { icon: <Lock size={40} color="var(--accent-gold)" />, title: 'Privacy & Modesty', desc: 'Your photos and details are private. You control who sees your full profile.' },
                            { icon: <Users size={40} color="var(--accent-gold)" />, title: 'Wali Involvement', option: 'Optional', desc: 'Easily include your Wali (guardian) in conversations for transparency and blessing.' },
                            { icon: <Heart size={40} color="var(--accent-gold)" />, title: 'Deen-Focused', desc: 'Our algorithm matches you based on Islamic values, lifestyle, and life goals.' }
                        ].map((item, idx) => (
                            <div key={idx} style={{ 
                                padding: '2.5rem', 
                                backgroundColor: 'var(--background-cream)', 
                                borderRadius: '12px',
                                textAlign: 'center',
                                transition: 'transform 0.3s ease',
                                cursor: 'default'
                            }} className="feature-card">
                                <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                                    {item.icon}
                                </div>
                                <h3 style={{ color: 'var(--primary-green)', marginBottom: '1rem', fontSize: '1.25rem' }}>
                                    {item.title} {item.option && <span style={{ fontSize: '0.8rem', backgroundColor: 'var(--accent-gold)', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', verticalAlign: 'middle', marginLeft: '0.5rem' }}>{item.option}</span>}
                                </h3>
                                <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.95rem' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section style={{ padding: '6rem 0', backgroundColor: 'var(--background-alt)' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                    <div style={{ order: 2 }}>
                        <img src={familyImage} alt="Happy Muslim Family" style={{ width: '100%', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                    </div>
                    <div style={{ order: 1 }}>
                        <span style={{ color: 'var(--accent-gold)', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem' }}>Simple Process</span>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-green)', marginTop: '0.5rem', marginBottom: '2rem' }}>How Halalwedlock Works</h2>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {[
                                { step: '01', title: 'Create Your Profile', desc: 'Sign up and answer questions about your Deen, lifestyle, and what you seek in a spouse.' },
                                { step: '02', title: 'Discover Matches', desc: 'Review curated profiles of practicing Muslims who align with your values and goals.' },
                                { step: '03', title: 'Connect Securely', desc: 'Initiate contact in a safe, moderated environment. Involve your Wali whenever you are ready.' },
                                { step: '04', title: 'Complete Half Your Deen', desc: 'Insha\'Allah, find your match and proceed to Nikah with the blessings of your families.' }
                            ].map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: '1.5rem' }}>
                                    <div style={{ 
                                        width: '50px', 
                                        height: '50px', 
                                        borderRadius: '50%', 
                                        backgroundColor: 'rgba(6,78,59,0.1)', 
                                        color: 'var(--primary-green)', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        fontWeight: '700',
                                        fontSize: '1.2rem',
                                        flexShrink: 0
                                    }}>{item.step}</div>
                                    <div>
                                        <h4 style={{ color: 'var(--primary-green)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{item.title}</h4>
                                        <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.95rem' }}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <Link to="/how-it-works" style={{ 
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginTop: '2.5rem', 
                            color: 'var(--accent-gold)', 
                            fontWeight: '600',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            Learn more about our process
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section style={{ padding: '6rem 0', backgroundColor: 'var(--white)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span style={{ color: 'var(--accent-gold)', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem' }}>Alhamdulillah</span>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-green)', marginTop: '0.5rem' }}>Success Stories</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {[
                            { name: "Aisha & Ibrahim", loc: "Married Jan 2023", text: "I was hesitant about online matchmaking, but Halalwedlock's focus on Deen made me comfortable. Ibrahim's profile stood out because of his answers about prayer and family. We involved my father early on, and Alhamdulillah we are now happily married." },
                            { name: "Fatima & Umar", loc: "Married Nov 2022", text: "The Wali feature is what sold me. It allowed my brother to be part of the conversation from day one. It kept things respectful and focused on marriage rather than casual chatting. May Allah reward the team behind this platform." },
                            { name: "Zainab & Yusuf", loc: "Married Mar 2024", text: "Finding someone who shares both my cultural background and strict adherence to Islamic values was hard. Halalwedlock's detailed filtering helped me find Zainab. We clicked instantly on our understanding of marriage in Islam." }
                        ].map((review, idx) => (
                            <div key={idx} style={{ 
                                padding: '2.5rem', 
                                backgroundColor: 'var(--background-cream)', 
                                borderRadius: '12px',
                                border: '1px solid rgba(6,78,59,0.1)',
                                position: 'relative'
                            }}>
                                <div style={{ display: 'flex', gap: '2px', marginBottom: '1.5rem' }}>
                                    {[1,2,3,4,5].map(star => <Star key={star} size={16} fill="var(--accent-gold)" color="var(--accent-gold)" />)}
                                </div>
                                <p style={{ fontSize: '1rem', fontStyle: 'italic', marginBottom: '2rem', lineHeight: '1.7', color: 'var(--text-dark)' }}>
                                    "{review.text}"
                                </p>
                                <div>
                                    <h4 style={{ color: 'var(--primary-green)', fontSize: '1.1rem', marginBottom: '0.2rem' }}>{review.name}</h4>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--accent-gold)' }}>{review.loc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <Link to="/success-stories" style={{ color: 'var(--primary-green)', fontWeight: '600', textDecoration: 'none' }}>Read more success stories &rarr;</Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ padding: '6rem 0', backgroundColor: 'var(--primary-green)', color: 'white', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '700px' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Ready to complete half your Deen?</h2>
                    <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2.5rem', lineHeight: '1.6' }}>
                        Join thousands of single Muslims who are serious about finding their life partner the Halal way. Your journey to a blessed marriage starts here.
                    </p>
                    <Link to="/register" style={{ 
                        display: 'inline-block',
                        padding: '1.2rem 3rem', 
                        backgroundColor: 'var(--accent-gold)', 
                        color: 'var(--primary-green)', 
                        fontWeight: '700', 
                        borderRadius: '4px',
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontSize: '1.1rem',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
                        transition: 'transform 0.3s ease'
                    }}>Join Halalwedlock Today</Link>
                </div>
            </section>
            
            <style>{`
                .feature-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px rgba(0,0,0,0.05);
                }
            `}</style>
        </div>
    );
};

export default Home;
