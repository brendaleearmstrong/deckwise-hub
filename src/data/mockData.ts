
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'pending' | 'completed';
  paymentStatus: 'paid' | 'partial' | 'unpaid';
  totalBudget: number;
  amountPaid: number;
  projects: string[];
  notes: string;
  lastContact: string;
  priority: 'high' | 'medium' | 'low';
}

export interface Project {
  id: string;
  name: string;
  clientId: string;
  type: 'deck' | 'pergola' | 'shed' | 'fence' | 'other';
  status: 'planning' | 'in_progress' | 'on_hold' | 'completed';
  progress: number;
  startDate: string;
  estimatedEndDate: string;
  actualEndDate?: string;
  budget: number;
  costToDate: number;
  dimensions: {
    length: number;
    width: number;
    height?: number;
  };
  materials: Material[];
  milestones: Milestone[];
  crew: string[];
  notes: string;
  address: string;
  isDelayed: boolean;
  delayReason?: string;
  weatherImpact: 'none' | 'minor' | 'major';
}

export interface Material {
  id: string;
  name: string;
  category: 'lumber' | 'fasteners' | 'finishes' | 'concrete' | 'hardware' | 'other';
  quantity: number;
  unit: 'pieces' | 'lbs' | 'gallons' | 'sq ft' | 'linear ft';
  unitPrice: number;
  totalPrice: number;
  status: 'ordered' | 'received' | 'installed' | 'needed';
  supplier?: string;
  notes?: string;
}

export interface Milestone {
  id: string;
  name: string;
  description?: string;
  status: 'not_started' | 'in_progress' | 'completed';
  plannedStartDate: string;
  plannedEndDate: string;
  actualStartDate?: string;
  actualEndDate?: string;
  dependencies?: string[];
}

export interface Alert {
  id: string;
  type: 'client' | 'project' | 'material' | 'weather' | 'system';
  severity: 'low' | 'medium' | 'high';
  message: string;
  relatedId?: string;
  relatedType?: 'client' | 'project' | 'material';
  date: string;
  isRead: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'owner' | 'admin' | 'user';
  company: {
    name: string;
    logo?: string;
    address: string;
    phone: string;
    website?: string;
  };
}

// Current User Profile
export const currentUser: User = {
  id: 'user-1',
  name: 'Louis Armstrong',
  email: 'louis@ottawadeckbuilders.com',
  role: 'owner',
  company: {
    name: 'Ottawa Deck Builders',
    address: '123 Carpenter St, Ottawa, ON K1S 5B3',
    phone: '(613) 555-7890',
    website: 'www.ottawadeckbuilders.com'
  }
};

