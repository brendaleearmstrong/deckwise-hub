/*
  # Insert Mock Data for Testing

  ## Overview
  This migration inserts sample data to populate the database for testing and development.
  All data is linked correctly through foreign key relationships.

  ## Mock Data Inserted

  ### 1. User Profile
  - Creates a sample user profile for "Louis Armstrong" as the owner
  - Company: Outdoor Living Structures

  ### 2. Clients (4 clients)
  - John Smith - Active client with partial payment
  - Jane Doe - Active client with full payment
  - Robert Johnson - Pending client with no payment
  - Sarah Williams - Completed client with full payment

  ### 3. Projects (4 projects)
  - Smith Backyard Deck - In progress (60%)
  - Doe Pergola Project - In progress (80%)
  - Johnson Shed Construction - Planning stage (0%)
  - Williams Fence Installation - Completed (100%)

  ### 4. Materials
  - Multiple materials per project with various statuses

  ### 5. Milestones
  - 4 milestones per project tracking progress

  ### 6. Alerts
  - 5 system alerts for various project issues

  ## Important Notes
  - This uses a fixed UUID for the demo user: '00000000-0000-0000-0000-000000000001'
  - In production, this would be replaced with actual auth.users IDs
  - All foreign key relationships are properly maintained
*/

-- Insert demo user
INSERT INTO users (
  id,
  name,
  email,
  role,
  company_name,
  company_address,
  company_phone,
  company_website
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Louis Armstrong',
  'louis@outdoorlivingstructures.com',
  'owner',
  'Outdoor Living Structures',
  '123 Carpenter St, Ottawa, ON K1S 5B3',
  '(613) 555-7890',
  'www.outdoorlivingstructures.com'
)
ON CONFLICT (id) DO NOTHING;

-- Insert clients
INSERT INTO clients (
  id,
  user_id,
  name,
  email,
  phone,
  address,
  status,
  payment_status,
  total_budget,
  amount_paid,
  notes,
  last_contact,
  priority
) VALUES
  (
    '10000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'John Smith',
    'john.smith@example.com',
    '(555) 123-4567',
    '123 Main St, Anytown, USA',
    'active',
    'partial',
    8500.00,
    4250.00,
    'Prefers communication via email. Available after 5pm on weekdays.',
    '2025-03-15',
    'high'
  ),
  (
    '10000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000001',
    'Jane Doe',
    'jane.doe@example.com',
    '(555) 987-6543',
    '456 Oak Ave, Somewhere, USA',
    'active',
    'paid',
    12000.00,
    12000.00,
    'Very detail-oriented. Asks for daily updates.',
    '2025-03-16',
    'medium'
  ),
  (
    '10000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000001',
    'Robert Johnson',
    'robert.johnson@example.com',
    '(555) 246-8135',
    '789 Pine Rd, Elsewhere, USA',
    'pending',
    'unpaid',
    6200.00,
    0.00,
    'New client, waiting for project approval.',
    '2025-03-14',
    'low'
  ),
  (
    '10000000-0000-0000-0000-000000000004',
    '00000000-0000-0000-0000-000000000001',
    'Sarah Williams',
    'sarah.williams@example.com',
    '(555) 369-1478',
    '321 Cedar Ln, Nowhereville, USA',
    'completed',
    'paid',
    9800.00,
    9800.00,
    'Pleased with previous work. Potential referral source.',
    '2025-03-10',
    'medium'
  )
ON CONFLICT (id) DO NOTHING;

