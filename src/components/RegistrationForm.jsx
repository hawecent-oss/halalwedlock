import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { submitToN8N } from '../utils/n8n';

const RegistrationForm = ({ gender }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        location: '',
        sect: '',
        levelOfPractice: '',
        marriageIntention: '', // single, divorced, widowed
        guardianInvolvement: 'no',
        guardianContact: '',
        values: '',
        goals: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const { data, error } = await supabase
                .from('profiles')
                .insert([
                    {
                        full_name: formData.fullName,
                        age: parseInt(formData.age),
                        gender: gender,
                        location: formData.location,
                        sect: formData.sect,
                        level_of_practice: formData.levelOfPractice,
                        modesty_preference: formData.modesty,
                        financial_stability: formData.stability,
                        marital_status: formData.marriageIntention,
                        guardian_contact: formData.guardianContact,
                        status: 'pending'
                    }
                ]);

            if (error) throw error;

            // Trigger n8n Automation
            await submitToN8N('registration', {
                ...formData,
                gender: gender,
                id: data?.[0]?.id // If returned
            });

            setSubmitStatus({ type: 'success', message: 'Registration submitted successfully! Our admin team will review your profile.' });
            // Optionally reset form or redirect
        } catch (error) {
            console.error('Error submitting registration:', error);
            setSubmitStatus({ type: 'error', message: 'Error submitting registration. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitStatus?.type === 'success') {
        return (
            <div className="section container" style={{ maxWidth: '600px', textAlign: 'center', padding: '3rem' }}>
                <div style={{ backgroundColor: 'var(--white)', padding: 'var(--spacing-md)', borderRadius: '12px', boxShadow: 'var(--shadow-lg)' }}>
                    <h2 style={{ color: 'var(--primary-green)' }}>JazakAllah Khair</h2>
                    <p style={{ marginTop: '1rem' }}>{submitStatus.message}</p>
                    <button onClick={() => window.location.href = '/'} className="btn btn-primary" style={{ marginTop: '2rem' }}>Back to Home</button>
                </div>
            </div>
        );
    }

    return (
        <div className="section container" style={{ maxWidth: '600px' }}>
            <div style={{ backgroundColor: 'var(--white)', padding: 'var(--spacing-md)', borderRadius: '12px', boxShadow: 'var(--shadow-lg)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    {gender === 'male' ? 'Brother\'s' : 'Sister\'s'} Registration
                </h2>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
                    {[1, 2, 3].map(i => (
                        <div key={i} style={{ flex: 1, height: '4px', backgroundColor: step >= i ? 'var(--primary-green)' : '#eee', borderRadius: '4px' }} />
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label>Full Name</label>
                                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }} required />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label>Age</label>
                                    <input type="number" name="age" value={formData.age} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }} required />
                                </div>
                                <div>
                                    <label>Location</label>
                                    <input type="text" name="location" value={formData.location} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }} required />
                                </div>
                            </div>
                            <button type="button" onClick={nextStep} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Next: Religious Profile</button>
                        </div>
                    )}

                    {step === 2 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label>Sect (Sunni/Shia/Other)</label>
                                <select name="sect" value={formData.sect} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }} required>
                                    <option value="">Select...</option>
                                    <option value="sunni">Sunni</option>
                                    <option value="shia">Shia</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label>Level of Practice & Commitment to Sunnah</label>
                                <select name="levelOfPractice" value={formData.levelOfPractice} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }} required>
                                    <option value="">Select...</option>
                                    <option value="very">Strict adherence to Fardh & Sunnah</option>
                                    <option value="moderately">Regularly practicing Fardh</option>
                                    <option value="reverting">Reverting / Actively Learning</option>
                                </select>
                            </div>
                            {gender === 'female' && (
                                <div>
                                    <label>Hijab / Modesty Preference</label>
                                    <select name="modesty" value={formData.modesty} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }} required>
                                        <option value="">Select...</option>
                                        <option value="niqab">Niqab</option>
                                        <option value="hijab">Hijab</option>
                                        <option value="none">Observing basic modesty</option>
                                    </select>
                                </div>
                            )}
                            {gender === 'male' && (
                                <div>
                                    <label>Role as Provider (Financial Stability)</label>
                                    <select name="stability" value={formData.stability} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }} required>
                                        <option value="">Select...</option>
                                        <option value="stable">Stable Income & Ready to provide</option>
                                        <option value="working">Establishing career</option>
                                        <option value="student">Student / Early stage</option>
                                    </select>
                                </div>
                            )}
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" onClick={prevStep} className="btn" style={{ flex: 1, backgroundColor: '#eee' }}>Back</button>
                                <button type="button" onClick={nextStep} className="btn btn-primary" style={{ flex: 2 }}>Next: Marriage Intention</button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label>Marital Status</label>
                                <select name="marriageIntention" value={formData.marriageIntention} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }} required>
                                    <option value="">Select...</option>
                                    <option value="single">Never Married</option>
                                    <option value="divorced">Divorced</option>
                                    <option value="widowed">Widowed</option>
                                </select>
                            </div>
                            <div>
                                <label>{gender === 'female' ? 'Wali (Guardian) Contact Details' : 'Guardian / Family Reference'}</label>
                                <input
                                    type="text"
                                    name="guardianContact"
                                    placeholder={gender === 'female' ? "Phone or Email of your Wali" : "Family reference contact"}
                                    value={formData.guardianContact}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
                                    required
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" onClick={prevStep} className="btn" style={{ flex: 1, backgroundColor: '#eee' }}>Back</button>
                                <button type="submit" className="btn btn-accent" style={{ flex: 2 }} disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                                </button>
                            </div>
                            {submitStatus?.type === 'error' && (
                                <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{submitStatus.message}</p>
                            )}
                            <p style={{ fontSize: '0.8rem', opacity: 0.6, textAlign: 'center', marginTop: '1rem' }}>
                                All submissions are confidential and reviewed by Hawescent Admin for Halal compliance.
                            </p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
