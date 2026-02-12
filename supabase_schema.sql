-- Create profiles table with comprehensive fields
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Basic Information
  full_name TEXT NOT NULL,
  age INTEGER,
  gender TEXT CHECK (gender IN ('male', 'female')),
  location TEXT,
  
  -- Contact Information
  phone TEXT,
  email TEXT,
  whatsapp TEXT,
  
  -- Photo
  photo_url TEXT,
  
  -- Physical Attributes
  height TEXT,
  complexion TEXT,
  build TEXT,
  
  -- Health Information
  genotype TEXT,
  blood_group TEXT,
  health_status TEXT,
  
  -- Religious Profile
  sect TEXT,
  level_of_practice TEXT,
  modesty_preference TEXT, -- For females
  
  -- Professional Details
  occupation TEXT,
  employer TEXT,
  work_address TEXT,
  income_range TEXT,
  financial_stability TEXT, -- For males
  
  -- Educational Background
  education_level TEXT,
  field_of_study TEXT,
  institution TEXT,
  
  -- Family Background
  father_occupation TEXT,
  mother_occupation TEXT,
  siblings_count INTEGER,
  family_background TEXT,
  
  -- Marriage Details
  marital_status TEXT,
  has_children BOOLEAN DEFAULT false,
  children_count INTEGER,
  guardian_contact TEXT NOT NULL,
  
  -- Preferences & Expectations
  willing_to_relocate BOOLEAN,
  polygamy_stance TEXT, -- For males
  about_self TEXT,
  partner_expectations TEXT,
  
  -- System Fields
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'))
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public profiles are viewable by everyone." ON profiles
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Users can insert their own profile." ON profiles
  FOR INSERT WITH CHECK (true);

-- Create storage bucket for profile photos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('profile-photos', 'profile-photos', false);

-- Storage policies for profile photos
CREATE POLICY "Anyone can upload profile photos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'profile-photos');

CREATE POLICY "Profile photos are viewable by authenticated users" ON storage.objects
  FOR SELECT USING (bucket_id = 'profile-photos');