-- Insert projects
INSERT INTO projects (
  id,
  user_id,
  client_id,
  name,
  type,
  status,
  progress,
  start_date,
  estimated_end_date,
  actual_end_date,
  budget,
  cost_to_date,
  length,
  width,
  height,
  crew,
  notes,
  address,
  is_delayed,
  delay_reason,
  weather_impact
) VALUES
  (
    '20000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    'Smith Backyard Deck',
    'deck',
    'in_progress',
    60,
    '2025-03-10',
    '2025-03-25',
    NULL,
    8500.00,
    5100.00,
    20.00,
    12.00,
    3.00,
    ARRAY['Mike', 'Dave', 'Carlos'],
    'Client requested cedar railings instead of pressure treated.',
    '123 Main St, Anytown, USA',
    true,
    'Material delivery delay for railings',
    'minor'
  ),
  (
    '20000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000002',
    'Doe Pergola Project',
    'pergola',
    'in_progress',
    80,
    '2025-03-05',
    '2025-03-20',
    NULL,
    12000.00,
    9600.00,
    16.00,
    12.00,
    9.00,
    ARRAY['Mike', 'Sarah', 'Tom'],
    'Adding electrical conduit for future lighting installation.',
    '456 Oak Ave, Somewhere, USA',
    false,
    NULL,
    'none'
  ),
  (
    '20000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000003',
    'Johnson Shed Construction',
    'shed',
    'planning',
    0,
    '2025-03-25',
    '2025-04-05',
    NULL,
    6200.00,
    0.00,
    10.00,
    8.00,
    8.00,
    ARRAY['Dave', 'Carlos'],
    'Pre-approval from HOA received.',
    '789 Pine Rd, Elsewhere, USA',
    false,
    NULL,
    'none'
  ),
  (
    '20000000-0000-0000-0000-000000000004',
    '00000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000004',
    'Williams Fence Installation',
    'fence',
    'completed',
    100,
    '2025-02-25',
    '2025-03-10',
    '2025-03-09',
    9800.00,
    9450.00,
    150.00,
    6.00,
    6.00,
    ARRAY['Mike', 'Sarah'],
    'Client very satisfied with the finished product.',
    '321 Cedar Ln, Nowhereville, USA',
    false,
    NULL,
    'none'
  )
ON CONFLICT (id) DO NOTHING;

-- Insert materials for Project 1 (Smith Deck)
INSERT INTO materials (
  id,
  project_id,
  name,
  category,
  quantity,
  unit,
  unit_price,
  total_price,
  status,
  supplier
) VALUES
  (
    '30000000-0000-0000-0000-000000000001',
    '20000000-0000-0000-0000-000000000001',
    '2x6 Pressure Treated Lumber',
    'lumber',
    120.00,
    'pieces',
    12.50,
    1500.00,
    'received',
    'Home Depot'
  ),
  (
    '30000000-0000-0000-0000-000000000002',
    '20000000-0000-0000-0000-000000000001',
    'Deck Screws',
    'fasteners',
    500.00,
    'pieces',
    0.15,
    75.00,
    'received',
    'Home Depot'
  ),
  (
    '30000000-0000-0000-0000-000000000003',
    '20000000-0000-0000-0000-000000000001',
    'Cedar Railings',
    'lumber',
    40.00,
    'linear ft',
    25.00,
    1000.00,
    'ordered',
    'Lumber Yard'
  )
ON CONFLICT (id) DO NOTHING;

-- Insert materials for Project 2 (Doe Pergola)
INSERT INTO materials (
  id,
  project_id,
  name,
  category,
  quantity,
  unit,
  unit_price,
  total_price,
  status,
  supplier
) VALUES
  (
    '30000000-0000-0000-0000-000000000004',
    '20000000-0000-0000-0000-000000000002',
    '6x6 Cedar Posts',
    'lumber',
    8.00,
    'pieces',
    85.00,
    680.00,
    'installed',
    'Cedar Supply Co'
  ),
  (
    '30000000-0000-0000-0000-000000000005',
    '20000000-0000-0000-0000-000000000002',
    'Cedar 2x8 Beams',
    'lumber',
    12.00,
    'pieces',
    42.00,
    504.00,
    'installed',
    'Cedar Supply Co'
  ),
  (
    '30000000-0000-0000-0000-000000000006',
    '20000000-0000-0000-0000-000000000002',
    'Wood Stain',
    'finishes',
    3.00,
    'gallons',
    45.00,
    135.00,
    'received',
    'Paint Store'
  )
ON CONFLICT (id) DO NOTHING;

