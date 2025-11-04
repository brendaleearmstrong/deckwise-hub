/*
  # Create Initial Database Schema for Outdoor Living Structures Project Management System

  ## Overview
  This migration creates the complete database schema for a contractor project management system
  that tracks clients, projects, materials, milestones, alerts, and user profiles.

  ## New Tables

  ### 1. `users`
  User profiles and company information
  - `id` (uuid, primary key) - User identifier (linked to auth.users)
  - `name` (text) - User's full name
  - `email` (text, unique) - User's email address
  - `avatar_url` (text, nullable) - Profile picture URL
  - `role` (text) - User role: owner, admin, or user
  - `company_name` (text) - Company name
  - `company_logo` (text, nullable) - Company logo URL
  - `company_address` (text) - Company physical address
  - `company_phone` (text) - Company phone number
  - `company_website` (text, nullable) - Company website URL
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Record last update timestamp

  ### 2. `clients`
  Client information and status tracking
  - `id` (uuid, primary key) - Client identifier
  - `user_id` (uuid, foreign key) - Owner/creator of client record
  - `name` (text) - Client's full name
  - `email` (text) - Client's email address
  - `phone` (text) - Client's phone number
  - `address` (text) - Client's physical address
  - `status` (text) - Client status: active, pending, or completed
  - `payment_status` (text) - Payment status: paid, partial, or unpaid
  - `total_budget` (decimal) - Total budget across all projects
  - `amount_paid` (decimal) - Total amount paid to date
  - `notes` (text, nullable) - General notes about the client
  - `last_contact` (date) - Last contact date
  - `priority` (text) - Priority level: high, medium, or low
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Record last update timestamp

  ### 3. `projects`
  Project tracking and management
  - `id` (uuid, primary key) - Project identifier
  - `user_id` (uuid, foreign key) - Owner/creator of project
  - `client_id` (uuid, foreign key) - Associated client
  - `name` (text) - Project name
  - `type` (text) - Project type: deck, pergola, shed, fence, or other
  - `status` (text) - Project status: planning, in_progress, on_hold, or completed
  - `progress` (integer) - Progress percentage (0-100)
  - `start_date` (date) - Project start date
  - `estimated_end_date` (date) - Estimated completion date
  - `actual_end_date` (date, nullable) - Actual completion date
  - `budget` (decimal) - Project budget
  - `cost_to_date` (decimal) - Costs incurred to date
  - `length` (decimal) - Project length dimension
  - `width` (decimal) - Project width dimension
  - `height` (decimal, nullable) - Project height dimension
  - `crew` (text[]) - Array of crew member names
  - `notes` (text, nullable) - Project notes
  - `address` (text) - Project location address
  - `is_delayed` (boolean) - Whether project is delayed
  - `delay_reason` (text, nullable) - Reason for delay
  - `weather_impact` (text) - Weather impact level: none, minor, or major
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Record last update timestamp

  ### 4. `materials`
  Materials tracking for projects
  - `id` (uuid, primary key) - Material identifier
  - `project_id` (uuid, foreign key) - Associated project
  - `name` (text) - Material name
  - `category` (text) - Category: lumber, fasteners, finishes, concrete, hardware, or other
  - `quantity` (decimal) - Quantity amount
  - `unit` (text) - Unit of measure: pieces, lbs, gallons, sq ft, or linear ft
  - `unit_price` (decimal) - Price per unit
  - `total_price` (decimal) - Total price (quantity × unit_price)
  - `status` (text) - Material status: ordered, received, installed, or needed
  - `supplier` (text, nullable) - Supplier name
  - `notes` (text, nullable) - Material notes
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Record last update timestamp

  ### 5. `milestones`
  Project milestone tracking
  - `id` (uuid, primary key) - Milestone identifier
  - `project_id` (uuid, foreign key) - Associated project
  - `name` (text) - Milestone name
  - `description` (text, nullable) - Milestone description
  - `status` (text) - Status: not_started, in_progress, or completed
  - `planned_start_date` (date) - Planned start date
  - `planned_end_date` (date) - Planned completion date
  - `actual_start_date` (date, nullable) - Actual start date
  - `actual_end_date` (date, nullable) - Actual completion date
  - `dependencies` (uuid[]) - Array of dependent milestone IDs
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Record last update timestamp

  ### 6. `alerts`
  System alerts and notifications
  - `id` (uuid, primary key) - Alert identifier
  - `user_id` (uuid, foreign key) - User receiving the alert
  - `type` (text) - Alert type: client, project, material, weather, or system
  - `severity` (text) - Severity level: low, medium, or high
  - `message` (text) - Alert message
  - `related_id` (uuid, nullable) - Related record ID
  - `related_type` (text, nullable) - Related record type: client, project, or material
  - `date` (timestamptz) - Alert creation date
  - `is_read` (boolean) - Whether alert has been read
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security

  All tables have Row Level Security (RLS) enabled with the following policies:

  ### Users Table
  - Users can view their own profile
  - Users can update their own profile
  - Users can insert their own profile (for initial setup)

  ### Clients, Projects, Materials, Milestones, Alerts Tables
  - Users can view only their own records (filtered by user_id)
  - Users can insert records with their own user_id
  - Users can update only their own records
  - Users can delete only their own records

  ## Indexes

  Performance indexes are created for:
  - Foreign key relationships (client_id, project_id, user_id)
  - Frequently queried fields (status, type, date fields)
  - Search and filter operations
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  avatar_url text,
  role text NOT NULL DEFAULT 'user' CHECK (role IN ('owner', 'admin', 'user')),
  company_name text NOT NULL,
  company_logo text,
  company_address text NOT NULL,
  company_phone text NOT NULL,
  company_website text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('active', 'pending', 'completed')),
  payment_status text NOT NULL DEFAULT 'unpaid' CHECK (payment_status IN ('paid', 'partial', 'unpaid')),
  total_budget decimal(12, 2) NOT NULL DEFAULT 0,
  amount_paid decimal(12, 2) NOT NULL DEFAULT 0,
  notes text,
  last_contact date DEFAULT CURRENT_DATE,
  priority text NOT NULL DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  client_id uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('deck', 'pergola', 'shed', 'fence', 'other')),
  status text NOT NULL DEFAULT 'planning' CHECK (status IN ('planning', 'in_progress', 'on_hold', 'completed')),
  progress integer NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  start_date date NOT NULL,
  estimated_end_date date NOT NULL,
  actual_end_date date,
  budget decimal(12, 2) NOT NULL DEFAULT 0,
  cost_to_date decimal(12, 2) NOT NULL DEFAULT 0,
  length decimal(10, 2) NOT NULL,
  width decimal(10, 2) NOT NULL,
  height decimal(10, 2),
  crew text[] DEFAULT '{}',
  notes text,
  address text NOT NULL,
  is_delayed boolean NOT NULL DEFAULT false,
  delay_reason text,
  weather_impact text NOT NULL DEFAULT 'none' CHECK (weather_impact IN ('none', 'minor', 'major')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create materials table
CREATE TABLE IF NOT EXISTS materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('lumber', 'fasteners', 'finishes', 'concrete', 'hardware', 'other')),
  quantity decimal(10, 2) NOT NULL,
  unit text NOT NULL CHECK (unit IN ('pieces', 'lbs', 'gallons', 'sq ft', 'linear ft')),
  unit_price decimal(10, 2) NOT NULL,
  total_price decimal(12, 2) NOT NULL,
  status text NOT NULL DEFAULT 'needed' CHECK (status IN ('ordered', 'received', 'installed', 'needed')),
  supplier text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create milestones table
CREATE TABLE IF NOT EXISTS milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  planned_start_date date NOT NULL,
  planned_end_date date NOT NULL,
  actual_start_date date,
  actual_end_date date,
  dependencies uuid[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create alerts table
CREATE TABLE IF NOT EXISTS alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('client', 'project', 'material', 'weather', 'system')),
  severity text NOT NULL DEFAULT 'low' CHECK (severity IN ('low', 'medium', 'high')),
  message text NOT NULL,
  related_id uuid,
  related_type text CHECK (related_type IN ('client', 'project', 'material')),
  date timestamptz DEFAULT now(),
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON clients(user_id);
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
CREATE INDEX IF NOT EXISTS idx_clients_priority ON clients(priority);

CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_client_id ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_type ON projects(type);
CREATE INDEX IF NOT EXISTS idx_projects_start_date ON projects(start_date);

CREATE INDEX IF NOT EXISTS idx_materials_project_id ON materials(project_id);
CREATE INDEX IF NOT EXISTS idx_materials_status ON materials(status);

CREATE INDEX IF NOT EXISTS idx_milestones_project_id ON milestones(project_id);
CREATE INDEX IF NOT EXISTS idx_milestones_status ON milestones(status);

CREATE INDEX IF NOT EXISTS idx_alerts_user_id ON alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_alerts_is_read ON alerts(is_read);
CREATE INDEX IF NOT EXISTS idx_alerts_date ON alerts(date);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Clients policies
CREATE POLICY "Users can view own clients"
  ON clients FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own clients"
  ON clients FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own clients"
  ON clients FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own clients"
  ON clients FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Projects policies
CREATE POLICY "Users can view own projects"
  ON projects FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects"
  ON projects FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Materials policies
CREATE POLICY "Users can view materials for own projects"
  ON materials FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = materials.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert materials for own projects"
  ON materials FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = materials.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update materials for own projects"
  ON materials FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = materials.project_id
      AND projects.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = materials.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete materials for own projects"
  ON materials FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = materials.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- Milestones policies
CREATE POLICY "Users can view milestones for own projects"
  ON milestones FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = milestones.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert milestones for own projects"
  ON milestones FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = milestones.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update milestones for own projects"
  ON milestones FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = milestones.project_id
      AND projects.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = milestones.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete milestones for own projects"
  ON milestones FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = milestones.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- Alerts policies
CREATE POLICY "Users can view own alerts"
  ON alerts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own alerts"
  ON alerts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own alerts"
  ON alerts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own alerts"
  ON alerts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_materials_updated_at
  BEFORE UPDATE ON materials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_milestones_updated_at
  BEFORE UPDATE ON milestones
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
