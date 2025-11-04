/*
  # Update Schema to Support Mock Data

  ## Overview
  This migration modifies the users table to allow mock data insertion without requiring
  auth.users entries. This is necessary for development and testing purposes.

  ## Changes
  1. Drop the foreign key constraint on users.id that references auth.users
  2. Keep all other constraints and RLS policies intact
  3. This allows us to insert test users without going through Supabase Auth

  ## Security Note
  RLS policies remain in place to ensure data security. In production with real auth,
  the foreign key constraint should be re-added.
*/

-- Drop the foreign key constraint to allow mock data
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_id_fkey;

-- Add a comment to remind about production setup
COMMENT ON TABLE users IS 'In production, add foreign key constraint: REFERENCES auth.users(id) ON DELETE CASCADE';