// Mock Clients
export const mockClients: Client[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, USA',
    status: 'active',
    paymentStatus: 'partial',
    totalBudget: 8500,
    amountPaid: 4250,
    projects: ['1'],
    notes: 'Prefers communication via email. Available after 5pm on weekdays.',
    lastContact: '2025-03-15',
    priority: 'high'
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '(555) 987-6543',
    address: '456 Oak Ave, Somewhere, USA',
    status: 'active',
    paymentStatus: 'paid',
    totalBudget: 12000,
    amountPaid: 12000,
    projects: ['2'],
    notes: 'Very detail-oriented. Asks for daily updates.',
    lastContact: '2025-03-16',
    priority: 'medium'
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    phone: '(555) 246-8135',
    address: '789 Pine Rd, Elsewhere, USA',
    status: 'pending',
    paymentStatus: 'unpaid',
    totalBudget: 6200,
    amountPaid: 0,
    projects: ['3'],
    notes: 'New client, waiting for project approval.',
    lastContact: '2025-03-14',
    priority: 'low'
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    phone: '(555) 369-1478',
    address: '321 Cedar Ln, Nowhereville, USA',
    status: 'completed',
    paymentStatus: 'paid',
    totalBudget: 9800,
    amountPaid: 9800,
    projects: ['4'],
    notes: 'Pleased with previous work. Potential referral source.',
    lastContact: '2025-03-10',
    priority: 'medium'
  }
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Smith Backyard Deck',
    clientId: '1',
    type: 'deck',
    status: 'in_progress',
    progress: 60,
    startDate: '2025-03-10',
    estimatedEndDate: '2025-03-25',
    budget: 8500,
    costToDate: 5100,
    dimensions: {
      length: 20,
      width: 12,
      height: 3
    },
    materials: [
      {
        id: 'm1',
        name: '2x6 Pressure Treated Lumber',
        category: 'lumber',
        quantity: 120,
        unit: 'pieces',
        unitPrice: 12.50,
        totalPrice: 1500,
        status: 'received'
      },
      {
        id: 'm2',
        name: 'Deck Screws',
        category: 'fasteners',
        quantity: 500,
        unit: 'pieces',
        unitPrice: 0.15,
        totalPrice: 75,
        status: 'received'
      }
    ],
    milestones: [
      {
        id: 'ms1',
        name: 'Foundation & Footings',
        status: 'completed',
        plannedStartDate: '2025-03-10',
        plannedEndDate: '2025-03-12',
        actualStartDate: '2025-03-10',
        actualEndDate: '2025-03-12'
      },
      {
        id: 'ms2',
        name: 'Framing',
        status: 'completed',
        plannedStartDate: '2025-03-13',
        plannedEndDate: '2025-03-15',
        actualStartDate: '2025-03-13',
        actualEndDate: '2025-03-16'
      },
      {
        id: 'ms3',
        name: 'Decking',
        status: 'in_progress',
        plannedStartDate: '2025-03-16',
        plannedEndDate: '2025-03-20',
        actualStartDate: '2025-03-17'
      },
      {
        id: 'ms4',
        name: 'Railings & Finishing',
        status: 'not_started',
        plannedStartDate: '2025-03-21',
        plannedEndDate: '2025-03-25'
      }
    ],
    crew: ['Mike', 'Dave', 'Carlos'],
    notes: 'Client requested cedar railings instead of pressure treated.',
    address: '123 Main St, Anytown, USA',
    isDelayed: true,
    delayReason: 'Material delivery delay for railings',
    weatherImpact: 'minor'
  },
  {
    id: '2',
    name: 'Doe Pergola Project',
    clientId: '2',
    type: 'pergola',
    status: 'in_progress',
    progress: 80,
    startDate: '2025-03-05',
    estimatedEndDate: '2025-03-20',
    budget: 12000,
    costToDate: 9600,
    dimensions: {
      length: 16,
      width: 12,
      height: 9
    },
    materials: [
      {
        id: 'm3',
        name: '6x6 Cedar Posts',
        category: 'lumber',
        quantity: 8,
        unit: 'pieces',
        unitPrice: 85,
        totalPrice: 680,
        status: 'installed'
      },
      {
        id: 'm4',
        name: 'Cedar 2x8 Beams',
        category: 'lumber',
        quantity: 12,
        unit: 'pieces',
        unitPrice: 42,
        totalPrice: 504,
        status: 'installed'
      }
    ],
    milestones: [
      {
        id: 'ms5',
        name: 'Post Installation',
        status: 'completed',
        plannedStartDate: '2025-03-05',
        plannedEndDate: '2025-03-08',
        actualStartDate: '2025-03-05',
        actualEndDate: '2025-03-08'
      },
      {
        id: 'ms6',
        name: 'Beam Installation',
        status: 'completed',
        plannedStartDate: '2025-03-09',
        plannedEndDate: '2025-03-12',
        actualStartDate: '2025-03-09',
        actualEndDate: '2025-03-11'
      },
      {
        id: 'ms7',
        name: 'Rafters & Latticework',
        status: 'in_progress',
        plannedStartDate: '2025-03-13',
        plannedEndDate: '2025-03-17',
        actualStartDate: '2025-03-13'
      },
      {
        id: 'ms8',
        name: 'Finishing & Staining',
        status: 'not_started',
        plannedStartDate: '2025-03-18',
        plannedEndDate: '2025-03-20'
      }
    ],
    crew: ['Mike', 'Sarah', 'Tom'],
    notes: 'Adding electrical conduit for future lighting installation.',
    address: '456 Oak Ave, Somewhere, USA',
    isDelayed: false,
    weatherImpact: 'none'
  },
  {
    id: '3',
    name: 'Johnson Shed Construction',
    clientId: '3',
    type: 'shed',
    status: 'planning',
    progress: 0,
    startDate: '2025-03-25',
    estimatedEndDate: '2025-04-05',
    budget: 6200,
    costToDate: 0,
    dimensions: {
      length: 10,
      width: 8,
      height: 8
    },
    materials: [
      {
        id: 'm5',
        name: 'Pressure Treated 2x4s',
        category: 'lumber',
        quantity: 50,
        unit: 'pieces',
        unitPrice: 8.75,
        totalPrice: 437.50,
        status: 'needed'
      },
      {
        id: 'm6',
        name: 'T1-11 Siding',
        category: 'lumber',
        quantity: 12,
        unit: 'pieces',
        unitPrice: 45,
        totalPrice: 540,
        status: 'needed'
      }
    ],
    milestones: [
      {
        id: 'ms9',
        name: 'Foundation',
        status: 'not_started',
        plannedStartDate: '2025-03-25',
        plannedEndDate: '2025-03-27'
      },
      {
        id: 'ms10',
        name: 'Framing',
        status: 'not_started',
        plannedStartDate: '2025-03-28',
        plannedEndDate: '2025-03-30'
      },
      {
        id: 'ms11',
        name: 'Siding & Roofing',
        status: 'not_started',
        plannedStartDate: '2025-03-31',
        plannedEndDate: '2025-04-03'
      },
      {
        id: 'ms12',
        name: 'Finishing',
        status: 'not_started',
        plannedStartDate: '2025-04-04',
        plannedEndDate: '2025-04-05'
      }
    ],
    crew: ['Dave', 'Carlos'],
    notes: 'Pre-approval from HOA received.',
    address: '789 Pine Rd, Elsewhere, USA',
    isDelayed: false,
    weatherImpact: 'none'
  },
  {
    id: '4',
    name: 'Williams Fence Installation',
    clientId: '4',
    type: 'fence',
    status: 'completed',
    progress: 100,
    startDate: '2025-02-25',
    estimatedEndDate: '2025-03-10',
    actualEndDate: '2025-03-09',
    budget: 9800,
    costToDate: 9450,
    dimensions: {
      length: 150,
      width: 6,
      height: 6
    },
    materials: [
      {
        id: 'm7',
        name: '4x4 Pressure Treated Posts',
        category: 'lumber',
        quantity: 35,
        unit: 'pieces',
        unitPrice: 18,
        totalPrice: 630,
        status: 'installed'
      },
      {
        id: 'm8',
        name: 'Privacy Fence Panels',
        category: 'lumber',
        quantity: 30,
        unit: 'pieces',
        unitPrice: 75,
        totalPrice: 2250,
        status: 'installed'
      }
    ],
    milestones: [
      {
        id: 'ms13',
        name: 'Post Installation',
        status: 'completed',
        plannedStartDate: '2025-02-25',
        plannedEndDate: '2025-02-28',
        actualStartDate: '2025-02-25',
        actualEndDate: '2025-02-28'
      },
      {
        id: 'ms14',
        name: 'Panel Installation',
        status: 'completed',
        plannedStartDate: '2025-03-01',
        plannedEndDate: '2025-03-05',
        actualStartDate: '2025-03-01',
        actualEndDate: '2025-03-04'
      },
      {
        id: 'ms15',
        name: 'Gates & Hardware',
        status: 'completed',
        plannedStartDate: '2025-03-06',
        plannedEndDate: '2025-03-08',
        actualStartDate: '2025-03-05',
        actualEndDate: '2025-03-07'
      },
      {
        id: 'ms16',
        name: 'Finishing & Staining',
        status: 'completed',
        plannedStartDate: '2025-03-09',
        plannedEndDate: '2025-03-10',
        actualStartDate: '2025-03-08',
        actualEndDate: '2025-03-09'
      }
    ],
    crew: ['Mike', 'Sarah'],
    notes: 'Client very satisfied with the finished product.',
    address: '321 Cedar Ln, Nowhereville, USA',
    isDelayed: false,
    weatherImpact: 'none'
  }
];

