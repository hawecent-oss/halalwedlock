import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { aiService } from '../../lib/aiService';
import { Users, UserCheck, Activity, DollarSign, Search, Shield, Printer, Sparkles, Send } from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // AI State
    const [aiMoral, setAiMoral] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            setUsers(data || []);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePrintProfile = (userId) => {
        alert(`Generating printable PDF for User ID: ${userId}...`);
        window.print();
    };

    const verifyUser = async (userId) => {
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ verification_level: 'fully_verified' })
                .eq('id', userId);
            
            if (error) throw error;
            alert('User verified successfully!');
            fetchUsers();
        } catch (error) {
            console.error('Error verifying user:', error);
            alert('Failed to verify user.');
        }
    };

    const generateMoral = async () => {
        setIsGenerating(true);
        try {
            const moral = await aiService.generateDailyMoral();
            setAiMoral(moral);
        } catch (error) {
            console.error(error);
            alert("Error generating moral. Check your Gemini API key.");
        } finally {
            setIsGenerating(false);
        }
    };

    const changeUserRole = async (userId, newRole) => {
        if (!window.confirm(`Are you sure you want to assign the role: ${newRole}?`)) return;
        try {
            const { error } = await supabase.from('profiles').update({ role: newRole }).eq('id', userId);
            if (error) throw error;
            alert('Role updated successfully!');
            fetchUsers();
        } catch (error) {
            console.error('Error updating role:', error);
            alert('Failed to update role.');
        }
    };

    const stats = [
        { label: 'Total Users', value: users.length, icon: <Users size={24} color="#064E3B" /> },
        { label: 'Pending Verification', value: users.filter(u => u.verification_level === 'unverified').length, icon: <Shield size={24} color="#D4AF37" /> },
        { label: 'Active Matches', value: '0', icon: <Activity size={24} color="#059669" /> },
        { label: 'Revenue', value: '₦0', icon: <DollarSign size={24} color="#047857" /> }
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            {/* Sidebar */}
            <div style={{ width: '250px', backgroundColor: '#064E3B', color: 'white', padding: '2rem 0', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '0 2rem', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontFamily: 'Playfair Display, serif', color: '#D4AF37' }}>HalalWedlock</h2>
                    <p style={{ fontSize: '0.8rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '1px' }}>Super Admin</p>
                </div>
                
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                    {[
                        { id: 'overview', label: 'Overview', icon: <Activity size={20} /> },
                        { id: 'users', label: 'User Management', icon: <Users size={20} /> },
                        { id: 'staff', label: 'Staff Assignment', icon: <Shield size={20} /> },
                        { id: 'verifications', label: 'Verifications', icon: <UserCheck size={20} /> },
                        { id: 'ai', label: 'AI Assistant', icon: <Sparkles size={20} /> }
                    ].map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1rem 2rem',
                                backgroundColor: activeTab === tab.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                                border: 'none',
                                color: activeTab === tab.id ? '#D4AF37' : 'white',
                                cursor: 'pointer',
                                width: '100%',
                                textAlign: 'left',
                                borderLeft: activeTab === tab.id ? '4px solid #D4AF37' : '4px solid transparent',
                                transition: 'all 0.2s'
                            }}
                        >
                            {tab.icon}
                            <span style={{ fontWeight: '500' }}>{tab.label}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2rem', color: '#111827' }}>
                        {activeTab === 'overview' && 'Dashboard Overview'}
                        {activeTab === 'users' && 'User Management'}
                        {activeTab === 'staff' && 'Staff Management & Assignment'}
                        {activeTab === 'verifications' && 'Verification Queue'}
                        {activeTab === 'ai' && 'AI Marriage Assistant'}
                    </h1>
                </header>

                {/* Stats Grid (Only on Overview) */}
                {activeTab === 'overview' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                        {stats.map((stat, idx) => (
                            <div key={idx} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <div style={{ backgroundColor: '#F3F4F6', padding: '0.8rem', borderRadius: '8px' }}>
                                        {stat.icon}
                                    </div>
                                </div>
                                <h3 style={{ fontSize: '2rem', color: '#111827', marginBottom: '0.2rem' }}>{stat.value}</h3>
                                <p style={{ color: '#6B7280', fontSize: '0.9rem', fontWeight: '500' }}>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* AI Assistant Tab */}
                {activeTab === 'ai' && (
                    <div style={{ display: 'grid', gap: '2rem', maxWidth: '800px' }}>
                        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <div style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', padding: '0.8rem', borderRadius: '8px' }}>
                                    <Sparkles size={24} color="#D4AF37" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', color: '#111827', fontWeight: '600' }}>Daily Islamic Morals</h3>
                                    <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>Generate and broadcast inspiring quotes about marriage to all users.</p>
                                </div>
                            </div>

                            <div style={{ padding: '1.5rem', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px dashed #D1D5DB', minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', fontStyle: 'italic', color: '#374151' }}>
                                {isGenerating ? "Generating wisdom..." : (aiMoral || "Click generate to create a new daily moral using Gemini AI.")}
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button 
                                    onClick={generateMoral}
                                    disabled={isGenerating}
                                    style={{ flex: 1, padding: '0.8rem', backgroundColor: '#064E3B', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '500', cursor: isGenerating ? 'not-allowed' : 'pointer' }}
                                >
                                    {isGenerating ? 'Generating...' : 'Generate New Moral'}
                                </button>
                                <button 
                                    disabled={!aiMoral}
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flex: 1, padding: '0.8rem', backgroundColor: aiMoral ? '#059669' : '#D1D5DB', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '500', cursor: aiMoral ? 'pointer' : 'not-allowed' }}
                                >
                                    <Send size={18} /> Broadcast to Users
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Staff Assignment Tab */}
                {activeTab === 'staff' && (
                    <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid #E5E7EB' }}>
                            <h3 style={{ fontSize: '1.2rem', color: '#111827', fontWeight: '600' }}>Assign Professional Roles</h3>
                            <p style={{ color: '#6B7280', fontSize: '0.9rem', marginTop: '0.5rem' }}>WARNING: Users assigned as Psychologists or Medical Officers will have access to sensitive profile data.</p>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem 1.5rem', color: '#6B7280', fontWeight: '500', fontSize: '0.85rem', textTransform: 'uppercase' }}>User</th>
                                    <th style={{ padding: '1rem 1.5rem', color: '#6B7280', fontWeight: '500', fontSize: '0.85rem', textTransform: 'uppercase' }}>Current Role</th>
                                    <th style={{ padding: '1rem 1.5rem', color: '#6B7280', fontWeight: '500', fontSize: '0.85rem', textTransform: 'uppercase' }}>Change Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                                        <td style={{ padding: '1rem 1.5rem' }}>
                                            <div style={{ fontWeight: '500', color: '#111827' }}>{user.full_name || 'Anonymous'}</div>
                                            <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>{user.email}</div>
                                        </td>
                                        <td style={{ padding: '1rem 1.5rem' }}>
                                            <span style={{ backgroundColor: user.role === 'super_admin' ? '#FEF2F2' : '#F3F4F6', color: user.role === 'super_admin' ? '#991B1B' : '#374151', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600', textTransform: 'capitalize' }}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem 1.5rem' }}>
                                            <select 
                                                value={user.role} 
                                                onChange={(e) => changeUserRole(user.id, e.target.value)}
                                                style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid #D1D5DB' }}
                                            >
                                                <option value="user">Standard User</option>
                                                <option value="psychologist">Psychologist</option>
                                                <option value="medical_officer">Medical Officer</option>
                                                <option value="super_admin">Super Admin</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Users Table */}
                {(activeTab === 'users' || activeTab === 'overview') && (
                    <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '1.2rem', color: '#111827', fontWeight: '600' }}>Recent Registrations</h3>
                        </div>
                        
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', textAlign: 'left' }}>
                                        <th style={{ padding: '1rem 1.5rem', color: '#6B7280', fontWeight: '500', fontSize: '0.85rem', textTransform: 'uppercase' }}>Name</th>
                                        <th style={{ padding: '1rem 1.5rem', color: '#6B7280', fontWeight: '500', fontSize: '0.85rem', textTransform: 'uppercase' }}>Role</th>
                                        <th style={{ padding: '1rem 1.5rem', color: '#6B7280', fontWeight: '500', fontSize: '0.85rem', textTransform: 'uppercase' }}>Status</th>
                                        <th style={{ padding: '1rem 1.5rem', color: '#6B7280', fontWeight: '500', fontSize: '0.85rem', textTransform: 'uppercase' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center' }}>Loading users...</td></tr>
                                    ) : users.length === 0 ? (
                                        <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center' }}>No users found in database.</td></tr>
                                    ) : (
                                        users.map(user => (
                                            <tr key={user.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                                                <td style={{ padding: '1rem 1.5rem' }}>
                                                    <div style={{ fontWeight: '500', color: '#111827' }}>{user.full_name || 'Anonymous'}</div>
                                                    <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>{user.email}</div>
                                                </td>
                                                <td style={{ padding: '1rem 1.5rem' }}>
                                                    <span style={{ backgroundColor: '#E0F2FE', color: '#0284C7', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '500', textTransform: 'capitalize' }}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1rem 1.5rem' }}>
                                                    <span style={{ 
                                                        backgroundColor: user.verification_level === 'fully_verified' ? '#D1FAE5' : '#FEF3C7', 
                                                        color: user.verification_level === 'fully_verified' ? '#065F46' : '#92400E', 
                                                        padding: '0.2rem 0.6rem', 
                                                        borderRadius: '20px', 
                                                        fontSize: '0.8rem', 
                                                        fontWeight: '500', 
                                                        textTransform: 'capitalize' 
                                                    }}>
                                                        {user.verification_level ? user.verification_level.replace('_', ' ') : 'unverified'}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1rem 1.5rem' }}>
                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        {user.verification_level !== 'fully_verified' && (
                                                            <button 
                                                                onClick={() => verifyUser(user.id)}
                                                                style={{ padding: '0.4rem 0.8rem', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500' }}
                                                            >
                                                                Verify
                                                            </button>
                                                        )}
                                                        <button 
                                                            onClick={() => handlePrintProfile(user.id)}
                                                            style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.4rem 0.8rem', backgroundColor: '#F3F4F6', color: '#374151', border: '1px solid #D1D5DB', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500' }}
                                                        >
                                                            <Printer size={14} /> Print
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
