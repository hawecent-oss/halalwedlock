import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { aiService } from '../../lib/aiService';
import { Heart, ShieldCheck, MapPin, Briefcase, Info, Sparkles } from 'lucide-react';

const MatchingEngine = ({ currentProfile }) => {
    const [potentialMatches, setPotentialMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [aiContexts, setAiContexts] = useState({});
    const [generatingContextId, setGeneratingContextId] = useState(null);

    useEffect(() => {
        if (currentProfile) {
            findMatches();
        }
    }, [currentProfile]);

    const calculateCompatibility = (profile1, profile2) => {
        let score = 50; // Base score
        
        // Sect alignment (+20)
        if (profile1.sect && profile2.sect && profile1.sect === profile2.sect) {
            score += 20;
        }
        
        // Praying frequency alignment (+15)
        if (profile1.praying_frequency && profile2.praying_frequency && profile1.praying_frequency === profile2.praying_frequency) {
            score += 15;
        }
        
        // Location alignment (+10)
        if (profile1.residence && profile2.residence && profile1.residence === profile2.residence) {
            score += 10;
        }

        // Marital status preference (simplified logic) (+5)
        if (profile1.marital_status && profile2.marital_status) {
            score += 5; 
        }

        return Math.min(score, 99); // Max score 99%
    };

    const findMatches = async () => {
        try {
            // Find opposite gender
            const targetGender = currentProfile.gender === 'Male' ? 'Female' : currentProfile.gender === 'Female' ? 'Male' : null;
            
            if (!targetGender) {
                setLoading(false);
                return; // Can't match if gender isn't set properly
            }

            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('gender', targetGender)
                .neq('id', currentProfile.id) // Exclude self
                .order('created_at', { ascending: false })
                .limit(10);
            
            if (error) throw error;
            
            // Calculate scores and sort
            const matchesWithScores = (data || []).map(match => ({
                ...match,
                compatibilityScore: calculateCompatibility(currentProfile, match)
            })).sort((a, b) => b.compatibilityScore - a.compatibilityScore);

            setPotentialMatches(matchesWithScores);
        } catch (error) {
            console.error('Error finding matches:', error);
        } finally {
            setLoading(false);
        }
    };

    const generateContext = async (matchId, matchProfile) => {
        setGeneratingContextId(matchId);
        try {
            const contextText = await aiService.generateMatchContext(currentProfile, matchProfile);
            setAiContexts(prev => ({ ...prev, [matchId]: contextText }));
        } catch (error) {
            console.error("Error generating AI context", error);
        } finally {
            setGeneratingContextId(null);
        }
    };

    if (loading) {
        return <div style={{ padding: '2rem', textAlign: 'center', color: '#6B7280' }}>Running matchmaking algorithm...</div>;
    }

    if (potentialMatches.length === 0) {
        return (
            <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <div style={{ width: '60px', height: '60px', backgroundColor: '#F3F4F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                    <Heart size={24} color="#9CA3AF" />
                </div>
                <h3 style={{ fontSize: '1.5rem', color: '#111827', marginBottom: '0.5rem' }}>No perfect matches yet</h3>
                <p style={{ color: '#6B7280' }}>We are still looking for profiles that align with your Deen and preferences. Check back later!</p>
            </div>
        );
    }

    return (
        <div style={{ display: 'grid', gap: '2rem' }}>
            <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', padding: '1.5rem', borderRadius: '8px', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <Info size={24} color="#166534" style={{ flexShrink: 0 }} />
                <div>
                    <h4 style={{ color: '#166534', fontWeight: '600', marginBottom: '0.2rem', fontSize: '1.1rem' }}>Smart Match Algorithm Active</h4>
                    <p style={{ color: '#15803D', fontSize: '0.95rem' }}>Profiles are scored based on Sect alignment, Praying frequency, and Location. The closer to 99%, the stronger the religious compatibility.</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {potentialMatches.map((match) => (
                    <div key={match.id} style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column' }}>
                        {/* Profile Header */}
                        <div style={{ position: 'relative', height: '120px', backgroundColor: '#064E3B' }}>
                            <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'rgba(255,255,255,0.9)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontWeight: '700', color: '#059669', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                <Heart size={14} fill="#059669" /> {match.compatibilityScore}% Match
                            </div>
                            
                            <div style={{ position: 'absolute', bottom: '-40px', left: '1.5rem', width: '80px', height: '80px', borderRadius: '50%', border: '4px solid white', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', color: '#064E3B', overflow: 'hidden' }}>
                                {match.avatar_url ? <img src={match.avatar_url} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (match.full_name ? match.full_name.charAt(0) : 'U')}
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div style={{ padding: '3.5rem 1.5rem 1.5rem 1.5rem', flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#111827', margin: 0 }}>{match.full_name || 'Anonymous User'}</h3>
                                {match.verification_level === 'fully_verified' && <ShieldCheck size={18} color="#059669" title="Verified Profile" />}
                            </div>
                            
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#4B5563' }}>
                                {match.residence && <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={14} /> {match.residence}</span>}
                                {match.profession && <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Briefcase size={14} /> {match.profession}</span>}
                            </div>

                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                                <span style={{ padding: '0.2rem 0.6rem', backgroundColor: '#F3F4F6', borderRadius: '4px', fontSize: '0.8rem', color: '#374151', fontWeight: '500' }}>{match.sect || 'Sect not specified'}</span>
                                <span style={{ padding: '0.2rem 0.6rem', backgroundColor: '#F3F4F6', borderRadius: '4px', fontSize: '0.8rem', color: '#374151', fontWeight: '500' }}>{match.praying_frequency || 'Prayer info hidden'}</span>
                            </div>

                            {/* AI Context Section */}
                            <div style={{ marginBottom: '1.5rem', backgroundColor: '#FFFBEB', padding: '1rem', borderRadius: '8px', border: '1px solid #FEF3C7' }}>
                                {aiContexts[match.id] ? (
                                    <div style={{ fontSize: '0.9rem', color: '#92400E', fontStyle: 'italic', lineHeight: '1.5' }}>
                                        <Sparkles size={14} style={{ display: 'inline', marginRight: '5px' }} />
                                        {aiContexts[match.id]}
                                    </div>
                                ) : (
                                    <button 
                                        onClick={() => generateContext(match.id, match)}
                                        disabled={generatingContextId === match.id}
                                        style={{ width: '100%', padding: '0.5rem', backgroundColor: 'transparent', border: '1px dashed #D4AF37', color: '#B45309', borderRadius: '4px', cursor: generatingContextId === match.id ? 'not-allowed' : 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: '500' }}
                                    >
                                        <Sparkles size={14} /> 
                                        {generatingContextId === match.id ? 'Analyzing compatibility...' : 'Why is this a good match? (AI)'}
                                    </button>
                                )}
                            </div>

                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                                <button style={{ flex: 1, padding: '0.8rem', backgroundColor: '#064E3B', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
                                    Connect
                                </button>
                                <button style={{ padding: '0.8rem', backgroundColor: 'transparent', color: '#064E3B', border: '1px solid #064E3B', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
                                    View Profile
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MatchingEngine;