// Mock Alerts
export const mockAlerts: Alert[] = [
  {
    id: 'a1',
    type: 'project',
    severity: 'high',
    message: 'Smith Deck is 2 days behind schedule',
    relatedId: '1',
    relatedType: 'project',
    date: '2025-03-17',
    isRead: false
  },
  {
    id: 'a2',
    type: 'client',
    severity: 'medium',
    message: 'Payment due from John Smith - 50% remaining ($4,250)',
    relatedId: '1',
    relatedType: 'client',
    date: '2025-03-16',
    isRead: true
  },
  {
    id: 'a3',
    type: 'material',
    severity: 'medium',
    message: 'Cedar railings for Smith Deck delayed by supplier',
    relatedId: '1',
    relatedType: 'project',
    date: '2025-03-15',
    isRead: false
  },
  {
    id: 'a4',
    type: 'weather',
    severity: 'low',
    message: 'Rain forecasted for March 19-20, may impact Williams Fence project',
    relatedId: '4',
    relatedType: 'project',
    date: '2025-03-14',
    isRead: true
  },
  {
    id: 'a5',
    type: 'system',
    severity: 'high',
    message: 'Johnson project contract needs approval',
    relatedId: '3',
    relatedType: 'project',
    date: '2025-03-17',
    isRead: false
  }
];

// Helper functions
export const getClientById = (id: string): Client | undefined => {
  return mockClients.find(client => client.id === id);
};

export const getProjectById = (id: string): Project | undefined => {
  return mockProjects.find(project => project.id === id);
};

export const getProjectsByClientId = (clientId: string): Project[] => {
  return mockProjects.filter(project => project.clientId === clientId);
};

export const getUnreadAlerts = (): Alert[] => {
  return mockAlerts.filter(alert => !alert.isRead);
};

export const getHighPriorityAlerts = (): Alert[] => {
  return mockAlerts.filter(alert => alert.severity === 'high');
};
