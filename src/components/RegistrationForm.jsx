import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { submitToN8N } from '../utils/n8n';

const RegistrationForm = ({ gender }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Personal Information
        fullName: '',
        age: '',
        location: '',
        phone: '',
        email: '',
        whatsapp: '',
        height: '',
        complexion: '',
        build: '',

        // Religious Profile
        sect: '',
        levelOfPractice: '',
        modesty: '', // For females

        // Professional & Educational
        occupation: '',
        employer: '',
        workAddress: '',
        incomeRange: '',
        stability: '', // For males
        educationLevel: '',
        fieldOfStudy: '',
        institution: '',

        // Health & Family
        genotype: '',
        bloodGroup: '',
        healthStatus: '',
        fatherOccupation: '',
        motherOccupation: '',
        siblingsCount: '',
        familyBackground: '',

        // Marriage Intention & Preferences
        maritalStatus: '',
        hasChildren: 'no',
        childrenCount: '',
        guardianContact: '',
        willingToRelocate: 'no',
        polygamyStance: '', // For males
        aboutSelf: '',
        partnerExpectations: ''
    });

    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [photoConfirmed, setPhotoConfirmed] = useState(false);
    const [showConfirmError, setShowConfirmError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const isImage = file.type.startsWith('image/');
            const isVideo = file.type.startsWith('video/');

            // Validate file type (image or video)
            if (!isImage && !isVideo) {
                alert('Please upload an image or video file');
                return;
            }

            // Validate file size (max 5MB for images, 20MB for videos)
            const maxSize = isVideo ? 20 * 1024 * 1024 : 5 * 1024 * 1024;
            if (file.size > maxSize) {
                alert(`File size must be less than ${isVideo ? '20MB' : '5MB'}`);
                return;
            }

            setPhotoFile(file);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const nextStep = () => {
        // Validate photo confirmation on Step 1
        if (step === 1 && photoFile && !photoConfirmed) {
            setShowConfirmError(true);
            return;
        }
        setShowConfirmError(false);
        setStep(step + 1);
    };
    const prevStep = () => setStep(step - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            let photoUrl = null;

            // Upload photo if provided
            if (photoFile) {
                const fileExt = photoFile.name.split('.').pop();
                const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
                const filePath = `${gender}/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('profile-photos')
                    .upload(filePath, photoFile);

                if (uploadError) {
                    throw new Error('Error uploading photo: ' + uploadError.message);
                }

                // Get public URL
                const { data: urlData } = supabase.storage
                    .from('profile-photos')
                    .getPublicUrl(filePath);

                photoUrl = urlData.publicUrl;
            }

            const { data, error } = await supabase
                .from('profiles')
                .insert([
                    {
                        // Basic Information
                        full_name: formData.fullName,
                        age: parseInt(formData.age),
                        gender: gender,
                        location: formData.location,

                        // Photo
                        photo_url: photoUrl,

                        // Contact Information
                        phone: formData.phone,
                        email: formData.email,
                        whatsapp: formData.whatsapp || null,

                        // Physical Attributes
                        height: formData.height,
                        complexion: formData.complexion,
                        build: formData.build,

                        // Health Information
                        genotype: formData.genotype,
                        blood_group: formData.bloodGroup,
                        health_status: formData.healthStatus || null,

                        // Religious Profile
                        sect: formData.sect,
                        level_of_practice: formData.levelOfPractice,
                        modesty_preference: formData.modesty || null,

                        // Professional Details
                        occupation: formData.occupation,
                        employer: formData.employer || null,
                        work_address: formData.workAddress || null,
                        income_range: formData.incomeRange || null,
                        financial_stability: formData.stability || null,

                        // Educational Background
                        education_level: formData.educationLevel,
                        field_of_study: formData.fieldOfStudy || null,
                        institution: formData.institution || null,

                        // Family Background
                        father_occupation: formData.fatherOccupation || null,
                        mother_occupation: formData.motherOccupation || null,
                        siblings_count: formData.siblingsCount ? parseInt(formData.siblingsCount) : null,
                        family_background: formData.familyBackground || null,

                        // Marriage Details
                        marital_status: formData.maritalStatus,
                        has_children: formData.hasChildren === 'yes',
                        children_count: formData.childrenCount ? parseInt(formData.childrenCount) : null,
                        guardian_contact: formData.guardianContact,

                        // Preferences & Expectations
                        willing_to_relocate: formData.willingToRelocate === 'yes',
                        polygamy_stance: formData.polygamyStance || null,
                        about_self: formData.aboutSelf || null,
                        partner_expectations: formData.partnerExpectations || null,

                        status: 'pending'
                    }
                ]);

            if (error) throw error;

            // Trigger N8N automation
            try {
                await submitToN8N({
                    type: 'registration',
                    gender: gender,
                    name: formData.fullName,
                    email: formData.email,
                    phone: formData.phone
                });
            } catch (n8nError) {
                console.error('N8N notification failed:', n8nError);
            }

            setSubmitStatus({ type: 'success', message: 'Registration submitted successfully! We will review and contact you soon.' });

            // Reset form
            setTimeout(() => {
                window.location.href = '/';
            }, 3000);

        } catch (error) {
            console.error('Error submitting registration:', error);
            setSubmitStatus({
                type: 'error',
                message: `Error: ${error.message || 'Unknown error occurred'}. Please try again or contact support.`
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputStyle = { width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' };
    const labelStyle = { display: 'block', marginBottom: '0.5rem', fontWeight: '500' };

    return (
        <div className="section container" style={{ maxWidth: '700px' }}>
            <div style={{ backgroundColor: 'var(--white)', padding: 'var(--spacing-md)', borderRadius: '12px', boxShadow: 'var(--shadow-lg)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    {gender === 'male' ? 'Brother\'s' : 'Sister\'s'} Registration
                </h2>

                {/* Progress Indicator */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} style={{ flex: 1, height: '4px', backgroundColor: step >= i ? 'var(--primary-green)' : '#eee', borderRadius: '4px' }} />
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    {/* STEP 1: Personal Information */}
                    {step === 1 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Personal Information</h3>

                            <div>
                                <label style={labelStyle}>Full Name *</label>
                                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} style={inputStyle} required />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={labelStyle}>Age *</label>
                                    <input type="number" name="age" value={formData.age} onChange={handleChange} style={inputStyle} required />
                                </div>
                                <div>
                                    <label style={labelStyle}>Location *</label>
                                    <input type="text" name="location" placeholder="City, State" value={formData.location} onChange={handleChange} style={inputStyle} required />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={labelStyle}>Phone Number *</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={inputStyle} required />
                                </div>
                                <div>
                                    <label style={labelStyle}>WhatsApp Number</label>
                                    <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} style={inputStyle} />
                                </div>
                            </div>

                            <div>
                                <label style={labelStyle}>Email Address *</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} required />
                            </div>

                            <div>
                                <label style={labelStyle}>Upload Full-Body Photo or Video *</label>
                                <input
                                    type="file"
                                    accept="image/*,video/*"
                                    onChange={handleFileChange}
                                    style={inputStyle}
                                    required
                                />
                                <div style={{
                                    fontSize: '0.85rem',
                                    color: '#666',
                                    marginTop: '0.5rem',
                                    backgroundColor: '#f8f9fa',
                                    padding: '0.75rem',
                                    borderRadius: '6px',
                                    border: '1px solid #e0e0e0'
                                }}>
                                    <strong style={{ color: 'var(--primary-green)' }}>Requirements:</strong>
                                    <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
                                        <li><strong>FULL-BODY ONLY</strong> (head to toe) - passport photos NOT accepted</li>
                                        <li>Can be a photo or short video animation (max 30 seconds)</li>
                                        <li>Clear, recent, and well-lit</li>
                                        <li>Modest Islamic attire required</li>
                                        <li>Images: max 5MB | Videos: max 20MB</li>
                                        <li>Formats: JPG, PNG, MP4, WebM, MOV</li>
                                    </ul>
                                    <p style={{
                                        margin: '0.5rem 0 0 0',
                                        color: '#d32f2f',
                                        fontWeight: '500',
                                        fontSize: '0.8rem'
                                    }}>
                                        ⚠️ Passport-style photos (head/face only) will be rejected
                                    </p>
                                </div>
                                {photoPreview && (
                                    <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                                        {photoFile && photoFile.type.startsWith('image/') ? (
                                            <img
                                                src={photoPreview}
                                                alt="Preview"
                                                style={{
                                                    maxWidth: '250px',
                                                    maxHeight: '400px',
                                                    borderRadius: '8px',
                                                    border: '2px solid var(--primary-green)'
                                                }}
                                            />
                                        ) : (
                                            <video
                                                src={photoPreview}
                                                controls
                                                style={{
                                                    maxWidth: '250px',
                                                    maxHeight: '400px',
                                                    borderRadius: '8px',
                                                    border: '2px solid var(--primary-green)'
                                                }}
                                            />
                                        )}
                                        <p style={{ fontSize: '0.8rem', color: 'var(--primary-green)', marginTop: '0.5rem' }}>
                                            ✓ File uploaded successfully
                                        </p>
                                    </div>
                                )}
                            </div>

                            {photoFile && (
                                <div style={{
                                    marginTop: '1rem',
                                    padding: '1rem',
                                    backgroundColor: '#fff3cd',
                                    border: '2px solid #ffc107',
                                    borderRadius: '8px'
                                }}>
                                    <label style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        fontSize: '0.95rem',
                                        fontWeight: '500'
                                    }}>
                                        <input
                                            type="checkbox"
                                            checked={photoConfirmed}
                                            onChange={(e) => {
                                                setPhotoConfirmed(e.target.checked);
                                                setShowConfirmError(false);
                                            }}
                                            style={{
                                                width: '20px',
                                                height: '20px',
                                                marginRight: '0.75rem',
                                                cursor: 'pointer'
                                            }}
                                        />
                                        <span>
                                            I confirm this is a <strong>full-body photo/video (head to toe)</strong>, NOT a passport-style photo
                                        </span>
                                    </label>
                                    {showConfirmError && (
                                        <p style={{
                                            color: '#d32f2f',
                                            fontSize: '0.85rem',
                                            marginTop: '0.5rem',
                                            marginLeft: '2.25rem',
                                            fontWeight: '500'
                                        }}>
                                            ⚠️ Please confirm your photo/video is full-body before proceeding
                                        </p>
                                    )}
                                </div>
                            )}

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={labelStyle}>Height *</label>
                                    <select name="height" value={formData.height} onChange={handleChange} style={inputStyle} required>
                                        <option value="">Select...</option>
                                        <option value="below_5ft">Below 5ft</option>
                                        <option value="5ft_5ft3">5ft - 5ft 3in</option>
                                        <option value="5ft4_5ft7">5ft 4in - 5ft 7in</option>
                                        <option value="5ft8_5ft11">5ft 8in - 5ft 11in</option>
                                        <option value="6ft_above">6ft and above</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={labelStyle}>Complexion *</label>
                                    <select name="complexion" value={formData.complexion} onChange={handleChange} style={inputStyle} required>
                                        <option value="">Select...</option>
                                        <option value="fair">Fair</option>
                                        <option value="medium">Medium</option>
                                        <option value="dark">Dark</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={labelStyle}>Build *</label>
                                    <select name="build" value={formData.build} onChange={handleChange} style={inputStyle} required>
                                        <option value="">Select...</option>
                                        <option value="slim">Slim</option>
                                        <option value="average">Average</option>
                                        <option value="athletic">Athletic</option>
                                        <option value="heavy">Heavy</option>
                                    </select>
                                </div>
                            </div>

                            <button type="button" onClick={nextStep} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                                Next: Religious Profile
                            </button>
                        </div>
                    )}

                    {/* STEP 2: Religious Profile */}
                    {step === 2 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Religious Profile</h3>

                            <div>
                                <label style={labelStyle}>Sect *</label>
                                <select name="sect" value={formData.sect} onChange={handleChange} style={inputStyle} required>
                                    <option value="">Select...</option>
                                    <option value="sunni">Sunni</option>
                                    <option value="shia">Shia</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label style={labelStyle}>Level of Practice & Commitment to Sunnah *</label>
                                <select name="levelOfPractice" value={formData.levelOfPractice} onChange={handleChange} style={inputStyle} required>
                                    <option value="">Select...</option>
                                    <option value="very">Strict adherence to Fardh & Sunnah</option>
                                    <option value="moderately">Regularly practicing Fardh</option>
                                    <option value="reverting">Reverting / Actively Learning</option>
                                </select>
                            </div>

                            {gender === 'female' && (
                                <div>
                                    <label style={labelStyle}>Hijab / Modesty Preference *</label>
                                    <select name="modesty" value={formData.modesty} onChange={handleChange} style={inputStyle} required>
                                        <option value="">Select...</option>
                                        <option value="niqab">Niqab</option>
                                        <option value="hijab">Hijab</option>
                                        <option value="none">Observing basic modesty</option>
                                    </select>
                                </div>
                            )}

                            {gender === 'male' && (
                                <div>
                                    <label style={labelStyle}>Role as Provider (Financial Stability) *</label>
                                    <select name="stability" value={formData.stability} onChange={handleChange} style={inputStyle} required>
                                        <option value="">Select...</option>
                                        <option value="stable">Stable Income & Ready to provide</option>
                                        <option value="working">Establishing career</option>
                                        <option value="student">Student / Early stage</option>
                                    </select>
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" onClick={prevStep} className="btn" style={{ flex: 1, backgroundColor: '#eee' }}>Back</button>
                                <button type="button" onClick={nextStep} className="btn btn-primary" style={{ flex: 2 }}>Next: Professional & Education</button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Professional & Educational */}
                    {step === 3 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Professional & Educational Background</h3>

                            <div>
                                <label style={labelStyle}>Occupation *</label>
                                <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} style={inputStyle} required />
                            </div>

                            <div>
                                <label style={labelStyle}>Employer/Business</label>
                                <input type="text" name="employer" value={formData.employer} onChange={handleChange} style={inputStyle} />
                            </div>

                            <div>
                                <label style={labelStyle}>Work Address</label>
                                <input type="text" name="workAddress" placeholder="City, State" value={formData.workAddress} onChange={handleChange} style={inputStyle} />
                            </div>

                            {gender === 'male' && (
                                <div>
                                    <label style={labelStyle}>Income Range</label>
                                    <select name="incomeRange" value={formData.incomeRange} onChange={handleChange} style={inputStyle}>
                                        <option value="">Select...</option>
                                        <option value="below_50k">Below ₦50,000</option>
                                        <option value="50k_100k">₦50,000 - ₦100,000</option>
                                        <option value="100k_200k">₦100,000 - ₦200,000</option>
                                        <option value="200k_500k">₦200,000 - ₦500,000</option>
                                        <option value="above_500k">Above ₦500,000</option>
                                    </select>
                                </div>
                            )}

                            <div>
                                <label style={labelStyle}>Education Level *</label>
                                <select name="educationLevel" value={formData.educationLevel} onChange={handleChange} style={inputStyle} required>
                                    <option value="">Select...</option>
                                    <option value="secondary">Secondary School</option>
                                    <option value="diploma">Diploma/NCE</option>
                                    <option value="bachelor">Bachelor's Degree</option>
                                    <option value="master">Master's Degree</option>
                                    <option value="phd">PhD/Doctorate</option>
                                    <option value="islamic">Islamic Education</option>
                                </select>
                            </div>

                            <div>
                                <label style={labelStyle}>Field of Study</label>
                                <input type="text" name="fieldOfStudy" placeholder="e.g., Computer Science, Medicine" value={formData.fieldOfStudy} onChange={handleChange} style={inputStyle} />
                            </div>

                            <div>
                                <label style={labelStyle}>Institution</label>
                                <input type="text" name="institution" placeholder="University/College name" value={formData.institution} onChange={handleChange} style={inputStyle} />
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" onClick={prevStep} className="btn" style={{ flex: 1, backgroundColor: '#eee' }}>Back</button>
                                <button type="button" onClick={nextStep} className="btn btn-primary" style={{ flex: 2 }}>Next: Health & Family</button>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: Health & Family */}
                    {step === 4 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Health & Family Background</h3>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={labelStyle}>Genotype *</label>
                                    <select name="genotype" value={formData.genotype} onChange={handleChange} style={inputStyle} required>
                                        <option value="">Select...</option>
                                        <option value="AA">AA</option>
                                        <option value="AS">AS</option>
                                        <option value="AC">AC</option>
                                        <option value="SS">SS</option>
                                        <option value="SC">SC</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={labelStyle}>Blood Group *</label>
                                    <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} style={inputStyle} required>
                                        <option value="">Select...</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label style={labelStyle}>Health Status</label>
                                <select name="healthStatus" value={formData.healthStatus} onChange={handleChange} style={inputStyle}>
                                    <option value="">Select...</option>
                                    <option value="excellent">Excellent</option>
                                    <option value="good">Good</option>
                                    <option value="fair">Fair (with manageable condition)</option>
                                </select>
                            </div>

                            <div>
                                <label style={labelStyle}>Father's Occupation</label>
                                <input type="text" name="fatherOccupation" value={formData.fatherOccupation} onChange={handleChange} style={inputStyle} />
                            </div>

                            <div>
                                <label style={labelStyle}>Mother's Occupation</label>
                                <input type="text" name="motherOccupation" value={formData.motherOccupation} onChange={handleChange} style={inputStyle} />
                            </div>

                            <div>
                                <label style={labelStyle}>Number of Siblings</label>
                                <input type="number" name="siblingsCount" value={formData.siblingsCount} onChange={handleChange} style={inputStyle} />
                            </div>

                            <div>
                                <label style={labelStyle}>Family Background</label>
                                <textarea name="familyBackground" value={formData.familyBackground} onChange={handleChange} style={{ ...inputStyle, minHeight: '80px' }} placeholder="Brief description of family background"></textarea>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" onClick={prevStep} className="btn" style={{ flex: 1, backgroundColor: '#eee' }}>Back</button>
                                <button type="button" onClick={nextStep} className="btn btn-primary" style={{ flex: 2 }}>Next: Marriage Preferences</button>
                            </div>
                        </div>
                    )}

                    {/* STEP 5: Marriage Preferences */}
                    {step === 5 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Marriage Intention & Preferences</h3>

                            <div>
                                <label style={labelStyle}>Marital Status *</label>
                                <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} style={inputStyle} required>
                                    <option value="">Select...</option>
                                    <option value="single">Never Married</option>
                                    <option value="divorced">Divorced</option>
                                    <option value="widowed">Widowed</option>
                                </select>
                            </div>

                            <div>
                                <label style={labelStyle}>Do you have children? *</label>
                                <select name="hasChildren" value={formData.hasChildren} onChange={handleChange} style={inputStyle} required>
                                    <option value="no">No</option>
                                    <option value="yes">Yes</option>
                                </select>
                            </div>

                            {formData.hasChildren === 'yes' && (
                                <div>
                                    <label style={labelStyle}>Number of Children</label>
                                    <input type="number" name="childrenCount" value={formData.childrenCount} onChange={handleChange} style={inputStyle} />
                                </div>
                            )}

                            <div>
                                <label style={labelStyle}>{gender === 'female' ? 'Wali (Guardian) Contact Details *' : 'Guardian / Family Reference *'}</label>
                                <input
                                    type="text"
                                    name="guardianContact"
                                    placeholder={gender === 'female' ? "Phone or Email of your Wali" : "Family reference contact"}
                                    value={formData.guardianContact}
                                    onChange={handleChange}
                                    style={inputStyle}
                                    required
                                />
                            </div>

                            <div>
                                <label style={labelStyle}>Willing to Relocate? *</label>
                                <select name="willingToRelocate" value={formData.willingToRelocate} onChange={handleChange} style={inputStyle} required>
                                    <option value="no">No</option>
                                    <option value="yes">Yes</option>
                                </select>
                            </div>

                            {gender === 'male' && (
                                <div>
                                    <label style={labelStyle}>Stance on Polygamy</label>
                                    <select name="polygamyStance" value={formData.polygamyStance} onChange={handleChange} style={inputStyle}>
                                        <option value="">Select...</option>
                                        <option value="open">Open to polygamy</option>
                                        <option value="maybe">Maybe in future</option>
                                        <option value="no">Prefer monogamy</option>
                                    </select>
                                </div>
                            )}

                            <div>
                                <label style={labelStyle}>About Yourself</label>
                                <textarea name="aboutSelf" value={formData.aboutSelf} onChange={handleChange} style={{ ...inputStyle, minHeight: '100px' }} placeholder="Tell us about yourself, your personality, interests, and what makes you unique"></textarea>
                            </div>

                            <div>
                                <label style={labelStyle}>What are you looking for in a spouse?</label>
                                <textarea name="partnerExpectations" value={formData.partnerExpectations} onChange={handleChange} style={{ ...inputStyle, minHeight: '100px' }} placeholder="Describe your expectations and what you're looking for in a marriage partner"></textarea>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" onClick={prevStep} className="btn" style={{ flex: 1, backgroundColor: '#eee' }}>Back</button>
                                <button type="submit" className="btn btn-accent" style={{ flex: 2 }} disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                                </button>
                            </div>

                            {submitStatus?.type === 'success' && (
                                <p style={{ color: 'green', textAlign: 'center', marginTop: '1rem', fontWeight: '500' }}>{submitStatus.message}</p>
                            )}
                            {submitStatus?.type === 'error' && (
                                <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{submitStatus.message}</p>
                            )}

                            <p style={{ fontSize: '0.8rem', opacity: 0.6, textAlign: 'center', marginTop: '1rem' }}>
                                All submissions are confidential and reviewed by Hawecent Admin for Halal compliance.
                            </p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
