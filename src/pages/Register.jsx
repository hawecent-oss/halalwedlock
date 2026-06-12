import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const Register = () => {
    const [session, setSession] = useState(null);

    useEffect(() => {
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

    if (!session) {
        return (
            <div style={{ padding: '6rem 0', backgroundColor: 'var(--background-cream)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', width: '100%', maxWidth: '500px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ color: 'var(--primary-green)', fontSize: '2rem', marginBottom: '0.5rem' }}>Create Account</h2>
                        <p style={{ color: '#666', fontSize: '1rem' }}>Bismillah. Start your journey below.</p>
                    </div>
                    <Auth 
                        supabaseClient={supabase} 
                        appearance={{ 
                            theme: ThemeSupa,
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

    return (
        <div style={{ padding: '8rem 0', backgroundColor: 'var(--background-cream)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ backgroundColor: 'white', padding: '4rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center', maxWidth: '600px' }}>
                <div style={{ width: '80px', height: '80px', backgroundColor: 'rgba(6,78,59,0.1)', color: 'var(--primary-green)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
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
};

export default Register;
