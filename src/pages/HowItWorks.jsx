import React from 'react';
import { UserPlus, UserCheck, Search, Heart } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        {
            icon: <UserPlus size={40} />,
            title: "1. Secure Registration",
            desc: "Complete our comprehensive gender-specific registration form. Share your values, sect, and level of practice."
        },
        {
            icon: <UserCheck size={40} />,
            title: "2. Admin Verification",
            desc: "All profiles undergo manual review by our admin team to ensure sincerity and compliance with Islamic standards."
        },
        {
            icon: <Search size={40} />,
            title: "3. Compatibility Matching",
            desc: "Our AI-assisted system suggests potential matches based on religious practice, goals, and family involvement."
        },
        {
            icon: <Heart size={40} />,
            title: "4. Guided Introduction",
            desc: "If both parties agree, a moderated introduction occurs, ideally with the involvement of a Wali or guardian."
        }
    ];

    return (
        <div className="how-it-works-page">
            <section className="section halal-pattern">
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>The Journey to Nikah</h1>
                    <p style={{ opacity: 0.8 }}>A simple, ethical, and guided 4-step process.</p>
                </div>
            </section>

            <section className="section" style={{ backgroundColor: 'white' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {steps.map((step, index) => (
                            <div key={index} style={{ textAlign: 'center', padding: '2rem', borderRadius: '15px', border: '1px solid #f0f0f0', transition: 'transform 0.3s ease' }} className="step-card">
                                <div style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                                    {step.icon}
                                </div>
                                <h3 style={{ marginBottom: '1rem' }}>{step.title}</h3>
                                <p style={{ fontSize: '0.95rem', opacity: 0.7 }}>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;
