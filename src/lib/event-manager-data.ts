
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
    name: 'Priya Sharma',
    phone: '987-654-3210',
    specializations: ['Weddings', 'Sangeeths', 'Corporate Events'],
    portfolio: [
      'Organized a 500-guest wedding at Nizami Palace.',
      'Managed a multi-day corporate summit at Hi-Tech Convention.',
      'Coordinated a grand Sangeeth at Charminar Courtyard with 300+ attendees.',
      'Planned and executed a luxury product launch for a top brand.',
    ],
  },
  {
    id: 'em-02',
    name: 'Rahul Verma',
    phone: '876-543-2109',
    specializations: ['Corporate Events', 'Conferences', 'Night Parties'],
    portfolio: [
      'Executed a product launch event for a major tech company.',
      'Handled logistics for a 1000-person international conference.',
      'Curated a high-energy DJ night at Necklace Road Gardens featuring a famous artist.',
      'Managed a formal corporate awards ceremony for a multi-national company.',
    ],
  },
  {
    id: 'em-03',
    name: 'Anjali Singh',
    phone: '765-432-1098',
    specializations: ['Birthday Parties', 'General Parties/Gatherings'],
    portfolio: [
      'Designed and executed over 100 themed birthday parties for all ages.',
      'Managed a large family gathering at Golkonda Fort Lawns.',
      'Specializes in catering and entertainment coordination for private events.',
      'Organized a successful charity fundraiser with 200 attendees.',
    ],
  },
  {
    id: 'em-04',
    name: 'Rohan Mehta',
    phone: '654-321-0987',
    specializations: ['Marriages (Weddings)', 'Night Parties', 'Sangeeths'],
    portfolio: [
      'Expert in destination weddings and large-scale celebrations.',
      'Organized exclusive night parties with celebrity guests at Ramoji Film City.',
      'Known for innovative and modern event design concepts for Sangeeths.',
      'Managed a high-profile wedding featured in a lifestyle magazine.',
    ],
  },
];
