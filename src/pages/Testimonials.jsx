import React from 'react';
import { Quote } from 'lucide-react';

const Testimonials = () => {
    const reviews = [
        {
            name: "Abubakar & Fatima",
            text: "Hawecent provided a respectful environment that made us feel safe. The involvement of our families from the start was the key to our successful union.",
            date: "October 2025"
        },
        {
            name: "Omar & Zainab",
            text: "The compatibility matching was spot on. We found that our values and goals for an Islamic household were perfectly aligned.",
            date: "January 2026"
        }
    ];

    return (
        <div className="testimonials-page">
            <section className="section halal-pattern">
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Success Stories</h1>
                    <p style={{ opacity: 0.8 }}>Blessed unions that started here.</p>
                </div>
            </section>

            <section className="section" style={{ backgroundColor: 'white' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {reviews.map((review, index) => (
                        <div key={index} style={{ padding: '2rem', border: '1px solid #eee', borderRadius: '15px', position: 'relative' }}>
                            <Quote size={40} color="var(--accent-gold)" style={{ opacity: 0.2, position: 'absolute', top: '1rem', right: '1rem' }} />
                            <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '1.1rem' }}>"{review.text}"</p>
                            <h4 style={{ color: 'var(--primary-green)' }}>{review.name}</h4>
                            <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>{review.date}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Testimonials;
