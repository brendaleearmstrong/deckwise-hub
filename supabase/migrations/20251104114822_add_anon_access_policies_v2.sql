/*
  # Add Anonymous Access Policies for Demo

  ## Overview
  This migration adds RLS policies that allow anonymous users to access data for demo purposes.
  
  ## Changes
  1. Add SELECT policies for anonymous users on clients, projects, and alerts tables
  2. Add INSERT/UPDATE policies for anonymous users to allow creating test data
  
  ## Security Notes
  - These policies are for DEMO purposes only
  - In production, these should be removed and proper authentication should be used
  - Policies filter by the demo user_id to prevent cross-contamination
*/

-- Drop existing anon policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Allow anon to view demo clients" ON clients;
  DROP POLICY IF EXISTS "Allow anon to insert demo clients" ON clients;
  DROP POLICY IF EXISTS "Allow anon to update demo clients" ON clients;
  DROP POLICY IF EXISTS "Allow anon to view demo projects" ON projects;
  DROP POLICY IF EXISTS "Allow anon to insert demo projects" ON projects;
  DROP POLICY IF EXISTS "Allow anon to update demo projects" ON projects;
  DROP POLICY IF EXISTS "Allow anon to view demo alerts" ON alerts;
  DROP POLICY IF EXISTS "Allow anon to insert demo alerts" ON alerts;
  DROP POLICY IF EXISTS "Allow anon to update demo alerts" ON alerts;
  DROP POLICY IF EXISTS "Allow anon to view demo materials" ON materials;
  DROP POLICY IF EXISTS "Allow anon to view demo milestones" ON milestones;
END $$;

-- Clients table - allow anon to view and insert demo data
CREATE POLICY "Allow anon to view demo clients"
  ON clients
  FOR SELECT
  TO anon
  USING (user_id = '00000000-0000-0000-0000-000000000001');

CREATE POLICY "Allow anon to insert demo clients"
  ON clients
  FOR INSERT
  TO anon
  WITH CHECK (user_id = '00000000-0000-0000-0000-000000000001');

CREATE POLICY "Allow anon to update demo clients"
  ON clients
  FOR UPDATE
  TO anon
  USING (user_id = '00000000-0000-0000-0000-000000000001')
  WITH CHECK (user_id = '00000000-0000-0000-0000-000000000001');

-- Projects table - allow anon to view and insert demo data
CREATE POLICY "Allow anon to view demo projects"
  ON projects
  FOR SELECT
  TO anon
  USING (user_id = '00000000-0000-0000-0000-000000000001');

CREATE POLICY "Allow anon to insert demo projects"
  ON projects
  FOR INSERT
  TO anon
  WITH CHECK (user_id = '00000000-0000-0000-0000-000000000001');

CREATE POLICY "Allow anon to update demo projects"
  ON projects
  FOR UPDATE
  TO anon
  USING (user_id = '00000000-0000-0000-0000-000000000001')
  WITH CHECK (user_id = '00000000-0000-0000-0000-000000000001');

-- Alerts table - allow anon to view and insert demo data
CREATE POLICY "Allow anon to view demo alerts"
  ON alerts
  FOR SELECT
  TO anon
  USING (user_id = '00000000-0000-0000-0000-000000000001');

CREATE POLICY "Allow anon to insert demo alerts"
  ON alerts
  FOR INSERT
  TO anon
  WITH CHECK (user_id = '00000000-0000-0000-0000-000000000001');

CREATE POLICY "Allow anon to update demo alerts"
  ON alerts
  FOR UPDATE
  TO anon
  USING (user_id = '00000000-0000-0000-0000-000000000001')
  WITH CHECK (user_id = '00000000-0000-0000-0000-000000000001');

-- Materials table - allow anon access for demo
CREATE POLICY "Allow anon to view demo materials"
  ON materials
  FOR SELECT
  TO anon
  USING (project_id IN (
    SELECT id FROM projects WHERE user_id = '00000000-0000-0000-0000-000000000001'
  ));

-- Milestones table - allow anon access for demo
CREATE POLICY "Allow anon to view demo milestones"
  ON milestones
  FOR SELECT
  TO anon
  USING (project_id IN (
    SELECT id FROM projects WHERE user_id = '00000000-0000-0000-0000-000000000001'
  ));
