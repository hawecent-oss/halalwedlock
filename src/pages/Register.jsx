import React, { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Heart, Mail, Lock, User, ArrowRight, CheckCircle, Shield, Users } from 'lucide-react';

const Register = () => {
    const [session, setSession] = useState(null);
    const [userRole, setUserRole] = useState('user');
    const [loading, setLoading] = useState(true);
    
    // Custom Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [authLoading, setAuthLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        const fetchRole = async (userId) => {
            const { data } = await supabase.from('profiles').select('role').eq('id', userId).single();
            if (data && data.role) setUserRole(data.role);
        };

        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session) fetchRole(session.user.id);
            setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) fetchRole(session.user.id);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleAuth = async (e) => {
        e.preventDefault();
        setAuthLoading(true);
        setMessage({ type: '', text: '' });

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                setMessage({ type: 'success', text: 'Registration successful! Please check your email to verify your account.' });
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
            }
        } catch (error) {
            console.error("Auth Error:", error);
            // Append the Supabase URL it's trying to hit so we can see if it's malformed
            const urlUsed = import.meta.env.VITE_SUPABASE_URL;
            setMessage({ 
                type: 'error', 
                text: `${error.message} (Tried to connect to: ${urlUsed})` 
            });
        } finally {
            setAuthLoading(false);
        }
    };

    // If still loading session
    if (loading) {
        return (
            <div style={{ padding: '8rem 0', backgroundColor: 'var(--background-cream)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ color: 'var(--primary-green)' }}>Loading...</div>
            </div>
        );
    }

    // If user is logged in
    if (session) {
        return (
            <div style={{ padding: '8rem 0', backgroundColor: 'var(--background-cream)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ backgroundColor: 'white', padding: '4rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center', maxWidth: '600px' }}>
                    <div style={{ width: '80px', height: '80px', backgroundColor: 'rgba(6,78,59,0.1)', color: 'var(--primary-green)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto' }}>
                        <CheckCircle size={40} />
                    </div>
                    <h2 style={{ color: 'var(--primary-green)', marginBottom: '1rem', fontSize: '2rem' }}>Alhamdulillah!</h2>
                    <p style={{ color: '#666', lineHeight: '1.6', fontSize: '1.1rem', marginBottom: '2rem' }}>
                        Your account has been created successfully. Welcome to HalalWedlock, {session.user.email}.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button 
                            onClick={() => {
                                let targetUrl = '/dashboard';
                                if (userRole === 'super_admin') targetUrl = '/superadmin';
                                else if (userRole === 'psychologist' || userRole === 'medical_officer') targetUrl = '/professional';
                                window.location.href = targetUrl;
                            }}
                            style={{ padding: '0.8rem 2rem', backgroundColor: 'var(--primary-green)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}
                        >
                            Go to Dashboard
                        </button>
                        <button 
                            onClick={() => supabase.auth.signOut()}
                            style={{ padding: '0.8rem 2rem', backgroundColor: 'transparent', color: 'var(--primary-green)', border: '1px solid var(--primary-green)', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // If Supabase is configured, show Custom Auth Form
    if (isSupabaseConfigured) {
        return (
            <div style={{ padding: '6rem 0', backgroundColor: 'var(--background-cream)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', width: '100%', maxWidth: '450px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ color: 'var(--primary-green)', fontSize: '2rem', marginBottom: '0.5rem' }}>
                            {isSignUp ? 'Create Account' : 'Welcome Back'}
                        </h2>
                        <p style={{ color: '#666', fontSize: '1rem' }}>Bismillah. Start your journey below.</p>
                    </div>

                    {message.text && (
                        <div style={{ 
                            padding: '1rem', 
                            marginBottom: '1.5rem', 
                            borderRadius: '8px', 
                            backgroundColor: message.type === 'error' ? '#FEE2E2' : '#D1FAE5',
                            color: message.type === 'error' ? '#B91C1C' : '#065F46',
                            fontSize: '0.9rem',
                            textAlign: 'center'
                        }}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#444', fontWeight: '500' }}>Email Address</label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email"
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#444', fontWeight: '500' }}>Password</label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={authLoading}
                            style={{ 
                                width: '100%', 
                                padding: '1rem', 
                                backgroundColor: 'var(--primary-green)', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '8px', 
                                fontSize: '1.1rem', 
                                fontWeight: '600',
                                cursor: authLoading ? 'not-allowed' : 'pointer',
                                opacity: authLoading ? 0.7 : 1,
                                marginTop: '0.5rem'
                            }}
                        >
                            {authLoading ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Log In')}
                        </button>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #eee' }}>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>
                            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                            <button 
                                onClick={() => setIsSignUp(!isSignUp)}
                                style={{ background: 'none', border: 'none', color: 'var(--primary-green)', fontWeight: '600', marginLeft: '0.5rem', cursor: 'pointer', textDecoration: 'underline' }}
                            >
                                {isSignUp ? 'Log In' : 'Sign Up'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Fallback: Supabase not configured
    return (
        <div style={{ padding: '6rem 1rem', backgroundColor: 'var(--background-cream)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '16px', boxShadow: '0 20px 60px rgba(6,78,59,0.1)', width: '100%', maxWidth: '550px', textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #064E3B, #047857)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                    <Heart size={36} color="white" fill="white" />
                </div>
                <h2 style={{ color: 'var(--primary-green)', fontSize: '2rem', marginBottom: '0.5rem', fontFamily: 'Playfair Display, serif' }}>Begin Your Journey</h2>
                <p style={{ color: '#888', fontSize: '1rem', marginBottom: '2.5rem' }}>Bismillah. Registration is opening very soon, In Shaa Allah.</p>
                <div style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
                    {[{ icon: <Shield size={20} />, text: 'Verified Muslim profiles only' }, { icon: <Users size={20} />, text: 'Wali/Guardian involvement built-in' }, { icon: <Heart size={20} />, text: 'AI-powered halal matchmaking' }].map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1rem', marginBottom: '0.5rem', backgroundColor: 'rgba(6,78,59,0.04)', borderRadius: '8px' }}>
                            <div style={{ color: 'var(--primary-green)', flexShrink: 0 }}>{item.icon}</div>
                            <span style={{ color: '#555', fontSize: '0.95rem' }}>{item.text}</span>
                        </div>
                    ))}
                </div>
                <a href="mailto:hawecent@gmail.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2.5rem', background: 'linear-gradient(135deg, #064E3B, #047857)', color: 'white', border: 'none', borderRadius: '30px', fontWeight: '700', textDecoration: 'none' }}>
                    <Mail size={18} /> Request Early Access <ArrowRight size={18} />
                </a>
            </div>
        </div>
    );
};

export default Register;
