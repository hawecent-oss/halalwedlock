import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Testimonials = () => {
    const stories = [
        { 
            name: "Aisha & Ibrahim", 
            loc: "Married Jan 2023", 
            text: "I was hesitant about online matchmaking, but Halalwedlock's focus on Deen made me comfortable. Ibrahim's profile stood out because of his answers about prayer and family. We involved my father early on, and Alhamdulillah we are now happily married. The platform made it so easy to keep things halal and respectful.",
            timeline: "Met in Aug 2022, Nikah in Jan 2023"
        },
        { 
            name: "Fatima & Umar", 
            loc: "Married Nov 2022", 
            text: "The Wali feature is what sold me. It allowed my brother to be part of the conversation from day one. It kept things respectful and focused on marriage rather than casual chatting. May Allah reward the team behind this platform. We've recommended it to all our single friends.",
            timeline: "Met in Apr 2022, Nikah in Nov 2022"
        },
        { 
            name: "Zainab & Yusuf", 
            loc: "Married Mar 2024", 
            text: "Finding someone who shares both my cultural background and strict adherence to Islamic values was hard. Halalwedlock's detailed filtering helped me find Zainab. We clicked instantly on our understanding of marriage in Islam. The team even followed up with us after our Nikah!",
            timeline: "Met in Oct 2023, Nikah in Mar 2024"
        },
        { 
            name: "Maryam & Abdullah", 
            loc: "Married Dec 2023", 
            text: "As a revert, it was difficult to find a spouse who understood my journey. Halalwedlock allowed me to explain my background thoroughly in my profile. Abdullah appreciated my honesty, and his family welcomed me with open arms. Alhamdulillah for this platform.",
            timeline: "Met in Jun 2023, Nikah in Dec 2023"
        },
        { 
            name: "Khadija & Bilal", 
            loc: "Married Aug 2023", 
            text: "We lived in different cities and probably would never have met otherwise. The detailed profiles helped us see that we had the exact same life goals. Distance didn't matter when the Deen aligned. Thank you Halalwedlock for bringing us together.",
            timeline: "Met in Feb 2023, Nikah in Aug 2023"
        },
        { 
            name: "Safiya & Tariq", 
            loc: "Married May 2024", 
            text: "I appreciated how serious everyone on the platform is. I didn't waste time talking to people who weren't ready for marriage. Tariq and I discussed important topics within the first week, involved our parents by week two, and the rest is history.",
            timeline: "Met in Jan 2024, Nikah in May 2024"
        }
    ];

    return (
        <div className="testimonials-page">
            <section style={{
                backgroundColor: 'var(--primary-green)',
                color: 'white',
                padding: '5rem 0',
                textAlign: 'center'
            }}>
                <div className="container">
                    <span style={{ color: 'var(--accent-gold)', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem' }}>Alhamdulillah</span>
                    <h1 style={{ fontSize: '3rem', margin: '1rem 0', color: 'white' }}>Success Stories</h1>
                    <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem', opacity: 0.9 }}>
                        Read how Halalwedlock has helped hundreds of Muslims complete half their Deen.
                    </p>
                </div>
            </section>

            <section style={{ padding: '6rem 0', backgroundColor: 'var(--background-cream)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
                        {stories.map((review, idx) => (
                            <div key={idx} style={{ 
                                padding: '2.5rem', 
                                backgroundColor: 'var(--white)', 
                                borderRadius: '12px',
                                border: '1px solid #eaeaea',
                                boxShadow: '0 10px 20px rgba(0,0,0,0.02)',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <div style={{ display: 'flex', gap: '2px', marginBottom: '1.5rem' }}>
                                    {[1,2,3,4,5].map(star => <Star key={star} size={18} fill="var(--accent-gold)" color="var(--accent-gold)" />)}
                                </div>
                                <p style={{ fontSize: '1.05rem', fontStyle: 'italic', marginBottom: '2rem', lineHeight: '1.7', color: 'var(--text-dark)', flex: 1 }}>
                                    "{review.text}"
                                </p>
                                <div style={{ borderTop: '1px solid #eaeaea', paddingTop: '1.5rem', marginTop: 'auto' }}>
                                    <h4 style={{ color: 'var(--primary-green)', fontSize: '1.2rem', marginBottom: '0.3rem' }}>{review.name}</h4>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: '600', marginBottom: '0.2rem' }}>{review.loc}</div>
                                    <div style={{ fontSize: '0.85rem', color: '#888' }}>{review.timeline}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '5rem', padding: '4rem 2rem', backgroundColor: 'var(--white)', borderRadius: '12px', border: '1px dashed var(--accent-gold)' }}>
                        <h3 style={{ fontSize: '2rem', color: 'var(--primary-green)', marginBottom: '1rem' }}>Will you be our next success story?</h3>
                        <p style={{ color: '#666', marginBottom: '2rem', fontSize: '1.1rem' }}>Take the first step towards finding your halal life partner today.</p>
                        <Link to="/register" style={{ 
                            display: 'inline-block',
                            padding: '1rem 3rem', 
                            backgroundColor: 'var(--accent-gold)', 
                            color: 'var(--primary-green)', 
                            fontWeight: '700', 
                            borderRadius: '4px',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)'
                        }}>Join Now</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Testimonials;
