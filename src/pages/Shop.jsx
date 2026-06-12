import React from 'react';
import ProductCard from '../components/ProductCard';

import perfume1 from '../assets/perfume_1.png';
import perfume2 from '../assets/perfume_2.png';
import familyImage from '../assets/family.png';

const Shop = () => {
    return (
        <div style={{ backgroundColor: 'var(--background-alt)', minHeight: '100vh', padding: '4rem 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3.5rem', color: 'var(--primary-green)', marginBottom: '1rem' }}>All Fragrances</h1>
                    <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                        Explore our complete collection of premium, halal-certified fragrances crafted for elegance and lasting impression.
                    </p>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #e5e5e5', paddingBottom: '1rem' }}>
                    <span style={{ fontWeight: '500', color: 'var(--text-dark)' }}>Showing 1-6 of 24 products</span>
                    <select style={{ padding: '0.8rem 1rem', borderRadius: '4px', border: '1px solid #ddd', outline: 'none', backgroundColor: 'var(--white)', cursor: 'pointer' }}>
                        <option>Sort by: Featured</option>
                        <option>Sort by: Price (Low to High)</option>
                        <option>Sort by: Price (High to Low)</option>
                        <option>Sort by: Best Selling</option>
                    </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2.5rem' }}>
                    <ProductCard 
                        image={perfume1}
                        title="Oud Al-Amir"
                        price="₦45,000"
                        rating="4.9"
                        reviews="128"
                        description="A majestic blend of pure aged oud, rich amber, and subtle hints of spicy saffron."
                    />
                    <ProductCard 
                        image={perfume2}
                        title="Rose of Madinah"
                        price="₦32,500"
                        rating="4.8"
                        reviews="95"
                        description="Delicate Taif rose interwoven with warm vanilla and white musk. A soft, elegant scent."
                    />
                    <ProductCard 
                        image={familyImage}
                        title="Family Heritage Set"
                        price="₦85,000"
                        rating="5.0"
                        reviews="42"
                        description="A luxurious collection of our finest 4 fragrances, beautifully packaged."
                    />
                    <ProductCard 
                        image={perfume1}
                        title="Midnight Musk"
                        price="₦38,000"
                        rating="4.7"
                        reviews="88"
                        description="Deep, mysterious musk blended with sandalwood. Perfect for evening wear."
                    />
                    <ProductCard 
                        image={perfume2}
                        title="Desert Bloom"
                        price="₦28,000"
                        rating="4.6"
                        reviews="112"
                        description="A fresh, uplifting scent featuring jasmine, lily, and a touch of citrus."
                    />
                    <ProductCard 
                        image={perfume1}
                        title="Royal Emerald"
                        price="₦55,000"
                        rating="4.9"
                        reviews="64"
                        description="Our most premium offering. A complex, long-lasting oriental fragrance."
                    />
                </div>
                
                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <button style={{ 
                        padding: '1rem 3rem', 
                        backgroundColor: 'var(--white)', 
                        color: 'var(--primary-green)', 
                        fontWeight: '600', 
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>Load More</button>
                </div>
            </div>
        </div>
    );
};

export default Shop;