-- Insert materials for Project 3 (Johnson Shed)
INSERT INTO materials (
  id,
  project_id,
  name,
  category,
  quantity,
  unit,
  unit_price,
  total_price,
  status,
  supplier
) VALUES
  (
    '30000000-0000-0000-0000-000000000007',
    '20000000-0000-0000-0000-000000000003',
    'Pressure Treated 2x4s',
    'lumber',
    50.00,
    'pieces',
    8.75,
    437.50,
    'needed',
    'TBD'
  ),
  (
    '30000000-0000-0000-0000-000000000008',
    '20000000-0000-0000-0000-000000000003',
    'T1-11 Siding',
    'lumber',
    12.00,
    'pieces',
    45.00,
    540.00,
    'needed',
    'TBD'
  )
ON CONFLICT (id) DO NOTHING;

-- Insert materials for Project 4 (Williams Fence)
INSERT INTO materials (
  id,
  project_id,
  name,
  category,
  quantity,
  unit,
  unit_price,
  total_price,
  status,
  supplier
) VALUES
  (
    '30000000-0000-0000-0000-000000000009',
    '20000000-0000-0000-0000-000000000004',
    '4x4 Pressure Treated Posts',
    'lumber',
    35.00,
    'pieces',
    18.00,
    630.00,
    'installed',
    'Home Depot'
  ),
  (
    '30000000-0000-0000-0000-000000000010',
    '20000000-0000-0000-0000-000000000004',
    'Privacy Fence Panels',
    'lumber',
    30.00,
    'pieces',
    75.00,
    2250.00,
    'installed',
    'Fence Supply Co'
  )
ON CONFLICT (id) DO NOTHING;

-- Insert milestones for Project 1 (Smith Deck)
INSERT INTO milestones (
  id,
  project_id,
  name,
  description,
  status,
  planned_start_date,
  planned_end_date,
  actual_start_date,
  actual_end_date
) VALUES
  (
    '40000000-0000-0000-0000-000000000001',
    '20000000-0000-0000-0000-000000000001',
    'Foundation & Footings',
    'Install concrete footings and foundation',
    'completed',
    '2025-03-10',
    '2025-03-12',
    '2025-03-10',
    '2025-03-12'
  ),
  (
    '40000000-0000-0000-0000-000000000002',
    '20000000-0000-0000-0000-000000000001',
    'Framing',
    'Build deck frame structure',
    'completed',
    '2025-03-13',
    '2025-03-15',
    '2025-03-13',
    '2025-03-16'
  ),
  (
    '40000000-0000-0000-0000-000000000003',
    '20000000-0000-0000-0000-000000000001',
    'Decking',
    'Install deck boards',
    'in_progress',
    '2025-03-16',
    '2025-03-20',
    '2025-03-17',
    NULL
  ),
  (
    '40000000-0000-0000-0000-000000000004',
    '20000000-0000-0000-0000-000000000001',
    'Railings & Finishing',
    'Install railings and finish work',
    'not_started',
    '2025-03-21',
    '2025-03-25',
    NULL,
    NULL
  )
ON CONFLICT (id) DO NOTHING;

-- Insert milestones for Project 2 (Doe Pergola)
INSERT INTO milestones (
  id,
  project_id,
  name,
  description,
  status,
  planned_start_date,
  planned_end_date,
  actual_start_date,
  actual_end_date
) VALUES
  (
    '40000000-0000-0000-0000-000000000005',
    '20000000-0000-0000-0000-000000000002',
    'Post Installation',
    'Install pergola posts',
    'completed',
    '2025-03-05',
    '2025-03-08',
    '2025-03-05',
    '2025-03-08'
  ),
  (
    '40000000-0000-0000-0000-000000000006',
    '20000000-0000-0000-0000-000000000002',
    'Beam Installation',
    'Install main beams',
    'completed',
    '2025-03-09',
    '2025-03-12',
    '2025-03-09',
    '2025-03-11'
  ),
  (
    '40000000-0000-0000-0000-000000000007',
    '20000000-0000-0000-0000-000000000002',
    'Rafters & Latticework',
    'Install rafters and decorative latticework',
    'in_progress',
    '2025-03-13',
    '2025-03-17',
    '2025-03-13',
    NULL
  ),
  (
    '40000000-0000-0000-0000-000000000008',
    '20000000-0000-0000-0000-000000000002',
    'Finishing & Staining',
    'Apply stain and final touches',
    'not_started',
    '2025-03-18',
    '2025-03-20',
    NULL,
    NULL
  )
ON CONFLICT (id) DO NOTHING;

