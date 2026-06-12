import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Calendar, Clock, Video, BookOpen, Star, CheckCircle } from 'lucide-react';

const CounselingModule = ({ currentProfile }) => {
    const [counselors, setCounselors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCounselor, setSelectedCounselor] = useState(null);
    const [bookingState, setBookingState] = useState('browsing'); // browsing, scheduling, payment, confirmed

    useEffect(() => {
        fetchCounselors();
    }, []);

    const fetchCounselors = async () => {
        try {
            // Fetch users with role 'counselor' or 'ustadh'
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .in('role', ['counselor', 'ustadh']);
            
            if (error) throw error;
            
            // Mock some extra data for the UI since we don't have a full counselor_profiles table yet
            const enrichedCounselors = (data || []).map(c => ({
                ...c,
                specialties: c.role === 'ustadh' ? ['Pre-Marital Fiqh', 'Mediation', 'Istikhara Guidance'] : ['Communication', 'Expectation Management', 'Cultural Differences'],
                rate: c.role === 'ustadh' ? 15000 : 25000,
                rating: 4.8 + (Math.random() * 0.2),
                reviews: Math.floor(Math.random() * 50) + 10
            }));

            // If DB is empty, provide mock data so the UI is visible
            if (enrichedCounselors.length === 0) {
                setCounselors([
                    { id: '1', full_name: 'Imam Y. Abdullah', role: 'ustadh', specialties: ['Pre-Marital Fiqh', 'Mediation'], rate: 15000, rating: 4.9, reviews: 42, avatar_url: '' },
                    { id: '2', full_name: 'Dr. Fatima Ali', role: 'counselor', specialties: ['Communication', 'Cultural Differences'], rate: 25000, rating: 4.95, reviews: 87, avatar_url: '' }
                ]);
            } else {
                setCounselors(enrichedCounselors);
            }
        } catch (error) {
            console.error('Error fetching counselors:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBookSession = (counselor) => {
        setSelectedCounselor(counselor);
        setBookingState('scheduling');
    };

    const handleConfirmSchedule = () => {
        // Here we would normally save the datetime to state
        setBookingState('payment');
    };

    const handlePayment = async () => {
        // Mock Paystack Integration
        alert(`Redirecting to Paystack to process ₦${selectedCounselor.rate.toLocaleString()}...`);
        
        setTimeout(async () => {
            // Mock successful payment and save to DB
            try {
                await supabase.from('counseling_sessions').insert({
                    seeker_id: currentProfile.id,
                    counselor_id: selectedCounselor.id,
                    status: 'scheduled',
                    payment_status: 'paid',
                    scheduled_at: new Date().toISOString() // Mocking current time for simplicity
                });
                setBookingState('confirmed');
            } catch (err) {
                console.error("Failed to save booking:", err);
                alert("Payment successful but failed to save booking. Contact support.");
            }
        }, 1500);
    };

    if (loading) {
        return <div style={{ padding: '2rem', textAlign: 'center', color: '#6B7280' }}>Loading available counselors...</div>;
    }

    if (bookingState === 'browsing') {
        return (
            <div style={{ display: 'grid', gap: '2rem' }}>
                <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', color: '#111827', marginBottom: '0.5rem' }}>Expert Islamic Guidance</h3>
                        <p style={{ color: '#6B7280' }}>Book a virtual session with certified Ustadhas and Marriage Counselors.</p>
                    </div>
                    <BookOpen size={48} color="#D4AF37" opacity={0.2} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {counselors.map((counselor) => (
                        <div key={counselor.id} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#064E3B', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', flexShrink: 0 }}>
                                    {counselor.full_name ? counselor.full_name.charAt(0) : 'C'}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', color: '#111827', margin: 0, fontWeight: '600' }}>{counselor.full_name}</h3>
                                    <span style={{ fontSize: '0.8rem', textTransform: 'capitalize', color: '#059669', fontWeight: '500' }}>{counselor.role}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.3rem', fontSize: '0.85rem', color: '#6B7280' }}>
                                        <Star size={14} fill="#F59E0B" color="#F59E0B" />
                                        <span>{counselor.rating.toFixed(1)} ({counselor.reviews} reviews)</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div style={{ marginBottom: '1.5rem', flex: 1 }}>
                                <p style={{ fontSize: '0.9rem', color: '#4B5563', marginBottom: '0.5rem', fontWeight: '500' }}>Specialties:</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {counselor.specialties.map((spec, idx) => (
                                        <span key={idx} style={{ padding: '0.2rem 0.6rem', backgroundColor: '#F3F4F6', borderRadius: '4px', fontSize: '0.8rem', color: '#374151' }}>{spec}</span>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E5E7EB', paddingTop: '1.5rem' }}>
                                <div>
                                    <span style={{ fontSize: '1.2rem', fontWeight: '700', color: '#111827' }}>₦{counselor.rate.toLocaleString()}</span>
                                    <span style={{ fontSize: '0.8rem', color: '#6B7280' }}> / session</span>
                                </div>
                                <button 
                                    onClick={() => handleBookSession(counselor)}
                                    style={{ padding: '0.6rem 1.2rem', backgroundColor: '#064E3B', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (bookingState === 'scheduling') {
        return (
            <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', maxWidth: '600px', margin: '0 auto' }}>
                <h3 style={{ fontSize: '1.5rem', color: '#111827', marginBottom: '0.5rem' }}>Schedule Session with {selectedCounselor.full_name}</h3>
                <p style={{ color: '#6B7280', marginBottom: '2rem' }}>Select an available date and time for your virtual consultation.</p>
                
                {/* Mock Calendar UI */}
                <div style={{ border: '1px solid #E5E7EB', borderRadius: '8px', padding: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
                    <Calendar size={48} color="#D1D5DB" style={{ margin: '0 auto 1rem auto' }} />
                    <p style={{ color: '#4B5563', marginBottom: '1rem' }}>Interactive Calendar Component Placeholder</p>
                    <select style={{ padding: '0.8rem', width: '100%', borderRadius: '4px', border: '1px solid #D1D5DB' }}>
                        <option>Next Available: Friday, 2:00 PM</option>
                        <option>Saturday, 10:00 AM</option>
                        <option>Monday, 4:00 PM</option>
                    </select>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => setBookingState('browsing')} style={{ flex: 1, padding: '1rem', backgroundColor: '#F3F4F6', color: '#374151', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                    <button onClick={handleConfirmSchedule} style={{ flex: 2, padding: '1rem', backgroundColor: '#064E3B', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>Continue to Payment</button>
                </div>
            </div>
        );
    }

    if (bookingState === 'payment') {
        return (
            <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.5rem', color: '#111827', marginBottom: '2rem' }}>Checkout</h3>
                
                <div style={{ backgroundColor: '#F9FAFB', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', textAlign: 'left' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span style={{ color: '#4B5563' }}>Session with {selectedCounselor.full_name}</span>
                        <span style={{ fontWeight: '600' }}>₦{selectedCounselor.rate.toLocaleString()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E5E7EB', paddingTop: '1rem' }}>
                        <span style={{ fontWeight: '600', color: '#111827' }}>Total</span>
                        <span style={{ fontWeight: '700', color: '#064E3B', fontSize: '1.2rem' }}>₦{selectedCounselor.rate.toLocaleString()}</span>
                    </div>
                </div>

                <button onClick={handlePayment} style={{ width: '100%', padding: '1rem', backgroundColor: '#0BA4DB', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '1.1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                    Pay securely with Paystack
                </button>
            </div>
        );
    }

    if (bookingState === 'confirmed') {
        return (
            <div style={{ backgroundColor: 'white', padding: '4rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                <CheckCircle size={64} color="#059669" style={{ margin: '0 auto 1.5rem auto' }} />
                <h3 style={{ fontSize: '2rem', color: '#111827', marginBottom: '1rem' }}>Alhamdulillah!</h3>
                <p style={{ color: '#6B7280', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                    Your session with {selectedCounselor.full_name} has been confirmed. A Google Meet link has been sent to your registered email address.
                </p>
                <button onClick={() => setBookingState('browsing')} style={{ padding: '1rem 2rem', backgroundColor: '#064E3B', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
                    Return to Counselors
                </button>
            </div>
        );
    }
};

export default CounselingModule;
