import React from 'react';
import RegistrationForm from '../components/RegistrationForm';

const RegisterMale = () => {
    return (
        <div className="register-male-page">
            <div className="section halal-pattern" style={{ borderBottom: '1px solid #eee' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1 style={{ color: 'var(--primary-green)' }}>Brother's Registration</h1>
                    <p>Join a community committed to building pious Islamic families.</p>
                </div>
            </div>
            <RegistrationForm gender="male" />
        </div>
    );
};

export default RegisterMale;
