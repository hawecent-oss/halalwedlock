import React from 'react';
import { ShieldCheck, UserPlus, Info } from 'lucide-react';

const ParentsGuardians = () => {
    return (
        <div className="parents-page">
            <section className="section hero-img img-overlay" style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1574675621113-ac7b9f697696?auto=format&fit=crop&q=80&w=2000')",
                color: 'white'
            }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'white' }}>For Parents & Guardians</h1>
                    <p style={{ maxWidth: '750px', margin: '0 auto', fontSize: '1.2rem', opacity: 0.9 }}>
                        We recognize the vital role of the family in facilitating a successful and blessed marriage.
                    </p>
                </div>
            </section>

            <section className="section" style={{ backgroundColor: 'white' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div style={{ padding: '3rem', border: '1px solid var(--accent-gold)', borderRadius: '20px', marginBottom: '4rem' }}>
                        <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-green)' }}>Our Promise to You</h2>
                        <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                            We understand that as a Wali or guardian, your priority is the protection and success of your child or ward. Hawescent is built to support your role, not bypass it.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <ShieldCheck color="var(--primary-green)" />
                                <div>
                                    <h4 style={{ marginBottom: '0.5rem' }}>Strict Privacy</h4>
                                    <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Profiles are not public. Only verified, serious seekers can view compatibility summaries.</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <UserPlus color="var(--primary-green)" />
                                <div>
                                    <h4 style={{ marginBottom: '0.5rem' }}>Wali Involvement</h4>
                                    <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>We encourage sisters to include their Wali's contact from day one.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ marginBottom: '2rem' }}>Ready to support them?</h3>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button className="btn btn-primary">Guardian FAQ</button>
                            <button className="btn btn-accent">Contact Support</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ParentsGuardians;
