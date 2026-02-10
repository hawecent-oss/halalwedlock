import React from 'react';
import RegistrationForm from '../components/RegistrationForm';

const RegisterFemale = () => {
    return (
        <div className="register-female-page">
            <div className="section halal-pattern" style={{ borderBottom: '1px solid #eee' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1 style={{ color: 'var(--secondary-green)' }}>Sister's Registration</h1>
                    <p>Start your journey towards a blessed union in a secure environment.</p>
                </div>
            </div>
            <RegistrationForm gender="female" />
        </div>
    );
};

export default RegisterFemale;
