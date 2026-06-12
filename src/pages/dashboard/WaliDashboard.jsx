import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Users, Eye, Shield, MessageCircle, AlertTriangle } from 'lucide-react';

const WaliDashboard = () => {
    const [profile, setProfile] = useState(null);
    const [dependents, setDependents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWaliData();
    }, []);

    const fetchWaliData = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                window.location.href = '/register';
                return;
            }

            // Fetch Wali profile
            const { data: waliData, error: waliError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();
            
            if (waliError) throw waliError;
            setProfile(waliData);

            // Fetch seekers who assigned this user as their Wali
            const { data: depData, error: depError } = await supabase
                .from('profiles')
                .select('*')
                .eq('wali_id', user.id);
            
            if (depError) throw depError;
            setDependents(depData || []);
            
        } catch (error) {
            console.error('Error fetching Wali data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6' }}>Loading Wali Dashboard...</div>;
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            {/* Sidebar */}
            <div style={{ width: '250px', backgroundColor: '#1F2937', color: 'white', padding: '2rem 0', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '0 2rem', marginBottom: '3rem', textAlign: 'center' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', fontSize: '1.5rem', fontWeight: 'bold' }}>
                        {profile?.full_name ? profile.full_name.charAt(0) : 'W'}
                    </div>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>{profile?.full_name || 'Guardian'}</h3>
                    <span style={{ fontSize: '0.75rem', backgroundColor: '#4B5563', padding: '0.2rem 0.6rem', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Wali / Parent
                    </span>
                </div>
                
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, padding: '0 1rem' }}>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', color: '#D4AF37', cursor: 'pointer', width: '100%', textAlign: 'left', borderRadius: '8px', fontWeight: '600' }}>
                        <Users size={20} /> Monitoring
                    </button>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: 'transparent', border: 'none', color: '#9CA3AF', cursor: 'not-allowed', width: '100%', textAlign: 'left', borderRadius: '8px' }}>
                        <MessageCircle size={20} /> Messages (Locked)
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
                <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', color: '#111827', marginBottom: '0.5rem' }}>Guardian Oversight</h1>
                        <p style={{ color: '#6B7280' }}>Monitor and guide your dependents through their halal matchmaking journey.</p>
                    </div>
                    <div style={{ backgroundColor: '#FEF3C7', padding: '0.8rem 1.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.8rem', border: '1px solid #FDE68A' }}>
                        <Shield size={20} color="#D97706" />
                        <span style={{ color: '#92400E', fontWeight: '500', fontSize: '0.9rem' }}>Guardian Mode Active</span>
                    </div>
                </header>

                {dependents.length === 0 ? (
                    <div style={{ backgroundColor: 'white', padding: '4rem', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                        <Users size={48} color="#9CA3AF" style={{ margin: '0 auto 1.5rem auto' }} />
                        <h3 style={{ fontSize: '1.5rem', color: '#111827', marginBottom: '1rem' }}>No Dependents Linked</h3>
                        <p style={{ color: '#6B7280', maxWidth: '500px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
                            You are not currently linked as a Wali to any marriage seeker on the platform. Have your son/daughter enter your registered email address in their "Wali Settings" to link accounts.
                        </p>
                        <div style={{ padding: '1rem', backgroundColor: '#F3F4F6', borderRadius: '8px', display: 'inline-block', color: '#4B5563', fontWeight: '500' }}>
                            Your registered email: {profile?.email}
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '2rem' }}>
                        {dependents.map(dependent => (
                            <div key={dependent.id} style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                                <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F9FAFB' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#064E3B', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                            {dependent.full_name ? dependent.full_name.charAt(0) : 'U'}
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: '1.1rem', color: '#111827', margin: 0 }}>{dependent.full_name}</h3>
                                            <span style={{ fontSize: '0.85rem', color: '#6B7280' }}>Profile Completion: {dependent.profile_completion_percent}%</span>
                                        </div>
                                    </div>
                                    <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: 'white', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '500', color: '#374151', cursor: 'pointer' }}>
                                        <Eye size={16} /> View Full Profile
                                    </button>
                                </div>
                                
                                <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                                    <div>
                                        <h4 style={{ color: '#4B5563', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', fontWeight: '600' }}>Recent Matches</h4>
                                        <div style={{ padding: '2rem', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px dashed #D1D5DB', textAlign: 'center', color: '#6B7280', fontSize: '0.9rem' }}>
                                            <Heart size={24} color="#D1D5DB" style={{ margin: '0 auto 0.5rem auto' }} />
                                            No active matches to review yet.
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h4 style={{ color: '#4B5563', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', fontWeight: '600' }}>Messages Monitored</h4>
                                        <div style={{ padding: '2rem', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px dashed #D1D5DB', textAlign: 'center', color: '#6B7280', fontSize: '0.9rem' }}>
                                            <MessageCircle size={24} color="#D1D5DB" style={{ margin: '0 auto 0.5rem auto' }} />
                                            No message threads initiated.
                                        </div>
                                    </div>

                                    <div>
                                        <h4 style={{ color: '#4B5563', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', fontWeight: '600' }}>Alerts</h4>
                                        <div style={{ padding: '1rem', backgroundColor: '#FEF2F2', borderRadius: '8px', border: '1px solid #FCA5A5', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                            <AlertTriangle size={20} color="#DC2626" style={{ flexShrink: 0, marginTop: '2px' }} />
                                            <div>
                                                <p style={{ color: '#991B1B', fontSize: '0.9rem', fontWeight: '500', marginBottom: '0.2rem' }}>Dependent Unverified</p>
                                                <p style={{ color: '#B91C1C', fontSize: '0.8rem' }}>Please remind {dependent.full_name.split(' ')[0]} to upload their Government ID for verification.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WaliDashboard;
