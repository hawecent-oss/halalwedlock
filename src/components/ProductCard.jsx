import React from 'react';
import { Star, ShoppingCart, Eye } from 'lucide-react';

const ProductCard = ({ image, title, price, rating, reviews, description }) => {
    return (
        <div style={{ 
            backgroundColor: 'var(--white)', 
            borderRadius: '12px', 
            overflow: 'hidden', 
            boxShadow: 'var(--shadow-md)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            position: 'relative'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        }}
        >
            <div style={{ position: 'relative', height: '280px', overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
                <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ 
                    position: 'absolute', 
                    top: '1rem', 
                    right: '1rem', 
                    backgroundColor: 'rgba(255,255,255,0.9)', 
                    padding: '0.4rem 0.6rem', 
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                }}>
                    <Star size={14} color="var(--accent-gold)" fill="var(--accent-gold)" />
                    {rating} ({reviews})
                </div>
            </div>

            <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--primary-green)' }}>{title}</h3>
                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: '1.5' }}>
                    {description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-dark)' }}>{price}</span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button style={{ 
                            padding: '0.5rem', 
                            backgroundColor: '#f3f4f6', 
                            border: 'none', 
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }} title="Quick View">
                            <Eye size={18} color="var(--text-dark)" />
                        </button>
                        <button style={{ 
                            padding: '0.5rem 1rem', 
                            backgroundColor: 'var(--primary-green)', 
                            color: 'var(--white)',
                            border: 'none', 
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontWeight: '600',
                            fontSize: '0.9rem'
                        }}>
                            <ShoppingCart size={16} /> Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
