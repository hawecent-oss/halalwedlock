import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        gender: '',
        age: '',
        profession: '',
        sect: '',
        prayingFrequency: '',
        maritalStatus: '',
        aboutMe: ''
    });
    const [status, setStatus] = useState({ loading: false, error: null, success: false });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, error: null, success: false });

        try {
            const { error } = await supabase
                .from('profiles')
                .insert([
                    {
                        full_name: formData.fullName,
                        email: formData.email,
                        gender: formData.gender,
                        age: parseInt(formData.age),
                        profession: formData.profession,
                        sect: formData.sect,
                        praying_frequency: formData.prayingFrequency,
                        marital_status: formData.maritalStatus,
                        about_me: formData.aboutMe,
                        status: 'pending' // pending manual review
                    }
                ]);

            if (error) throw error;
            
            setStatus({ loading: false, error: null, success: true });
            setFormData({
                fullName: '', email: '', gender: '', age: '', profession: '',
                sect: '', prayingFrequency: '', maritalStatus: '', aboutMe: ''
            });

        } catch (error) {
            console.error('Error registering:', error);
            setStatus({ loading: false, error: 'Registration failed. Please try again.', success: false });
        }
    };

    if (status.success) {
        return (
            <div style={{ padding: '8rem 0', backgroundColor: 'var(--background-cream)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ backgroundColor: 'white', padding: '4rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center', maxWidth: '600px' }}>
                    <div style={{ width: '80px', height: '80px', backgroundColor: 'rgba(6,78,59,0.1)', color: 'var(--primary-green)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto' }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <h2 style={{ color: 'var(--primary-green)', marginBottom: '1rem', fontSize: '2rem' }}>Alhamdulillah!</h2>
                    <p style={{ color: '#666', lineHeight: '1.6', fontSize: '1.1rem', marginBottom: '2rem' }}>
                        Your profile has been submitted successfully. Our team will manually review your application to ensure authenticity. We will notify you via email once approved.
                    </p>
                    <button 
                        onClick={() => setStatus({ ...status, success: false })}
                        style={{ padding: '0.8rem 2rem', backgroundColor: 'var(--primary-green)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}
                    >
                        Return to Registration
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: '6rem 0', backgroundColor: 'var(--background-cream)' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ color: 'var(--primary-green)', fontSize: '2.5rem', marginBottom: '1rem' }}>Create Your Profile</h1>
                    <p style={{ color: '#666', fontSize: '1.1rem' }}>Fill out the details below honestly to help us find your best match.</p>
                </div>

                <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                    {status.error && (
                        <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '4px', marginBottom: '2rem', textAlign: 'center' }}>
                            {status.error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-dark)' }}>Full Name</label>
                                <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Your legal name" />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-dark)' }}>Email Address</label>
                                <input required type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="For communication only" />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-dark)' }}>Gender</label>
                                <select required name="gender" value={formData.gender} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}>
                                    <option value="">Select...</option>
                                    <option value="Brother">Brother</option>
                                    <option value="Sister">Sister</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-dark)' }}>Age</label>
                                <input required type="number" min="18" name="age" value={formData.age} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-dark)' }}>Marital Status</label>
                                <select required name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}>
                                    <option value="">Select...</option>
                                    <option value="Never Married">Never Married</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Widowed">Widowed</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-dark)' }}>Islamic Sect/Methodology</label>
                                <select required name="sect" value={formData.sect} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}>
                                    <option value="">Select...</option>
                                    <option value="Sunni">Sunni</option>
                                    <option value="Salafi">Salafi</option>
                                    <option value="Sufi">Sufi</option>
                                    <option value="Just Muslim">Just Muslim</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-dark)' }}>Praying Frequency</label>
                                <select required name="prayingFrequency" value={formData.prayingFrequency} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}>
                                    <option value="">Select...</option>
                                    <option value="Always (5 times)">Always (5 times)</option>
                                    <option value="Usually">Usually</option>
                                    <option value="Sometimes">Sometimes</option>
                                    <option value="Struggling">Struggling</option>
                                </select>
                            </div>
                        </div>
                        
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-dark)' }}>Profession</label>
                            <input required type="text" name="profession" value={formData.profession} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="e.g. Software Engineer, Teacher, Business Owner" />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-dark)' }}>About Me & What I'm Looking For</label>
                            <textarea required name="aboutMe" value={formData.aboutMe} onChange={handleChange} rows="5" style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical' }} placeholder="Tell us about yourself, your lifestyle, and the qualities you seek in a spouse..."></textarea>
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                            <button 
                                type="submit" 
                                disabled={status.loading}
                                style={{ 
                                    width: '100%', 
                                    padding: '1.2rem', 
                                    backgroundColor: status.loading ? '#ccc' : 'var(--primary-green)', 
                                    color: 'white', 
                                    border: 'none', 
                                    borderRadius: '4px', 
                                    fontWeight: '700',
                                    fontSize: '1.1rem',
                                    cursor: status.loading ? 'not-allowed' : 'pointer',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}
                            >
                                {status.loading ? 'Submitting...' : 'Submit Profile for Review'}
                            </button>
                            <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#666', marginTop: '1rem' }}>
                                By submitting, you agree to our terms of service and verify that all provided information is accurate to the best of your knowledge.
                            </p>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
