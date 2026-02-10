import React from 'react';
import { BookOpen, HelpCircle, HeartHandshake } from 'lucide-react';

const MarriageGuidance = () => {
    return (
        <div className="guidance-page">
            <section className="section halal-pattern">
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Guidance & Counselling</h1>
                    <p style={{ opacity: 0.8 }}>Nurturing successful Islamic marriages from the very beginning.</p>
                </div>
            </section>

            <section className="section" style={{ backgroundColor: 'white' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                        <div style={{ padding: '2rem', border: '1px solid #eee', borderRadius: '15px' }}>
                            <BookOpen size={32} color="var(--primary-green)" style={{ marginBottom: '1rem' }} />
                            <h3>Pre-Marital Education</h3>
                            <p style={{ marginBottom: '1.5rem' }}>Understanding the rights and responsibilities of spouses in Islam is crucial before entering Nikah.</p>
                            <ul style={{ listStyle: 'circle', paddingLeft: '1.5rem', opacity: 0.8 }}>
                                <li>Basics of the Nikah contract</li>
                                <li>Financial rights of the wife</li>
                                <li>Leadership and companionship</li>
                            </ul>
                        </div>

                        <div style={{ padding: '2rem', border: '1px solid #eee', borderRadius: '15px' }}>
                            <HeartHandshake size={32} color="var(--primary-green)" style={{ marginBottom: '1rem' }} />
                            <h3>Professional Counselling</h3>
                            <p style={{ marginBottom: '1.5rem' }}>Access to qualified Islamic counsellors to help navigate compatibility questions or early marital hurdles.</p>
                            <button className="btn btn-primary">Schedule a Session</button>
                        </div>

                        <div style={{ padding: '2rem', border: '1px solid #eee', borderRadius: '15px' }}>
                            <HelpCircle size={32} color="var(--primary-green)" style={{ marginBottom: '1rem' }} />
                            <h3>Asked Questions</h3>
                            <p style={{ marginBottom: '1.5rem' }}>Common concerns about the matching process, mahram involvement, and Islamic etiquette.</p>
                            <a href="#" style={{ color: 'var(--secondary-green)', fontWeight: '600' }}>Explore FAQs &rarr;</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MarriageGuidance;
