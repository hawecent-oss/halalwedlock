import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
    return (
        <div className="contact-page">
            <section className="section halal-pattern">
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Contact & Support</h1>
                    <p style={{ opacity: 0.8 }}>We are here to support your journey.</p>
                </div>
            </section>

            <section className="section" style={{ backgroundColor: 'white' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
                    <div>
                        <h2 style={{ marginBottom: '1.5rem' }}>Send us a Message</h2>
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input type="text" placeholder="Your Name" style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }} />
                            <input type="email" placeholder="Your Email" style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }} />
                            <textarea placeholder="How can we help?" rows="5" style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}></textarea>
                            <button className="btn btn-primary">Send Message</button>
                        </form>
                    </div>

                    <div>
                        <h2 style={{ marginBottom: '1.5rem' }}>Our Office</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{ padding: '1rem', background: 'var(--background-cream)', borderRadius: '50%' }}><Mail color="var(--primary-green)" /></div>
                                <div>
                                    <h4 style={{ margin: 0 }}>Email</h4>
                                    <p style={{ opacity: 0.7 }}>hawecents@gmail.com</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{ padding: '1rem', background: 'var(--background-cream)', borderRadius: '50%' }}><Phone color="var(--primary-green)" /></div>
                                <div>
                                    <h4 style={{ margin: 0 }}>Phone</h4>
                                    <p style={{ opacity: 0.7 }}>09049656467</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{ padding: '1rem', background: 'var(--background-cream)', borderRadius: '50%' }}><MapPin color="var(--primary-green)" /></div>
                                <div>
                                    <h4 style={{ margin: 0 }}>Location</h4>
                                    <p style={{ opacity: 0.7 }}>Islamic Centre, Lagos, Nigeria</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
