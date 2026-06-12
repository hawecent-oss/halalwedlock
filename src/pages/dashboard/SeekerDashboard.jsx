import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { User, ShieldCheck, Heart, AlertCircle, FileText, Camera, Smartphone, Mail, LogOut } from 'lucide-react';
import MatchingEngine from './MatchingEngine';

const SeekerDashboard = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                window.location.href = '/register';
                return;
            }

            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();
            
            if (error) throw error;
            
            let score = 0;
            if (data.full_name) score += 15;
            if (data.about_me) score += 20;
            if (data.seeking_description) score += 20;
            if (data.profession) score += 10;
            if (data.praying_frequency) score += 15;
            if (data.sect) score += 10;
            if (data.avatar_url) score += 10;
            
            data.profile_completion_percent = score;
            
            setProfile(data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleVerificationStep = (step) => {
        alert(`Initiating ${step} verification workflow...`);
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        window.location.href = '/';
    };

    if (loading) {
        return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6' }}>Loading your dashboard...</div>;
    }

    if (!profile) {
        return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6' }}>Profile not found. Please contact support.</div>;
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            {/* Sidebar */}
            <div style={{ width: '250px', backgroundColor: 'white', borderRight: '1px solid #e5e7eb', padding: '2rem 0', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '0 2rem', marginBottom: '3rem', textAlign: 'center' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#064E3B', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', fontSize: '2rem', fontWeight: 'bold' }}>
                        {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <h3 style={{ fontSize: '1.1rem', color: '#111827', marginBottom: '0.2rem' }}>{profile.full_name}</h3>
                    <span style={{ fontSize: '0.8rem', backgroundColor: '#E0F2FE', color: '#0284C7', padding: '0.2rem 0.6rem', borderRadius: '20px', fontWeight: '500', textTransform: 'capitalize' }}>
                        {profile.role}
                    </span>
                </div>
                
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, padding: '0 1rem' }}>
                    {[
                        { id: 'overview', label: 'Overview', icon: <User size={20} /> },
                        { id: 'matches', label: 'My Matches', icon: <Heart size={20} /> },
                        { id: 'verification', label: 'Trust & Verification', icon: <ShieldCheck size={20} /> },
                    ].map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1rem',
                                backgroundColor: activeTab === tab.id ? '#F3F4F6' : 'transparent',
                                border: 'none',
                                color: activeTab === tab.id ? '#064E3B' : '#4B5563',
                                cursor: 'pointer',
                                width: '100%',
                                textAlign: 'left',
                                borderRadius: '8px',
                                fontWeight: activeTab === tab.id ? '600' : '500',
                                transition: 'all 0.2s'
                            }}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </nav>

                <div style={{ padding: '0 1rem', marginTop: 'auto' }}>
                    <button 
                        onClick={handleSignOut}
                        style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: 'transparent', border: 'none', color: '#DC2626', cursor: 'pointer', width: '100%', textAlign: 'left', borderRadius: '8px', fontWeight: '500', transition: 'all 0.2s' }}
                    >
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
                <header style={{ marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2rem', color: '#111827', marginBottom: '0.5rem' }}>
                        {activeTab === 'overview' && `Assalamu Alaikum, ${profile.full_name.split(' ')[0]}`}
                        {activeTab === 'matches' && 'Smart Match Recommendations'}
                        {activeTab === 'verification' && 'Trust & Verification Hub'}
                    </h1>
                    <p style={{ color: '#6B7280' }}>
                        {activeTab === 'overview' && 'Welcome to your HalalWedlock dashboard. Let\'s complete your journey.'}
                        {activeTab === 'matches' && 'Profiles carefully selected based on your Deen, location, and values.'}
                        {activeTab === 'verification' && 'Verify your identity to increase your chances of finding a serious match.'}
                    </p>
                </header>

                {activeTab === 'overview' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                        {/* Left Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <h3 style={{ fontSize: '1.2rem', color: '#111827', fontWeight: '600' }}>Profile Strength</h3>
                                    <span style={{ fontSize: '1.5rem', fontWeight: '700', color: profile.profile_completion_percent < 100 ? '#D4AF37' : '#059669' }}>
                                        {profile.profile_completion_percent}%
                                    </span>
                                </div>
                                <div style={{ width: '100%', height: '8px', backgroundColor: '#E5E7EB', borderRadius: '4px', marginBottom: '1.5rem', overflow: 'hidden' }}>
                                    <div style={{ width: `${profile.profile_completion_percent}%`, height: '100%', backgroundColor: profile.profile_completion_percent < 100 ? '#D4AF37' : '#059669', transition: 'width 0.5s ease' }}></div>
                                </div>
                                {profile.profile_completion_percent < 100 && (
                                    <div style={{ backgroundColor: '#FEF3C7', padding: '1rem', borderRadius: '8px', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                        <AlertCircle size={20} color="#92400E" style={{ flexShrink: 0, marginTop: '2px' }} />
                                        <div>
                                            <p style={{ color: '#92400E', fontSize: '0.95rem', marginBottom: '0.5rem', fontWeight: '500' }}>Complete your profile to unlock better matching!</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <h3 style={{ fontSize: '1.2rem', color: '#111827', fontWeight: '600', marginBottom: '1.5rem' }}>Your Journey Tracker</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {[
                                        { step: 'Profile Created', status: 'completed' },
                                        { step: 'Account Verified', status: profile.verification_level === 'fully_verified' ? 'completed' : 'current' },
                                        { step: 'Browse Matches', status: 'pending' },
                                        { step: 'Family Introduction', status: 'pending' }
                                    ].map((item, idx) => (
                                        <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                            <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: item.status === 'completed' ? '#059669' : item.status === 'current' ? '#D4AF37' : '#E5E7EB', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                                {item.status === 'completed' ? '✓' : idx + 1}
                                            </div>
                                            <span style={{ fontSize: '1rem', fontWeight: item.status === 'current' ? '600' : '400', color: item.status === 'pending' ? '#9CA3AF' : '#111827' }}>
                                                {item.step}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <h3 style={{ fontSize: '1.2rem', color: '#111827', fontWeight: '600', marginBottom: '1.5rem' }}>Trust & Verification</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #E5E7EB', borderRadius: '8px' }}>
                                        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}><Mail size={18} color="#059669" /><span style={{ fontSize: '0.95rem', fontWeight: '500' }}>Email</span></div>
                                        <span style={{ fontSize: '0.8rem', color: '#059669', backgroundColor: '#D1FAE5', padding: '0.2rem 0.6rem', borderRadius: '20px', fontWeight: '600' }}>Verified</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #E5E7EB', borderRadius: '8px' }}>
                                        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}><Smartphone size={18} color="#4B5563" /><span style={{ fontSize: '0.95rem', fontWeight: '500' }}>Phone</span></div>
                                        <button onClick={() => handleVerificationStep('Phone')} style={{ fontSize: '0.8rem', color: '#0284C7', backgroundColor: '#E0F2FE', padding: '0.4rem 0.8rem', borderRadius: '4px', fontWeight: '600', border: 'none', cursor: 'pointer' }}>Verify Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'matches' && (
                    <MatchingEngine currentProfile={profile} />
                )}

                {activeTab === 'verification' && (
                    <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                        <ShieldCheck size={48} color="#059669" style={{ margin: '0 auto 1.5rem auto' }} />
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Complete Your Verification</h3>
                        <p style={{ color: '#6B7280', maxWidth: '500px', margin: '0 auto 2rem auto' }}>Verified profiles get 3x more matches. Upload a valid government ID to get the green checkmark.</p>
                        <button onClick={() => handleVerificationStep('ID Upload')} style={{ padding: '1rem 2rem', backgroundColor: '#064E3B', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>Upload Government ID</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SeekerDashboard;
