import React from 'react';

const Blog = () => {
    const posts = [
        {
            title: "The Importance of Niyah in Marriage",
            excerpt: "Starting your marital journey with the right intention is the foundation of a blessed home.",
            author: "Sheikh Yusuf",
            category: "Preparation"
        },
        {
            title: "Navigating the First Year of Marriage",
            excerpt: "Tips on communication, patience, and building a strong spiritual bond with your spouse.",
            author: "Dr. Maryam",
            category: "Advice"
        }
    ];

    return (
        <div className="blog-page">
            <section className="section halal-pattern">
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Islamic Family Education</h1>
                    <p style={{ opacity: 0.8 }}>Knowledge and wisdom for a successful home.</p>
                </div>
            </section>

            <section className="section" style={{ backgroundColor: 'white' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
                        {posts.map((post, index) => (
                            <article key={index} style={{ borderBottom: '1px solid #eee', paddingBottom: '2rem' }}>
                                <span style={{ color: 'var(--accent-gold)', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase' }}>{post.category}</span>
                                <h2 style={{ fontSize: '1.8rem', margin: '0.5rem 0' }}>{post.title}</h2>
                                <p style={{ opacity: 0.7, marginBottom: '1.5rem' }}>{post.excerpt}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontWeight: '600' }}>By {post.author}</span>
                                    <a href="#" style={{ color: 'var(--secondary-green)', fontWeight: '700' }}>Read More &rarr;</a>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blog;
