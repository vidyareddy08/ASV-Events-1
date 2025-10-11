
export type EventManager = {
  id: string;
  name: string;
  phone: string;
  specializations: string[];
  portfolio: string[];
};

export const eventManagers: EventManager[] = [
  {
    id: 'em-01',
    name: 'Anushritha',
    phone: '987-654-3210',
    specializations: ['Founder & CEO', 'Weddings', 'Corporate Events'],
    portfolio: [
      'Spearheaded the company vision and strategy.',
      'Organized a 500-guest wedding at Nizami Palace.',
      'Managed a multi-day corporate summit at Hi-Tech Convention.',
    ],
  },
  {
    id: 'em-02',
    name: 'Vidya',
    phone: '876-543-2109',
    specializations: ['Founder & CTO', 'Tech Events', 'Conferences'],
    portfolio: [
      'Led the development of the venue booking platform.',
      'Executed a product launch event for a major tech company.',
      'Handled logistics for a 1000-person international conference.',
    ],
  },
  {
    id: 'em-03',
    name: 'Sathvika',
    phone: '765-432-1098',
    specializations: ['Founder & Head of Design', 'Themed Parties', 'Sangeeths'],
    portfolio: [
      'Designed the user experience and brand identity.',
      'Curated visually stunning themed parties and Sangeeths.',
      'Specializes in decor and ambiance for high-end private events.',
    ],
  },
  {
    id: 'em-04',
    name: 'Keerthana',
    phone: '912-345-6789',
    specializations: ['Luxury Weddings', 'Destination Events'],
    portfolio: [
      'Managed luxury destination weddings in Goa and Jaipur.',
      'Expert in vendor negotiations and budget management.',
    ],
  },
  {
    id: 'em-05',
    name: 'Virat',
    phone: '923-456-7890',
    specializations: ['Sports Events', 'Large-scale Gatherings'],
    portfolio: [
      'Organized post-match events for sporting leagues.',
      'Handled logistics for large public gatherings and festivals.',
    ],
  },
  {
    id: 'em-06',
    name: 'Rohit',
    phone: '934-567-8901',
    specializations: ['Corporate Offsites', 'Team Building'],
    portfolio: [
      'Curated engaging corporate offsites and retreats.',
      'Specializes in creating unique team-building experiences.',
    ],
  },
  {
    id: 'em-07',
    name: 'Hardik',
    phone: '945-678-9012',
    specializations: ['Night Parties', 'Concert Management'],
    portfolio: [
      'Managed high-energy night parties and club events.',
      'Coordinated logistics for live music concerts and artist tours.',
    ],
  },
  {
    id: 'em-08',
    name: 'Surya Kumar',
    phone: '956-789-0123',
    specializations: ['Product Launches', 'Brand Activations'],
    portfolio: [
      'Executed creative brand activation campaigns.',
      'Orchestrated memorable product launch events for startups.',
    ],
  },
];
