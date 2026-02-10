import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useHawescentAI } from '../hooks/useHawescentAI';
import { User, Heart, Star, ChevronRight, Info } from 'lucide-react';

const MatchMaker = () => {
    const [approvedProfiles, setApprovedProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { suggestMatches } = useHawescentAI();

    useEffect(() => {
        const fetchApproved = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('status', 'approved');
            if (!error) setApprovedProfiles(data);
            setLoading(false);
        };
        fetchApproved();
    }, []);

    const handleSelectProfile = (profile) => {
        setSelectedProfile(profile);
        const others = approvedProfiles.filter(p => p.id !== profile.id);
        const matches = suggestMatches(profile, others);
        setSuggestions(matches);
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading approved profiles...</div>;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
            {/* Sidebar: Approved Profiles */}
            <div style={{ backgroundColor: 'var(--white)', borderRadius: '12px', border: '1px solid #eee', overflow: 'hidden' }}>
                <div style={{ padding: '1rem', backgroundColor: 'var(--primary-green)', color: 'white' }}>
                    <h4 style={{ margin: 0 }}>Approved Seekers</h4>
                </div>
                <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                    {approvedProfiles.map(p => (
                        <div
                            key={p.id}
                            onClick={() => handleSelectProfile(p)}
                            style={{
                                padding: '1rem',
                                borderBottom: '1px solid #eee',
                                cursor: 'pointer',
                                backgroundColor: selectedProfile?.id === p.id ? '#f0f9f0' : 'transparent',
                                transition: '0.2s'
                            }}
                        >
                            <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{p.full_name}</div>
                            <small style={{ opacity: 0.6 }}>{p.gender} • {p.age} • {p.location}</small>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Area: Suggestions */}
            <div>
                {!selectedProfile ? (
                    <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: '#fafafa', borderRadius: '12px', border: '2px dashed #eee' }}>
                        <User size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                        <p style={{ opacity: 0.5 }}>Select a profile from the sidebar to find compatible matches.</p>
                    </div>
                ) : (
                    <div>
                        <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: 'var(--white)', borderRadius: '12px', borderLeft: '4px solid var(--accent-gold)', boxShadow: 'var(--shadow-sm)' }}>
                            <h3 style={{ margin: 0 }}>Finding matches for: {selectedProfile.full_name}</h3>
                            <p style={{ fontSize: '0.9rem', opacity: 0.7, marginTop: '0.5rem' }}>
                                Searching for {selectedProfile.gender === 'male' ? 'Female' : 'Male'} matches with similar values.
                            </p>
                        </div>

                        {suggestions.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '3rem' }}>
                                <Info size={32} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                                <p>No high-compatibility matches found in the current pool.</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {suggestions.map(match => (
                                    <div key={match.id} style={{ backgroundColor: 'var(--white)', padding: '1.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                                <h4 style={{ margin: 0 }}>{match.full_name}</h4>
                                                <span style={{ backgroundColor: 'var(--background-cream)', color: 'var(--primary-green)', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                                    {match.matchData.total}% Compatibility
                                                </span>
                                            </div>
                                            <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>
                                                {match.age} yrs • {match.location} • {match.sect}
                                            </p>
                                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                                <div style={{ fontSize: '0.7rem' }}>
                                                    <strong>Sect:</strong> {match.matchData.breakdown.sect}/40
                                                </div>
                                                <div style={{ fontSize: '0.7rem' }}>
                                                    <strong>Practice:</strong> {match.matchData.breakdown.practice}/30
                                                </div>
                                                <div style={{ fontSize: '0.7rem' }}>
                                                    <strong>Status:</strong> {match.matchData.breakdown.status}/20
                                                </div>
                                                <div style={{ fontSize: '0.7rem' }}>
                                                    <strong>Age:</strong> {match.matchData.breakdown.age}/10
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            View Match Profile <ChevronRight size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MatchMaker;
