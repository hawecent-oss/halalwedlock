import React from 'react';
import { Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
    const posts = [
        {
            title: "The Role of the Wali in Modern Matchmaking",
            excerpt: "Understanding how to involve your guardian respectfully while utilizing online platforms to find a spouse.",
            date: "Oct 15, 2023",
            author: "Imam Y. Abdullah",
            category: "Islamic Guidelines"
        },
        {
            title: "5 Important Questions to Ask Before Nikah",
            excerpt: "Don't shy away from the hard questions. Here are 5 critical topics every couple must discuss before tying the knot.",
            date: "Nov 02, 2023",
            author: "Halalwedlock Team",
            category: "Advice"
        },
        {
            title: "Navigating Cultural Differences in Islamic Marriage",
            excerpt: "Islam unites us, but culture shapes us. How to navigate interracial and intercultural marriages successfully.",
            date: "Dec 12, 2023",
            author: "Dr. Fatima Ali",
            category: "Relationships"
        },
        {
            title: "Preparing Financially for Marriage",
            excerpt: "A practical guide to Mahr, wedding expenses, and setting up a household budget based on Sunnah.",
            date: "Jan 05, 2024",
            author: "Halalwedlock Team",
            category: "Preparation"
        },
        {
            title: "How to Spot Red Flags Early On",
            excerpt: "Protecting yourself from toxic individuals. Key warning signs to look out for during the talking stage.",
            date: "Feb 18, 2024",
            author: "Sr. Zainab Bello",
            category: "Safety"
        },
        {
            title: "The Importance of Istikhara in Choosing a Spouse",
            excerpt: "You've done the logical checks, now it's time for the spiritual check. How and when to pray Istikhara.",
            date: "Mar 10, 2024",
            author: "Imam Y. Abdullah",
            category: "Spirituality"
        }
    ];

    return (
        <div className="blog-page">
            <section style={{
                backgroundColor: 'var(--primary-green)',
                color: 'white',
                padding: '5rem 0',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0', color: 'white' }}>Islamic Marriage Blog</h1>
                    <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem', opacity: 0.9 }}>
                        Articles, advice, and guidance for your journey to finding a spouse and building a halal home.
                    </p>
                </div>
            </section>

            <section style={{ padding: '6rem 0', backgroundColor: 'var(--background-cream)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
                        {posts.map((post, idx) => (
                            <article key={idx} style={{ 
                                backgroundColor: 'var(--white)', 
                                borderRadius: '12px', 
                                overflow: 'hidden',
                                boxShadow: '0 10px 20px rgba(0,0,0,0.03)',
                                border: '1px solid #eaeaea',
                                transition: 'transform 0.3s ease'
                            }} className="blog-card">
                                <div style={{ height: '200px', backgroundColor: 'var(--secondary-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)' }}>
                                    <div style={{ padding: '1rem 2rem', border: '2px solid var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '600' }}>
                                        {post.category}
                                    </div>
                                </div>
                                <div style={{ padding: '2rem' }}>
                                    <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-green)', marginBottom: '1rem', lineHeight: '1.4' }}>
                                        {post.title}
                                    </h3>
                                    <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                                        {post.excerpt}
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eaeaea', paddingTop: '1.5rem', color: '#888', fontSize: '0.85rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <User size={14} />
                                            <span>{post.author}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Calendar size={14} />
                                            <span>{post.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                    
                    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                        <button style={{ 
                            padding: '1rem 2.5rem', 
                            backgroundColor: 'transparent', 
                            color: 'var(--primary-green)', 
                            fontWeight: '600', 
                            border: '2px solid var(--primary-green)',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>Load More Articles</button>
                    </div>
                </div>
            </section>
            <style>{`
                .blog-card:hover {
                    transform: translateY(-5px);
                }
            `}</style>
        </div>
    );
};

export default Blog;
