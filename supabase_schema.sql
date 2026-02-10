-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  age INTEGER,
  gender TEXT CHECK (gender IN ('male', 'female')),
  location TEXT,
  sect TEXT,
  level_of_practice TEXT,
  modesty_preference TEXT, -- For females
  financial_stability TEXT, -- For males
  marital_status TEXT,
  guardian_contact TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'))
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies (Basic examples, refine as needed)
CREATE POLICY "Public profiles are viewable by everyone." ON profiles
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Users can insert their own profile." ON profiles
  FOR INSERT WITH CHECK (true);

-- Create a bucket for potentially storing verification docs if needed later
-- insert into storage.buckets (id, name) values ('verification', 'verification');
