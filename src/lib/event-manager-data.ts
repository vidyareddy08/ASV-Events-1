
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
      'Coordinated a grand Sangeeth at Charminar Courtyard.',
    ],
  },
  {
    id: 'em-02',
    name: 'Rahul Verma',
    phone: '876-543-2109',
    specializations: ['Corporate Events', 'Conferences', 'Night Parties'],
    portfolio: [
      'Executed a product launch event for a major tech company.',
      'Handled logistics for a 1000-person conference.',
      'Curated a high-energy DJ night at Necklace Road Gardens.',
    ],
  },
  {
    id: 'em-03',
    name: 'Anjali Singh',
    phone: '765-432-1098',
    specializations: ['Birthday Parties', 'General Parties/Gatherings'],
    portfolio: [
      'Designed and executed over 50 themed birthday parties.',
      'Managed a large family gathering at Golkonda Fort Lawns.',
      'Specializes in catering and entertainment coordination.',
    ],
  },
  {
    id: 'em-04',
    name: 'Rohan Mehta',
    phone: '654-321-0987',
    specializations: ['Marriages (Weddings)', 'Night Parties', 'Sangeeths'],
    portfolio: [
      'Expert in destination weddings and large-scale celebrations.',
      'Organized exclusive night parties with celebrity guests.',
      'Known for innovative and modern event design concepts.',
    ],
  },
];
