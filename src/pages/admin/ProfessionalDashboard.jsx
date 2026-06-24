import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Users, ClipboardList, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const ProfessionalDashboard = () => {
    const [professional, setProfessional] = useState(null);
    const [queue, setQueue] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Evaluation Form State
    const [notes, setNotes] = useState('');
    const [score, setScore] = useState(50);
    const [recommendation, setRecommendation] = useState('pending');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const init = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
                setProfessional(data);
                fetchQueue(data.role);
            }
        };
        init();
    }, []);

    const fetchQueue = async (role) => {
        setLoading(true);
        try {
            // For both medical and psychologists, pull users who are unverified or pending evaluation
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .in('verification_level', ['unverified', 'pending'])
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            setQueue(data || []);
        } catch (error) {
            console.error('Error fetching queue:', error);
        } finally {
            setLoading(false);
        }
    };

    const submitEvaluation = async () => {
        if (!selectedUser || !professional) return;
        setSubmitting(true);
        try {
            // 1. Insert the evaluation record
            const { error: evalError } = await supabase
                .from('professional_evaluations')
                .insert({
                    user_id: selectedUser.id,
                    evaluator_id: professional.id,
                    evaluator_role: professional.role,
                    notes: notes,
                    readiness_score: score,
                    recommendation_status: recommendation
                });
            if (evalError) throw evalError;

            // 2. Update the user's profile status based on the role and recommendation
            let updatePayload = {};
            if (professional.role === 'medical_officer') {
                updatePayload.medical_clearance_status = recommendation === 'approved' ? 'cleared' : 'flagged';
            } else {
                // Psychologist logic
                if (recommendation === 'approved') {
                    updatePayload.verification_level = 'fully_verified'; // Assuming psychologist approval verifies them
                }
            }

            const { error: updateError } = await supabase
                .from('profiles')
                .update(updatePayload)
                .eq('id', selectedUser.id);
            if (updateError) throw updateError;

            alert('Evaluation submitted successfully!');
            setSelectedUser(null);
            setNotes('');
            setScore(50);
            setRecommendation('pending');
            fetchQueue(professional.role);
        } catch (error) {
            console.error('Submission failed:', error);
            alert('Failed to submit evaluation.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div style={{ padding: '3rem' }}>Loading Queue...</div>;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            {/* Sidebar Queue */}
            <div style={{ width: '300px', backgroundColor: 'white', borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid #E5E7EB', backgroundColor: '#064E3B', color: 'white' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.2rem' }}>Professional Portal</h2>
                    <p style={{ fontSize: '0.8rem', opacity: 0.8, textTransform: 'capitalize' }}>
                        Role: {professional?.role?.replace('_', ' ')}
                    </p>
                </div>
                
                <div style={{ padding: '1rem', flex: 1, overflowY: 'auto' }}>
                    <h3 style={{ fontSize: '0.9rem', color: '#6B7280', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: '600' }}>Pending Queue ({queue.length})</h3>
                    {queue.length === 0 ? (
                        <p style={{ color: '#9CA3AF', fontSize: '0.9rem', textAlign: 'center', marginTop: '2rem' }}>No profiles pending review.</p>
                    ) : (
                        queue.map(user => (
                            <div 
                                key={user.id} 
                                onClick={() => setSelectedUser(user)}
                                style={{ 
                                    padding: '1rem', 
                                    border: '1px solid',
                                    borderColor: selectedUser?.id === user.id ? '#059669' : '#E5E7EB',
                                    backgroundColor: selectedUser?.id === user.id ? '#ECFDF5' : 'white',
                                    borderRadius: '8px', 
                                    marginBottom: '0.8rem', 
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <div style={{ fontWeight: '600', color: '#111827', marginBottom: '0.2rem' }}>{user.full_name || 'Anonymous User'}</div>
                                <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>Registered: {new Date(user.created_at).toLocaleDateString()}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Main Evaluation Area */}
            <div style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
                {!selectedUser ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9CA3AF' }}>
                        <ClipboardList size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                        <h2>Select a profile from the queue to begin evaluation</h2>
                    </div>
                ) : (
                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <div>
                                <h1 style={{ fontSize: '2rem', color: '#111827', marginBottom: '0.5rem' }}>Evaluating: {selectedUser.full_name || 'Anonymous'}</h1>
                                <p style={{ color: '#6B7280' }}>{selectedUser.email}</p>
                            </div>
                            <span style={{ backgroundColor: '#FEF3C7', color: '#92400E', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '600' }}>
                                Needs Clearance
                            </span>
                        </header>

                        {/* Profile Details Card */}
                        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.2rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.8rem', marginBottom: '1.5rem', color: '#111827' }}>Profile Details</h3>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                <div>
                                    <h4 style={{ color: '#064E3B', marginBottom: '1rem', fontSize: '1rem', fontWeight: '600' }}>Religious & Personal</h4>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#374151', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                        <li><strong>Sect:</strong> {selectedUser.sect || 'N/A'}</li>
                                        <li><strong>Level of Practice:</strong> {selectedUser.level_of_practice || 'N/A'}</li>
                                        <li><strong>Modesty:</strong> {selectedUser.modesty_preference || 'N/A'}</li>
                                        <li><strong>Polygamy Stance:</strong> {selectedUser.polygamy_stance || 'N/A'}</li>
                                    </ul>
                                </div>
                                <div style={{ padding: '1.5rem', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                                    <h4 style={{ color: '#991B1B', marginBottom: '1rem', fontSize: '1rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <AlertTriangle size={18} /> Medical Data
                                    </h4>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#374151', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                        <li><strong>Genotype:</strong> {selectedUser.genotype || 'N/A'}</li>
                                        <li><strong>Blood Group:</strong> {selectedUser.blood_group || 'N/A'}</li>
                                        <li><strong>Health Status:</strong> {selectedUser.health_status || 'N/A'}</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div style={{ marginTop: '2rem' }}>
                                <h4 style={{ color: '#064E3B', marginBottom: '0.8rem', fontSize: '1rem', fontWeight: '600' }}>About Self</h4>
                                <div style={{ backgroundColor: '#F9FAFB', padding: '1rem', borderRadius: '8px', color: '#4B5563', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                    {selectedUser.about_self || 'No description provided.'}
                                </div>
                            </div>
                        </div>

                        {/* Evaluation Form */}
                        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', borderTop: '4px solid #064E3B' }}>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: '#111827' }}>Professional Assessment</h3>
                            
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Confidential Notes</label>
                                <textarea 
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder={`Enter your ${professional?.role === 'medical_officer' ? 'medical' : 'psychological'} assessment notes here. These will never be shown to the user.`}
                                    style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #D1D5DB', minHeight: '150px', fontSize: '1rem' }}
                                />
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Readiness/Safety Score ({score}/100)</label>
                                <input 
                                    type="range" 
                                    min="0" max="100" 
                                    value={score}
                                    onChange={(e) => setScore(e.target.value)}
                                    style={{ width: '100%' }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                                <button 
                                    onClick={() => setRecommendation('approved')}
                                    style={{ flex: 1, padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', borderRadius: '8px', border: '2px solid #059669', backgroundColor: recommendation === 'approved' ? '#059669' : 'white', color: recommendation === 'approved' ? 'white' : '#059669', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
                                >
                                    <CheckCircle size={20} /> Recommend Clearance
                                </button>
                                <button 
                                    onClick={() => setRecommendation('rejected')}
                                    style={{ flex: 1, padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', borderRadius: '8px', border: '2px solid #DC2626', backgroundColor: recommendation === 'rejected' ? '#DC2626' : 'white', color: recommendation === 'rejected' ? 'white' : '#DC2626', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
                                >
                                    <XCircle size={20} /> Recommend Rejection
                                </button>
                            </div>

                            <button 
                                onClick={submitEvaluation}
                                disabled={submitting || recommendation === 'pending'}
                                style={{ width: '100%', padding: '1rem', backgroundColor: '#064E3B', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', cursor: (submitting || recommendation === 'pending') ? 'not-allowed' : 'pointer', opacity: (submitting || recommendation === 'pending') ? 0.5 : 1 }}
                            >
                                {submitting ? 'Submitting...' : 'Submit Final Evaluation'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfessionalDashboard;
