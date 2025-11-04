/*
  # Add Lead Fields to Clients Table

  ## Overview
  This migration adds lead-specific fields to the clients table to support lead management functionality.

  ## Changes
  1. Add lead_status column (hot, warm, cold)
  2. Add source column (where the lead came from)
  3. Add follow_up_date column (when to follow up with the lead)

  ## Notes
  - Existing clients will have NULL values for these new fields
  - These fields are primarily for clients with status='pending'
  - Active clients may also have these values for historical tracking
*/

-- Add lead_status column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'clients' AND column_name = 'lead_status'
  ) THEN
    ALTER TABLE clients ADD COLUMN lead_status text;
    ALTER TABLE clients ADD CONSTRAINT clients_lead_status_check 
      CHECK (lead_status IS NULL OR lead_status = ANY (ARRAY['hot'::text, 'warm'::text, 'cold'::text]));
  END IF;
END $$;

-- Add source column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'clients' AND column_name = 'source'
  ) THEN
    ALTER TABLE clients ADD COLUMN source text;
  END IF;
END $$;

-- Add follow_up_date column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'clients' AND column_name = 'follow_up_date'
  ) THEN
    ALTER TABLE clients ADD COLUMN follow_up_date date;
  END IF;
END $$;

-- Add comment
COMMENT ON COLUMN clients.lead_status IS 'Lead temperature - hot, warm, or cold. Primarily for pending clients.';
COMMENT ON COLUMN clients.source IS 'Where the client/lead came from (e.g., Referral, Website, Social Media)';
COMMENT ON COLUMN clients.follow_up_date IS 'Date to follow up with the lead';
