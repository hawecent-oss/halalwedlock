import React, { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Heart, Mail, Lock, User, ArrowRight, CheckCircle, Shield, Users } from 'lucide-react';

// Dynamic imports moved inside the component to prevent top-level await crashes

const Register = () => {
    const [session, setSession] = useState(null);
    const [AuthComponent, setAuthComponent] = useState(null);
    const [Theme, setTheme] = useState(null);

    useEffect(() => {
        // Load Auth UI dynamically to prevent top-level await crashes
        if (isSupabaseConfigured) {
            import('@supabase/auth-ui-react').then(mod => setAuthComponent(() => mod.Auth)).catch(console.warn);
            import('@supabase/auth-ui-shared').then(mod => setTheme(() => mod.ThemeSupa)).catch(console.warn);
        }

        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

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
                            onClick={() => window.location.href = '/dashboard'}
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

    // If Supabase is configured, show Auth UI
    if (isSupabaseConfigured && AuthComponent && Theme) {
        return (
            <div style={{ padding: '6rem 0', backgroundColor: 'var(--background-cream)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', width: '100%', maxWidth: '500px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ color: 'var(--primary-green)', fontSize: '2rem', marginBottom: '0.5rem' }}>Create Account</h2>
                        <p style={{ color: '#666', fontSize: '1rem' }}>Bismillah. Start your journey below.</p>
                    </div>
                    <AuthComponent 
                        supabaseClient={supabase} 
                        appearance={{ 
                            theme: Theme,
                            variables: {
                                default: {
                                    colors: {
                                        brand: '#064E3B',
                                        brandAccent: '#047857',
                                    }
                                }
                            }
                        }} 
                        providers={[]} 
                        theme="light"
                    />
                </div>
            </div>
        );
    }

    // Fallback: Supabase not configured — show a beautiful coming soon page
    return (
        <div style={{ 
            padding: '6rem 1rem', 
            backgroundColor: 'var(--background-cream)', 
            minHeight: '80vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
        }}>
            <div style={{ 
                backgroundColor: 'white', 
                padding: '3rem', 
                borderRadius: '16px', 
                boxShadow: '0 20px 60px rgba(6,78,59,0.1)', 
                width: '100%', 
                maxWidth: '550px',
                textAlign: 'center'
            }}>
                {/* Header */}
                <div style={{ 
                    width: '80px', height: '80px', 
                    background: 'linear-gradient(135deg, #064E3B, #047857)', 
                    borderRadius: '50%', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    margin: '0 auto 1.5rem auto',
                    boxShadow: '0 8px 25px rgba(6,78,59,0.3)'
                }}>
                    <Heart size={36} color="white" fill="white" />
                </div>
                
                <h2 style={{ 
                    color: 'var(--primary-green)', 
                    fontSize: '2rem', 
                    marginBottom: '0.5rem',
                    fontFamily: 'Playfair Display, serif'
                }}>
                    Begin Your Journey
                </h2>
                <p style={{ color: '#888', fontSize: '1rem', marginBottom: '2.5rem' }}>
                    Bismillah. Registration is opening very soon, In Shaa Allah.
                </p>

                {/* Features List */}
                <div style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
                    {[
                        { icon: <Shield size={20} />, text: 'Verified Muslim profiles only' },
                        { icon: <Users size={20} />, text: 'Wali/Guardian involvement built-in' },
                        { icon: <Heart size={20} />, text: 'AI-powered halal matchmaking' },
                    ].map((item, i) => (
                        <div key={i} style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '1rem', 
                            padding: '0.8rem 1rem',
                            marginBottom: '0.5rem',
                            backgroundColor: 'rgba(6,78,59,0.04)',
                            borderRadius: '8px'
                        }}>
                            <div style={{ color: 'var(--primary-green)', flexShrink: 0 }}>{item.icon}</div>
                            <span style={{ color: '#555', fontSize: '0.95rem' }}>{item.text}</span>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <a 
                    href="mailto:info@halalwedlock.com?subject=Early Access Request&body=Assalamu Alaikum, I would like to join HalalWedlock early access."
                    style={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '1rem 2.5rem', 
                        background: 'linear-gradient(135deg, #064E3B, #047857)', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '30px', 
                        cursor: 'pointer', 
                        fontWeight: '700',
                        fontSize: '1rem',
                        textDecoration: 'none',
                        boxShadow: '0 6px 20px rgba(6,78,59,0.3)',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <Mail size={18} />
                    Request Early Access
                    <ArrowRight size={18} />
                </a>
                
                <p style={{ color: '#aaa', fontSize: '0.85rem', marginTop: '1.5rem' }}>
                    We will notify you as soon as registration opens, In Shaa Allah.
                </p>
            </div>
        </div>
    );
};

export default Register;
