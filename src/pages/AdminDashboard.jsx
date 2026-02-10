import React from 'react';
import { UserCheck, UserX, AlertCircle, RefreshCcw, Users, Heart } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { submitToN8N } from '../utils/n8n';
import MatchMaker from '../components/MatchMaker';

const AdminDashboard = () => {
    const [profiles, setProfiles] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [activeTab, setActiveTab] = React.useState('approval'); // 'approval' or 'matching'

    const fetchProfiles = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('status', 'pending')
            .order('created_at', { ascending: false });

        if (!error) setProfiles(data);
        setLoading(false);
    };

    React.useEffect(() => {
        fetchProfiles();
    }, []);

    const updateStatus = async (id, status) => {
        const { error } = await supabase
            .from('profiles')
            .update({ status })
            .eq('id', id);

        if (!error) {
            const profile = profiles.find(p => p.id === id);
            await submitToN8N('status_update', { id, status, full_name: profile?.full_name, gender: profile?.gender });
            setProfiles(profiles.filter(p => p.id !== id));
        }
    };

    return (
        <div className="admin-dashboard">
            <section className="section halal-pattern" style={{ padding: '2rem 0' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Admin Dashboard</h1>
                    <p style={{ opacity: 0.8 }}>Shariah-Compliant Oversight & Matchmaking</p>
                </div>
            </section>

            <section className="section" style={{ backgroundColor: 'white', padding: '0 0 4rem 0' }}>
                <div className="container">
                    {/* Tab Navigation */}
                    <div style={{ display: 'flex', borderBottom: '1px solid #eee', marginBottom: '3rem' }}>
                        <button
                            onClick={() => setActiveTab('approval')}
                            style={{
                                padding: '1.5rem 2rem',
                                border: 'none',
                                background: 'none',
                                cursor: 'pointer',
                                color: activeTab === 'approval' ? 'var(--primary-green)' : '#999',
                                borderBottom: activeTab === 'approval' ? '3px solid var(--primary-green)' : '3px solid transparent',
                                fontWeight: activeTab === 'approval' ? '700' : '400',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <Users size={18} /> Profile Approvals
                        </button>
                        <button
                            onClick={() => setActiveTab('matching')}
                            style={{
                                padding: '1.5rem 2rem',
                                border: 'none',
                                background: 'none',
                                cursor: 'pointer',
                                color: activeTab === 'matching' ? 'var(--primary-green)' : '#999',
                                borderBottom: activeTab === 'matching' ? '3px solid var(--primary-green)' : '3px solid transparent',
                                fontWeight: activeTab === 'matching' ? '700' : '400',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <Heart size={18} /> AI Match Maker
                        </button>
                    </div>

                    {activeTab === 'approval' ? (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', backgroundColor: '#fffbe6', border: '1px solid #ffe58f', borderRadius: '8px', flex: 1 }}>
                                    <AlertCircle color="#faad14" />
                                    <span>{profiles.length} new profiles awaiting review.</span>
                                </div>
                                <button onClick={fetchProfiles} className="btn" style={{ marginLeft: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <RefreshCcw size={16} /> Refresh
                                </button>
                            </div>

                            <div style={{ overflowX: 'auto' }}>
                                {loading ? (
                                    <p style={{ textAlign: 'center', padding: '4rem' }}>Loading profiles...</p>
                                ) : (
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--primary-green)' }}>
                                                <th style={{ padding: '1rem' }}>Name</th>
                                                <th style={{ padding: '1rem' }}>Gender</th>
                                                <th style={{ padding: '1rem' }}>Details</th>
                                                <th style={{ padding: '1rem' }}>Guardian</th>
                                                <th style={{ padding: '1rem' }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {profiles.map(profile => (
                                                <tr key={profile.id} style={{ borderBottom: '1px solid #eee' }}>
                                                    <td style={{ padding: '1rem' }}>
                                                        <strong>{profile.full_name}</strong><br />
                                                        <small style={{ opacity: 0.6 }}>{profile.age} yrs • {profile.location}</small>
                                                    </td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <span style={{ textTransform: 'capitalize' }}>{profile.gender}</span>
                                                    </td>
                                                    <td style={{ padding: '1rem', fontSize: '0.85rem' }}>
                                                        {profile.sect} • {profile.level_of_practice}<br />
                                                        {profile.gender === 'female' ? profile.modesty_preference : profile.financial_stability}
                                                    </td>
                                                    <td style={{ padding: '1rem', fontSize: '0.85rem' }}>
                                                        {profile.guardian_contact}
                                                    </td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                            <button
                                                                onClick={() => updateStatus(profile.id, 'approved')}
                                                                style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', backgroundColor: 'var(--primary-green)', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
                                                            >
                                                                <UserCheck size={16} /> Approve
                                                            </button>
                                                            <button
                                                                onClick={() => updateStatus(profile.id, 'rejected')}
                                                                style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', backgroundColor: '#ff4d4f', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
                                                            >
                                                                <UserX size={16} /> Reject
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {profiles.length === 0 && (
                                                <tr>
                                                    <td colSpan="5" style={{ padding: '4rem', textAlign: 'center', opacity: 0.5 }}>
                                                        No pending profiles to review.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    ) : (
                        <MatchMaker />
                    )}
                </div>
            </section>
        </div>
    );
};

export default AdminDashboard;