-- Insert milestones for Project 3 (Johnson Shed)
INSERT INTO milestones (
  id,
  project_id,
  name,
  description,
  status,
  planned_start_date,
  planned_end_date
) VALUES
  (
    '40000000-0000-0000-0000-000000000009',
    '20000000-0000-0000-0000-000000000003',
    'Foundation',
    'Prepare foundation and floor',
    'not_started',
    '2025-03-25',
    '2025-03-27'
  ),
  (
    '40000000-0000-0000-0000-000000000010',
    '20000000-0000-0000-0000-000000000003',
    'Framing',
    'Frame walls and roof',
    'not_started',
    '2025-03-28',
    '2025-03-30'
  ),
  (
    '40000000-0000-0000-0000-000000000011',
    '20000000-0000-0000-0000-000000000003',
    'Siding & Roofing',
    'Install siding and roofing materials',
    'not_started',
    '2025-03-31',
    '2025-04-03'
  ),
  (
    '40000000-0000-0000-0000-000000000012',
    '20000000-0000-0000-0000-000000000003',
    'Finishing',
    'Install door, windows, and paint',
    'not_started',
    '2025-04-04',
    '2025-04-05'
  )
ON CONFLICT (id) DO NOTHING;

-- Insert milestones for Project 4 (Williams Fence)
INSERT INTO milestones (
  id,
  project_id,
  name,
  description,
  status,
  planned_start_date,
  planned_end_date,
  actual_start_date,
  actual_end_date
) VALUES
  (
    '40000000-0000-0000-0000-000000000013',
    '20000000-0000-0000-0000-000000000004',
    'Post Installation',
    'Install fence posts',
    'completed',
    '2025-02-25',
    '2025-02-28',
    '2025-02-25',
    '2025-02-28'
  ),
  (
    '40000000-0000-0000-0000-000000000014',
    '20000000-0000-0000-0000-000000000004',
    'Panel Installation',
    'Install fence panels',
    'completed',
    '2025-03-01',
    '2025-03-05',
    '2025-03-01',
    '2025-03-04'
  ),
  (
    '40000000-0000-0000-0000-000000000015',
    '20000000-0000-0000-0000-000000000004',
    'Gates & Hardware',
    'Install gates and hardware',
    'completed',
    '2025-03-06',
    '2025-03-08',
    '2025-03-05',
    '2025-03-07'
  ),
  (
    '40000000-0000-0000-0000-000000000016',
    '20000000-0000-0000-0000-000000000004',
    'Finishing & Staining',
    'Apply stain and final touches',
    'completed',
    '2025-03-09',
    '2025-03-10',
    '2025-03-08',
    '2025-03-09'
  )
ON CONFLICT (id) DO NOTHING;

-- Insert alerts
INSERT INTO alerts (
  id,
  user_id,
  type,
  severity,
  message,
  related_id,
  related_type,
  date,
  is_read
) VALUES
  (
    '50000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'project',
    'high',
    'Smith Deck is 2 days behind schedule',
    '20000000-0000-0000-0000-000000000001',
    'project',
    '2025-03-17',
    false
  ),
  (
    '50000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000001',
    'client',
    'medium',
    'Payment due from John Smith - 50% remaining ($4,250)',
    '10000000-0000-0000-0000-000000000001',
    'client',
    '2025-03-16',
    true
  ),
  (
    '50000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000001',
    'material',
    'medium',
    'Cedar railings for Smith Deck delayed by supplier',
    '20000000-0000-0000-0000-000000000001',
    'project',
    '2025-03-15',
    false
  ),
  (
    '50000000-0000-0000-0000-000000000004',
    '00000000-0000-0000-0000-000000000001',
    'weather',
    'low',
    'Rain forecasted for March 19-20, may impact Williams Fence project',
    '20000000-0000-0000-0000-000000000004',
    'project',
    '2025-03-14',
    true
  ),
  (
    '50000000-0000-0000-0000-000000000005',
    '00000000-0000-0000-0000-000000000001',
    'system',
    'high',
    'Johnson project contract needs approval',
    '20000000-0000-0000-0000-000000000003',
    'project',
    '2025-03-17',
    false
  )
ON CONFLICT (id) DO NOTHING;
