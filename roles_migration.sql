-- 1. Add new columns to profiles table safely
DO $$
BEGIN
    -- Add Role Column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'role') THEN
        ALTER TABLE profiles ADD COLUMN role TEXT DEFAULT 'user';
    END IF;

    -- Add AI Status Column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'ai_evaluation_status') THEN
        ALTER TABLE profiles ADD COLUMN ai_evaluation_status TEXT DEFAULT 'pending';
    END IF;

    -- Add Medical Clearance Status Column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'medical_clearance_status') THEN
        ALTER TABLE profiles ADD COLUMN medical_clearance_status TEXT DEFAULT 'pending';
    END IF;
END $$;

-- 2. Create Professional Evaluations Table
CREATE TABLE IF NOT EXISTS professional_evaluations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    evaluator_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    evaluator_role TEXT NOT NULL, -- 'psychologist' or 'medical_officer'
    notes TEXT,
    readiness_score INTEGER CHECK (readiness_score >= 0 AND readiness_score <= 100),
    recommendation_status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Set up Row Level Security (RLS) for the new table
ALTER TABLE professional_evaluations ENABLE ROW LEVEL SECURITY;

-- Policy: Only Super Admins and Professionals can view evaluations
DROP POLICY IF EXISTS "Professionals can view evaluations" ON professional_evaluations;
CREATE POLICY "Professionals can view evaluations" ON professional_evaluations
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('super_admin', 'psychologist', 'medical_officer')
        )
    );

-- Policy: Only Professionals can insert evaluations
DROP POLICY IF EXISTS "Professionals can insert evaluations" ON professional_evaluations;
CREATE POLICY "Professionals can insert evaluations" ON professional_evaluations
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('psychologist', 'medical_officer')
        )
    );

-- Policy: Only Super Admins and the original Professional can update evaluations
DROP POLICY IF EXISTS "Professionals can update own evaluations" ON professional_evaluations;
CREATE POLICY "Professionals can update own evaluations" ON professional_evaluations
    FOR UPDATE
    USING (
        auth.uid() = evaluator_id OR
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'super_admin'
        )
    );
