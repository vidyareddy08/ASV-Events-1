
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
];
