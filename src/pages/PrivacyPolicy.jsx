import React from 'react';
import { Shield, Lock, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div className="privacy-page">
            <section className="section halal-pattern">
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Privacy & Compliance</h1>
                    <p style={{ opacity: 0.8 }}>Our commitment to your security and Islamic ethics.</p>
                </div>
            </section>

            <section className="section" style={{ backgroundColor: 'white' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <Shield color="var(--primary-green)" /> Islamic Compliance
                        </h2>
                        <p>
                            Hawecent is built on the foundation of the Quran and Sunnah. We strictly prohibit any behavior that contradicts Islamic values. This includes, but is not limited to:
                        </p>
                        <ul style={{ margin: '1rem 0', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li>No private chatting between non-mahrams without moderation or guardian involvement.</li>
                            <li>Manual verification of all users to ensure sincerity of intention (pious marriage).</li>
                            <li>Encouragement of Wali/guardian participation in the matching process.</li>
                        </ul>
                    </div>

                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <Lock color="var(--primary-green)" /> Data Security
                        </h2>
                        <p>
                            Your personal information is handled with the highest level of confidentiality. We do not sell your data to third parties. Profile information is only visible to potential matches who have also been verified and meet compatibility criteria.
                        </p>
                    </div>

                    <div>
                        <h2 style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <FileText color="var(--primary-green)" /> Terms of Use
                        </h2>
                        <p>
                            Users must be at least 18 years old and seeking marriage for themselves. Any misuse of the platform for dating, casual interaction, or harassment will result in immediate permanent suspension.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
