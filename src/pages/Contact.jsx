import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
        alert("Thank you for reaching out. A member of the Halalwedlock team will respond shortly.");
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="contact-page">
            <section style={{
                backgroundColor: 'var(--primary-green)',
                color: 'white',
                padding: '5rem 0',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0', color: 'white' }}>Get In Touch</h1>
                    <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem', opacity: 0.9 }}>
                        Have questions about our matchmaking process or need help with your profile? We're here for you.
                    </p>
                </div>
            </section>

            <section style={{ padding: '6rem 0', backgroundColor: 'var(--background-cream)' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
                    
                    {/* Contact Info */}
                    <div>
                        <h2 style={{ color: 'var(--primary-green)', marginBottom: '1.5rem', fontSize: '2.2rem' }}>Contact Information</h2>
                        <p style={{ color: '#666', marginBottom: '3rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
                            Our support team is available Monday through Friday, 9:00 AM to 5:00 PM (WAT). We strive to respond to all inquiries within 24 hours.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '50%', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                                    <MapPin color="var(--accent-gold)" size={24} />
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--primary-green)', fontSize: '1.2rem', marginBottom: '0.3rem' }}>Office Location</h4>
                                    <p style={{ color: '#666', lineHeight: '1.5' }}>Wuse Zone 2<br/>Abuja, Nigeria</p>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '50%', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                                    <Phone color="var(--accent-gold)" size={24} />
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--primary-green)', fontSize: '1.2rem', marginBottom: '0.3rem' }}>Phone / WhatsApp</h4>
                                    <p style={{ color: '#666', lineHeight: '1.5' }}>+234 (0) 800 000 0000</p>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '50%', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                                    <Mail color="var(--accent-gold)" size={24} />
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--primary-green)', fontSize: '1.2rem', marginBottom: '0.3rem' }}>Email Address</h4>
                                    <p style={{ color: '#666', lineHeight: '1.5' }}>support@halalwedlock.com<br/>info@halalwedlock.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ color: 'var(--primary-green)', marginBottom: '2rem', fontSize: '1.8rem' }}>Send a Message</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-dark)' }}>Your Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px' }} 
                                />
                            </div>
                            
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-dark)' }}>Email Address</label>
                                <input 
                                    type="email" 
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px' }} 
                                />
                            </div>
                            
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-dark)' }}>Subject</label>
                                <select 
                                    required
                                    value={formData.subject}
                                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                    style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}
                                >
                                    <option value="">Select a topic...</option>
                                    <option value="Profile Verification">Profile Verification</option>
                                    <option value="Technical Issue">Technical Issue</option>
                                    <option value="Success Story Submission">Success Story Submission</option>
                                    <option value="General Inquiry">General Inquiry</option>
                                </select>
                            </div>
                            
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-dark)' }}>Message</label>
                                <textarea 
                                    required
                                    rows="5" 
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical' }}
                                ></textarea>
                            </div>
                            
                            <button type="submit" style={{ 
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                padding: '1rem', 
                                backgroundColor: 'var(--primary-green)', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '4px',
                                fontWeight: '600',
                                fontSize: '1.1rem',
                                cursor: 'pointer',
                                marginTop: '1rem'
                            }}>
                                Send Message <Send size={18} />
                            </button>
                        </form>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Contact;
