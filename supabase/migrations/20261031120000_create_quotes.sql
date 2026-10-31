/*
  # Create Quotes Table

  ## Overview
  Adds client quotes so contractors can turn estimates into itemized,
  printable quotes and track whether each one was sent, accepted or declined.

  ## New Tables

  ### `quotes`
  - `id` (uuid, primary key) - Quote identifier
  - `user_id` (uuid, foreign key) - Owner/creator of the quote
  - `client_id` (uuid, foreign key) - Client the quote is for
  - `quote_number` (text) - Human-readable number, e.g. Q-20261031-4821
  - `title` (text) - Short description of the job
  - `status` (text) - draft, sent, accepted or declined
  - `valid_until` (date) - Date the quote expires
  - `line_items` (jsonb) - Array of { description, category, quantity, unit, unit_price }
  - `tax_rate` (decimal) - Tax rate as a percentage, e.g. 13 for 13%
  - `discount` (decimal) - Flat discount amount taken off the subtotal
  - `subtotal` (decimal) - Sum of line items before discount and tax
  - `tax_amount` (decimal) - Tax charged on the discounted subtotal
  - `total` (decimal) - Final amount
  - `notes` (text, nullable) - Terms or notes shown on the quote
  - `created_at` / `updated_at` (timestamptz)

  ## Security
  - RLS enabled; authenticated users manage only their own quotes
  - Anonymous demo access mirrors the other tables (demo user only)
*/

CREATE TABLE IF NOT EXISTS quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  client_id uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  quote_number text NOT NULL,
  title text NOT NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'accepted', 'declined')),
  valid_until date NOT NULL,
  line_items jsonb NOT NULL DEFAULT '[]'::jsonb,
  tax_rate decimal(5, 2) NOT NULL DEFAULT 0 CHECK (tax_rate >= 0 AND tax_rate <= 100),
  discount decimal(12, 2) NOT NULL DEFAULT 0 CHECK (discount >= 0),
  subtotal decimal(12, 2) NOT NULL DEFAULT 0,
  tax_amount decimal(12, 2) NOT NULL DEFAULT 0,
  total decimal(12, 2) NOT NULL DEFAULT 0,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (user_id, quote_number)
);

CREATE INDEX IF NOT EXISTS idx_quotes_user_id ON quotes(user_id);
CREATE INDEX IF NOT EXISTS idx_quotes_client_id ON quotes(client_id);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);

ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own quotes"
  ON quotes FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quotes"
  ON quotes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own quotes"
  ON quotes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own quotes"
  ON quotes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Demo access, matching the other tables (remove when real auth is added)
CREATE POLICY "Allow anon to view demo quotes"
  ON quotes FOR SELECT
  TO anon
  USING (user_id = '00000000-0000-0000-0000-000000000001');

CREATE POLICY "Allow anon to insert demo quotes"
  ON quotes FOR INSERT
  TO anon
  WITH CHECK (user_id = '00000000-0000-0000-0000-000000000001');

CREATE POLICY "Allow anon to update demo quotes"
  ON quotes FOR UPDATE
  TO anon
  USING (user_id = '00000000-0000-0000-0000-000000000001')
  WITH CHECK (user_id = '00000000-0000-0000-0000-000000000001');

CREATE TRIGGER update_quotes_updated_at
  BEFORE UPDATE ON quotes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
