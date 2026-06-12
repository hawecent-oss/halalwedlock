import React from 'react';

const Blog = () => {
    const posts = [
        {
            title: "The Best Perfumes for Muslims: Finding Your Signature Halal Scent",
            excerpt: "Discovering a fragrance that is both premium and aligns with Islamic principles is a journey of elegance.",
            author: "Aisha M.",
            category: "Guide",
            date: "Oct 12, 2026"
        },
        {
            title: "Sunnah and Fragrance: The Importance of Smelling Good",
            excerpt: "Exploring the Prophetic traditions surrounding cleanliness, musk, and the spiritual significance of beautiful scents.",
            author: "Sheikh Abdullah",
            category: "Faith",
            date: "Nov 04, 2026"
        },
        {
            title: "Fragrance Tips: How to Make Your Oud Last Longer",
            excerpt: "Maximize the projection and longevity of your premium perfumes with these expert application techniques.",
            author: "Hawescent Team",
            category: "Tips",
            date: "Nov 18, 2026"
        }
    ];

    return (
        <div className="blog-page" style={{ backgroundColor: 'var(--background-alt)', minHeight: '100vh' }}>
            <section style={{ backgroundColor: 'var(--primary-green)', padding: '5rem 0', color: 'var(--white)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: 'var(--white)' }}>Fragrance & Faith</h1>
                    <p style={{ opacity: 0.9, fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>Insights, guides, and stories on Islamic lifestyle, elegance, and the art of premium perfumery.</p>
                </div>
            </section>

            <section style={{ padding: '5rem 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
                        {posts.map((post, index) => (
                            <article key={index} style={{ backgroundColor: 'var(--white)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <span style={{ color: 'var(--accent-gold)', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{post.category}</span>
                                    <span style={{ color: '#999', fontSize: '0.85rem' }}>{post.date}</span>
                                </div>
                                <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-green)', marginBottom: '1rem', lineHeight: '1.3' }}>{post.title}</h2>
                                <p style={{ color: '#666', marginBottom: '2rem', lineHeight: '1.6' }}>{post.excerpt}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eaeaea', paddingTop: '1rem' }}>
                                    <span style={{ fontWeight: '500', fontSize: '0.9rem', color: 'var(--text-dark)' }}>By {post.author}</span>
                                    <a href="#" style={{ color: 'var(--primary-green)', fontWeight: '600', textDecoration: 'none' }}>Read Article &rarr;</a>
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
