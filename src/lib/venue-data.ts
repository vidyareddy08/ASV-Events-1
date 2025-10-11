
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
    const img = PlaceHolderImages.find(p => p.id === id);
    if (!img) {
        // Return a default or throw an error
        return 'https://placehold.co/800x450';
    }
    return img.imageUrl;
}

export const venues = [
  {
    id: 'venue-05',
    name: 'Nizami Palace',
    location: 'Hyderabad (West)',
    hallType: 'Banquet Hall',
    images: [getImage('v5a'), getImage('v5b'), getImage('v5c')],
    baseCost: 220000,
    bookedDates: ['2024-08-30'],
    supportedEvents: ['Marriages (Weddings)', 'Sangeeths', 'Corporate Events', 'General Parties/Gatherings', 'Others'],
    previousEvents: [
        'Grand wedding reception for Mr. & Mrs. Sharma (500 guests)',
        'Infosys Annual Corporate Gala 2023',
        'Lavish Sangeet Ceremony for the Khan family'
    ]
  },
  {
    id: 'venue-10',
    name: 'Hi-Tech Convention',
    location: 'Hyderabad (Central)',
    hallType: 'Auditorium',
    images: [getImage('v10a'), getImage('v10b'), getImage('v10c')],
    baseCost: 110000,
    bookedDates: ['2024-09-25', '2024-09-26'],
    supportedEvents: ['Corporate Events', 'Conferences', 'Birthday Parties', 'Others'],
    previousEvents: [
        'Hyderabad Tech Summit 2023 (1000+ attendees)',
        'Annual conference for the Telangana Developers Association',
        'Large-scale product launch for a major electronics brand'
    ]
  },
  {
    id: 'venue-15',
    name: 'Charminar Courtyard',
    location: 'Hyderabad (South)',
    hallType: 'Open Space',
    images: [getImage('v15a'), getImage('v15b'), getImage('v15c')],
    baseCost: 240000,
    bookedDates: ['2024-08-29', '2024-09-29'],
    supportedEvents: ['Marriages (Weddings)', 'Sangeeths', 'General Parties/Gatherings', 'Night Parties', 'Others'],
  },
  {
    id: 'venue-22',
    name: 'Deccan Paradise',
    location: 'Hyderabad (South)',
    hallType: 'Banquet Hall',
    images: [getImage('v22a'), getImage('v22b')],
    baseCost: 130000,
    bookedDates: [],
    supportedEvents: ['Marriages (Weddings)', 'Corporate Events', 'Birthday Parties', 'General Parties/Gatherings', 'Others'],
  },
  {
    id: 'venue-16',
    name: 'Golkonda Fort Lawns',
    location: 'Hyderabad (West)',
    hallType: 'Party Lawn',
    images: [getImage('v16a'), getImage('v16b')],
    baseCost: 180000,
    bookedDates: ['2024-09-02', '2024-09-03'],
    supportedEvents: ['Birthday Parties', 'General Parties/Gatherings', 'Sangeeths', 'Others'],
  },
  {
    id: 'venue-17',
    name: 'Secunderabad Club',
    location: 'Hyderabad (North)',
    hallType: 'Banquet Hall',
    images: [getImage('v17a'), getImage('v17b'), getImage('v17c')],
    baseCost: 210000,
    bookedDates: ['2024-09-08'],
    supportedEvents: ['Marriages (Weddings)', 'Corporate Events', 'General Parties/Gatherings', 'Others'],
  },
  {
    id: 'venue-18',
    name: 'Necklace Road Gardens',
    location: 'Hyderabad (Central)',
    hallType: 'Open Space',
    images: [getImage('v18a'), getImage('v18b')],
    baseCost: 150000,
    bookedDates: ['2024-08-28', '2024-09-18'],
    supportedEvents: ['Birthday Parties', 'General Parties/Gatherings', 'Night Parties', 'Others'],
  },
  {
    id: 'venue-19',
    name: 'Ramoji Film City Events',
    location: 'Hyderabad (East)',
    hallType: 'Auditorium',
    images: [getImage('v19a'), getImage('v19b'), getImage('v19c')],
    baseCost: 290000,
    bookedDates: ['2024-09-20', '2024-09-21'],
    supportedEvents: ['Corporate Events', 'Marriages (Weddings)', 'Sangeeths', 'Others'],
    previousEvents: [
        'Filmfare Awards South 2022',
        'Star-studded Sangeet for a Bollywood celebrity',
        'International brand activation for a luxury car company'
    ]
  },
  {
    id: 'venue-20',
    name: 'Begumpet Airport Lawns',
    location: 'Hyderabad (North)',
    hallType: 'Party Lawn',
    images: [getImage('v20a'), getImage('v20b'), getImage('v20c')],
    baseCost: 110000,
    bookedDates: ['2024-09-25', '2024-09-26'],
    supportedEvents: ['Birthday Parties', 'Night Parties', 'General Parties/Gatherings', 'Others'],
  },
  {
    id: 'venue-21',
    name: 'LB Nagar Banquet',
    location: 'Hyderabad (East)',
    hallType: 'Banquet Hall',
    images: [getImage('v21a'), getImage('v21b')],
    baseCost: 95000,
    bookedDates: ['2024-09-15', '2024-09-16'],
    supportedEvents: ['Birthday Parties', 'General Parties/Gatherings', 'Corporate Events', 'Others'],
  },
];
