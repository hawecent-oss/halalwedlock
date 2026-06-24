import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const location = useLocation();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            // 1. Check if user is logged in
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            
            if (sessionError || !session) {
                setIsAuthorized(false);
                setLoading(false);
                return;
            }

            // 2. If no specific roles required, just being logged in is enough
            if (!allowedRoles || allowedRoles.length === 0) {
                setIsAuthorized(true);
                setLoading(false);
                return;
            }

            // 3. Fetch user's role from profiles table
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', session.user.id)
                .single();

            if (profileError || !profile) {
                console.error("Error fetching profile role:", profileError);
                setIsAuthorized(false);
                setLoading(false);
                return;
            }

            // 4. Check if their role is in the allowed list
            if (allowedRoles.includes(profile.role)) {
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.error("Auth check failed:", error);
            setIsAuthorized(false);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'var(--background-cream)' }}>
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <div style={{ 
                        width: '40px', height: '40px', border: '4px solid #064E3B', 
                        borderTopColor: 'transparent', borderRadius: '50%', 
                        animation: 'spin 1s linear infinite', margin: '0 auto 1rem auto' 
                    }} />
                    <p style={{ color: '#064E3B', fontWeight: '500' }}>Verifying Access...</p>
                    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                </div>
            </div>
        );
    }

    if (!isAuthorized) {
        // Redirect them to home if they try to access a page they don't have permission for
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
