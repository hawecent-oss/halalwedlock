-- 1. Add new columns to profiles table (TRULY Safe Migration)
-- We check each column individually to avoid "column already exists" errors
DO $$
BEGIN
    -- Contact Info
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'whatsapp') THEN
        ALTER TABLE profiles ADD COLUMN whatsapp TEXT;
    END IF;

    -- Photo
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'photo_url') THEN
        ALTER TABLE profiles ADD COLUMN photo_url TEXT;
    END IF;

    -- Physical Attributes
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'height') THEN
        ALTER TABLE profiles ADD COLUMN height TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'complexion') THEN
        ALTER TABLE profiles ADD COLUMN complexion TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'build') THEN
        ALTER TABLE profiles ADD COLUMN build TEXT;
    END IF;

    -- Health Information
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'genotype') THEN
        ALTER TABLE profiles ADD COLUMN genotype TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'blood_group') THEN
        ALTER TABLE profiles ADD COLUMN blood_group TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'health_status') THEN
        ALTER TABLE profiles ADD COLUMN health_status TEXT;
    END IF;

    -- Religious Profile (Enhanced)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'sect') THEN
        ALTER TABLE profiles ADD COLUMN sect TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'level_of_practice') THEN
        ALTER TABLE profiles ADD COLUMN level_of_practice TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'modesty_preference') THEN
        ALTER TABLE profiles ADD COLUMN modesty_preference TEXT;
    END IF;

    -- Professional Details
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'occupation') THEN
        ALTER TABLE profiles ADD COLUMN occupation TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'employer') THEN
        ALTER TABLE profiles ADD COLUMN employer TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'work_address') THEN
        ALTER TABLE profiles ADD COLUMN work_address TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'income_range') THEN
        ALTER TABLE profiles ADD COLUMN income_range TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'financial_stability') THEN
        ALTER TABLE profiles ADD COLUMN financial_stability TEXT;
    END IF;

    -- Educational Background
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'education_level') THEN
        ALTER TABLE profiles ADD COLUMN education_level TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'field_of_study') THEN
        ALTER TABLE profiles ADD COLUMN field_of_study TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'institution') THEN
        ALTER TABLE profiles ADD COLUMN institution TEXT;
    END IF;

    -- Family Background
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'father_occupation') THEN
        ALTER TABLE profiles ADD COLUMN father_occupation TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'mother_occupation') THEN
        ALTER TABLE profiles ADD COLUMN mother_occupation TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'siblings_count') THEN
        ALTER TABLE profiles ADD COLUMN siblings_count INTEGER;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'family_background') THEN
        ALTER TABLE profiles ADD COLUMN family_background TEXT;
    END IF;

    -- Marriage Details
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'marital_status') THEN
        ALTER TABLE profiles ADD COLUMN marital_status TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'has_children') THEN
        ALTER TABLE profiles ADD COLUMN has_children BOOLEAN DEFAULT false;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'children_count') THEN
        ALTER TABLE profiles ADD COLUMN children_count INTEGER;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'guardian_contact') THEN
        ALTER TABLE profiles ADD COLUMN guardian_contact TEXT;
    END IF;

    -- Preferences
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'willing_to_relocate') THEN
        ALTER TABLE profiles ADD COLUMN willing_to_relocate BOOLEAN;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'polygamy_stance') THEN
        ALTER TABLE profiles ADD COLUMN polygamy_stance TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'about_self') THEN
        ALTER TABLE profiles ADD COLUMN about_self TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'partner_expectations') THEN
        ALTER TABLE profiles ADD COLUMN partner_expectations TEXT;
    END IF;
    
    -- Status
     IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'status') THEN
        ALTER TABLE profiles ADD COLUMN status TEXT DEFAULT 'pending';
    END IF;
END $$;

-- 2. Create Storage Bucket for Photos (if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-photos', 'profile-photos', false)
ON CONFLICT (id) DO NOTHING;

-- 3. Create Storage Policies
-- We drop existing policies first to avoid "policy already exists" errors when re-running
DROP POLICY IF EXISTS "Anyone can upload profile photos" ON storage.objects;
CREATE POLICY "Anyone can upload profile photos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'profile-photos');

DROP POLICY IF EXISTS "Profile photos are viewable by authenticated users" ON storage.objects;
CREATE POLICY "Profile photos are viewable by authenticated users" ON storage.objects
  FOR SELECT USING (bucket_id = 'profile-photos');
