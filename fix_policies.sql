-- FIX: Ensure RLS Policies allow registration (INSERT)
-- Run this in Supabase SQL Editor

-- 1. Enable RLS on profiles table (idempotent)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 2. Create policy to allow ANYONE (anon) to insert a profile
-- We drop it first to ensure we can recreate it correctly without errors
DROP POLICY IF EXISTS "Users can insert their own profile." ON profiles;
DROP POLICY IF EXISTS "Anyone can register" ON profiles;

CREATE POLICY "Anyone can register" ON profiles
  FOR INSERT 
  WITH CHECK (true);

-- 3. Ensure Storage RLS is also correct (just in case)
DROP POLICY IF EXISTS "Anyone can upload profile photos" ON storage.objects;
CREATE POLICY "Anyone can upload profile photos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'profile-photos');

DROP POLICY IF EXISTS "Public can view profile photos" ON storage.objects;
CREATE POLICY "Public can view profile photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'profile-photos');
