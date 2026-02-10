import React from 'react';
import { Target, Scale, MapPin, Zap } from 'lucide-react';

const Compatibility = () => {
    const criteria = [
        {
            icon: <Scale color="var(--primary-green)" />,
            title: "Religious Practice",
            desc: "Level of daily prayer, Quranic engagement, and adherence to Sunnah."
        },
        {
            icon: <Target color="var(--primary-green)" />,
            title: "Marriage Goals",
            desc: "Expectations for family life, child upbringing, and future aspirations."
        },
        {
            icon: <MapPin color="var(--primary-green)" />,
            title: "Location & Logistics",
            desc: "Current location and willingness to relocate after marriage."
        },
        {
            icon: <Zap color="var(--primary-green)" />,
            title: "Values & Personality",
            desc: "Alignment in character, temperament, and family values."
        }
    ];

    return (
        <div className="compatibility-page">
            <section className="section halal-pattern">
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Compatibility & Matching</h1>
                    <p style={{ opacity: 0.8 }}>Scientific matching meet Islamic ethics.</p>
                </div>
            </section>

            <section className="section" style={{ backgroundColor: 'white' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {criteria.map((item, index) => (
                            <div key={index} style={{ padding: '2.5rem', border: '1px solid #f0f0f0', borderRadius: '15px', background: '#fafafa' }}>
                                <div style={{ marginBottom: '1rem' }}>{item.icon}</div>
                                <h3 style={{ marginBottom: '0.5rem' }}>{item.title}</h3>
                                <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '4rem', padding: '3rem', backgroundColor: 'var(--primary-green)', borderRadius: '20px', color: 'white', textAlign: 'center' }}>
                        <h2 style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }}>Admin Moderated Matching</h2>
                        <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
                            Unlike dating apps, our matching is an assisted process. Admin team reviews compatibility scores and facilitates introductions only when suitability is high.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Compatibility;
