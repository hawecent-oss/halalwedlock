import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ShieldCheck, Heart, Star, Truck, Shield } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

import heroImage from '../assets/hero_couple.png';
import perfume1 from '../assets/perfume_1.png';
import perfume2 from '../assets/perfume_2.png';
import familyImage from '../assets/family.png';

const Home = () => {
    return (
        <div className="home-page" style={{ backgroundColor: 'var(--background-cream)' }}>
            <FloatingWhatsApp />
            
            {/* Hero Section */}
            <section style={{
                position: 'relative',
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                padding: '4rem 0',
                backgroundColor: 'var(--primary-green)',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${heroImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.35,
                    mixBlendMode: 'overlay'
                }}></div>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to right, rgba(6,78,59,0.95) 0%, rgba(6,78,59,0.7) 100%)'
                }}></div>
                
                <div className="container" style={{ position: 'relative', zIndex: 10, color: 'var(--white)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
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
                    }}>Crafted for the Modern Muslim Family</span>
                    
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: '1.1', marginBottom: '1.5rem', color: 'var(--white)', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                        Fragrance Inspired by <span style={{ color: 'var(--accent-gold)', fontStyle: 'italic' }}>Faith</span>, Elegance & Excellence
                    </h1>
                    
                    <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', marginBottom: '2.5rem', opacity: 0.9, lineHeight: '1.6', maxWidth: '700px', margin: '0 auto 2.5rem auto' }}>
                        Premium scents crafted for Muslim individuals and families who value purity, sophistication and lasting impressions.
                    </p>
                    
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', width: '100%' }}>
                        <Link to="/shop" style={{ 
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
                        }}>Shop Now</Link>
                        <Link to="/collections" style={{ 
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
                        }}>Explore Collection</Link>
                    </div>
                </div>
            </section>

            {/* Trust / Why Choose Us Section */}
            <section style={{ padding: '4rem 0', backgroundColor: 'var(--white)' }}>
                <div className="container">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', textAlign: 'center' }}>
                        {[
                            { icon: <ShieldCheck size={32} color="var(--accent-gold)" />, title: 'Halal Friendly', desc: '100% alcohol-free options' },
                            { icon: <Star size={32} color="var(--accent-gold)" />, title: 'Premium Ingredients', desc: 'Sourced globally' },
                            { icon: <CheckCircle size={32} color="var(--accent-gold)" />, title: 'Long Lasting', desc: 'Up to 48 hours projection' },
                            { icon: <Heart size={32} color="var(--accent-gold)" />, title: 'Trusted by Families', desc: 'Loved by thousands' },
                            { icon: <Truck size={32} color="var(--accent-gold)" />, title: 'Nationwide Delivery', desc: 'Fast & reliable' }
                        ].map((item, idx) => (
                            <div key={idx} style={{ flex: '1 1 150px', maxWidth: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ backgroundColor: 'var(--background-cream)', padding: '1rem', borderRadius: '50%' }}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--primary-green)', marginBottom: '0.3rem', fontSize: '1.1rem' }}>{item.title}</h4>
                                    <p style={{ fontSize: '0.85rem', color: '#666' }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section style={{ padding: '6rem 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span style={{ color: 'var(--accent-gold)', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem' }}>Curated Selection</span>
                        <h2 style={{ fontSize: '3rem', color: 'var(--primary-green)', marginTop: '0.5rem' }}>Signature Fragrances</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
                        <ProductCard 
                            image={perfume1}
                            title="Oud Al-Amir"
                            price="₦45,000"
                            rating="4.9"
                            reviews="128"
                            description="A majestic blend of pure aged oud, rich amber, and subtle hints of spicy saffron. Perfect for special occasions."
                        />
                        <ProductCard 
                            image={perfume2}
                            title="Rose of Madinah"
                            price="₦32,500"
                            rating="4.8"
                            reviews="95"
                            description="Delicate Taif rose interwoven with warm vanilla and white musk. A soft, elegant scent for the modern Muslimah."
                        />
                        <ProductCard 
                            image={familyImage}
                            title="Family Heritage Set"
                            price="₦85,000"
                            rating="5.0"
                            reviews="42"
                            description="A luxurious collection of our finest 4 fragrances, beautifully packaged. The perfect Eid or wedding gift."
                        />
                    </div>
                    
                    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                        <Link to="/shop" style={{ 
                            display: 'inline-block',
                            padding: '1rem 3rem', 
                            backgroundColor: 'transparent', 
                            color: 'var(--primary-green)', 
                            fontWeight: '600', 
                            border: '2px solid var(--primary-green)',
                            borderRadius: '4px',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>View All Products</Link>
                    </div>
                </div>
            </section>

            {/* Islamic Values Section */}
            <section style={{ padding: '6rem 0', backgroundColor: 'var(--secondary-green)', color: 'var(--white)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
                        <h2 style={{ fontSize: '3rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>Our Values</h2>
                        <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
                            Our mission is to provide premium fragrances that align with Islamic values while helping Muslims express confidence, dignity and excellence.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                        {[
                            { title: 'Ihsan', sub: 'Excellence', desc: 'Crafting the highest quality fragrances with attention to every detail.' },
                            { title: 'Amanah', sub: 'Trustworthiness', desc: 'Transparent ingredient sourcing and honest business practices.' },
                            { title: 'Taharah', sub: 'Purity', desc: 'Ensuring our products are clean, pure, and halal compliant.' },
                            { title: 'Usrah', sub: 'Family', desc: 'Creating scents that become part of beautiful family memories.' },
                            { title: 'Ummah', sub: 'Community', desc: 'Giving back to the Muslim community and supporting ethical trade.' }
                        ].map((val, idx) => (
                            <div key={idx} style={{ 
                                backgroundColor: 'rgba(255,255,255,0.05)', 
                                padding: '2rem', 
                                borderRadius: '12px',
                                border: '1px solid rgba(212, 175, 55, 0.2)',
                                textAlign: 'center'
                            }}>
                                <h3 style={{ color: 'var(--accent-gold)', fontSize: '1.8rem', marginBottom: '0.2rem', fontFamily: 'Playfair Display, serif' }}>{val.title}</h3>
                                <div style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.7, marginBottom: '1rem' }}>({val.sub})</div>
                                <p style={{ fontSize: '0.95rem', opacity: 0.9, lineHeight: '1.6' }}>{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section style={{ padding: '6rem 0', backgroundColor: 'var(--white)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '3rem', color: 'var(--primary-green)' }}>Loved by Our Community</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {[
                            { name: "Fatima A.", loc: "Abuja, Nigeria", prod: "Rose of Madinah", text: "The elegance of this fragrance is unmatched. It makes me feel confident and dignified. It lasts all day without being overpowering." },
                            { name: "Ibrahim & Aisha", loc: "Lagos, Nigeria", prod: "Family Heritage Set", text: "We bought this for our home and the scents are incredible. Our guests always ask what fragrance we use. Truly a premium halal brand." },
                            { name: "Yusuf M.", loc: "Kano, Nigeria", prod: "Oud Al-Amir", text: "Finally, a luxury oud that rivals international brands but feels authentic to us. The projection is fantastic. Highly recommended." }
                        ].map((review, idx) => (
                            <div key={idx} style={{ 
                                padding: '2.5rem', 
                                backgroundColor: 'var(--background-alt)', 
                                borderRadius: '12px',
                                position: 'relative'
                            }}>
                                <div style={{ display: 'flex', gap: '2px', marginBottom: '1.5rem' }}>
                                    {[1,2,3,4,5].map(star => <Star key={star} size={18} fill="var(--accent-gold)" color="var(--accent-gold)" />)}
                                </div>
                                <p style={{ fontSize: '1.05rem', fontStyle: 'italic', marginBottom: '2rem', lineHeight: '1.7', color: 'var(--text-dark)' }}>
                                    "{review.text}"
                                </p>
                                <div>
                                    <h4 style={{ color: 'var(--primary-green)', fontSize: '1.1rem', marginBottom: '0.2rem' }}>{review.name}</h4>
                                    <div style={{ fontSize: '0.85rem', color: '#666' }}>{review.loc} • Purchased: <span style={{ color: 'var(--accent-gold)' }}>{review.prod}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
