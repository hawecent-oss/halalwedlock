import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Search, MessageCircle, ShieldCheck } from 'lucide-react';

const HowItWorks = () => {
    return (
        <div className="how-it-works-page">
            <section style={{
                backgroundColor: 'var(--primary-green)',
                color: 'white',
                padding: '5rem 0',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0', color: 'white' }}>How Halalwedlock Works</h1>
                    <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem', opacity: 0.9 }}>
                        A simple, respectful, and Shariah-compliant journey to finding your life partner.
                    </p>
                </div>
            </section>

            <section style={{ padding: '6rem 0', backgroundColor: 'var(--background-cream)' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                        
                        {/* Step 1 */}
                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                            <div style={{ 
                                width: '80px', 
                                height: '80px', 
                                borderRadius: '50%', 
                                backgroundColor: 'var(--white)', 
                                border: '2px solid var(--accent-gold)',
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                flexShrink: 0,
                                boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
                            }}>
                                <UserPlus size={36} color="var(--primary-green)" />
                            </div>
                            <div>
                                <span style={{ color: 'var(--accent-gold)', fontWeight: '700', fontSize: '1.2rem' }}>Step 1</span>
                                <h2 style={{ color: 'var(--primary-green)', fontSize: '2rem', marginBottom: '1rem' }}>Create Your Profile</h2>
                                <p style={{ color: 'var(--text-dark)', fontSize: '1.1rem', lineHeight: '1.7' }}>
                                    Sign up and answer our comprehensive questionnaire. We ask the important questions up front: your understanding of Deen, your career goals, family expectations, and what you're looking for in a spouse. The more detailed you are, the better we can match you.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                            <div style={{ 
                                width: '80px', 
                                height: '80px', 
                                borderRadius: '50%', 
                                backgroundColor: 'var(--white)', 
                                border: '2px solid var(--accent-gold)',
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                flexShrink: 0,
                                boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
                            }}>
                                <Search size={36} color="var(--primary-green)" />
                            </div>
                            <div>
                                <span style={{ color: 'var(--accent-gold)', fontWeight: '700', fontSize: '1.2rem' }}>Step 2</span>
                                <h2 style={{ color: 'var(--primary-green)', fontSize: '2rem', marginBottom: '1rem' }}>Review Matches</h2>
                                <p style={{ color: 'var(--text-dark)', fontSize: '1.1rem', lineHeight: '1.7' }}>
                                    Our system suggests highly compatible profiles based on your preferences. Browse through curated matches, read their detailed answers, and decide who aligns with your values. You have full control over who can see your photos.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                            <div style={{ 
                                width: '80px', 
                                height: '80px', 
                                borderRadius: '50%', 
                                backgroundColor: 'var(--white)', 
                                border: '2px solid var(--accent-gold)',
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                flexShrink: 0,
                                boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
                            }}>
                                <MessageCircle size={36} color="var(--primary-green)" />
                            </div>
                            <div>
                                <span style={{ color: 'var(--accent-gold)', fontWeight: '700', fontSize: '1.2rem' }}>Step 3</span>
                                <h2 style={{ color: 'var(--primary-green)', fontSize: '2rem', marginBottom: '1rem' }}>Connect Respectfully</h2>
                                <p style={{ color: 'var(--text-dark)', fontSize: '1.1rem', lineHeight: '1.7' }}>
                                    If there is mutual interest, you can begin communicating in our secure chat environment. We encourage keeping conversations focused on marriage compatibility. You can opt to have your Wali (guardian) present in the chat room for transparency.
                                </p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                            <div style={{ 
                                width: '80px', 
                                height: '80px', 
                                borderRadius: '50%', 
                                backgroundColor: 'var(--white)', 
                                border: '2px solid var(--accent-gold)',
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                flexShrink: 0,
                                boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
                            }}>
                                <ShieldCheck size={36} color="var(--primary-green)" />
                            </div>
                            <div>
                                <span style={{ color: 'var(--accent-gold)', fontWeight: '700', fontSize: '1.2rem' }}>Step 4</span>
                                <h2 style={{ color: 'var(--primary-green)', fontSize: '2rem', marginBottom: '1rem' }}>Meet & Marry</h2>
                                <p style={{ color: 'var(--text-dark)', fontSize: '1.1rem', lineHeight: '1.7' }}>
                                    When you feel you've found the right person, it's time to involve the families fully and arrange a meeting in person. From there, Insha'Allah, you proceed to Nikah. Once married, let us know so we can celebrate your success story!
                                </p>
                            </div>
                        </div>

                    </div>
                    
                    <div style={{ textAlign: 'center', marginTop: '5rem', padding: '3rem', backgroundColor: 'var(--white)', borderRadius: '12px', border: '1px solid #eaeaea' }}>
                        <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-green)', marginBottom: '1rem' }}>Ready to start your journey?</h3>
                        <p style={{ color: '#666', marginBottom: '2rem' }}>Registration takes less than 5 minutes.</p>
                        <Link to="/register" style={{ 
                            display: 'inline-block',
                            padding: '1rem 3rem', 
                            backgroundColor: 'var(--primary-green)', 
                            color: 'var(--white)', 
                            fontWeight: '600', 
                            borderRadius: '4px',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            transition: 'background-color 0.3s ease'
                        }}>Create Profile Now</Link>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default HowItWorks;
