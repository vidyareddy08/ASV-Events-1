
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
    id: 'venue-28',
    name: 'Vintage Palace',
    location: 'Hyderabad (West)',
    hallType: 'Banquet Hall',
    images: [getImage('vp1'), getImage('vp2')],
    baseCost: 240000,
    bookedDates: ['2024-09-05'],
    supportedEvents: ['Marriages (Weddings)', 'Sangeeths', 'Corporate Events', 'General Parties/Gatherings'],
    capacity: 400,
  },
  {
    id: 'venue-29',
    name: 'District 150',
    location: 'Hyderabad (West)',
    hallType: 'Party Lawn',
    images: [getImage('d150a'), getImage('d150b')],
    baseCost: 160000,
    bookedDates: [],
    supportedEvents: ['Birthday Parties', 'General Parties/Gatherings', 'Night Parties', 'Corporate Events'],
    capacity: 250,
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
    capacity: 1000,
    previousEvents: [
        'Hyderabad Tech Summit 2023 (1000+ attendees)',
        'Annual conference for the Telangana Developers Association',
        'Large-scale product launch for a major electronics brand'
    ]
  },
  {
    id: 'venue-24',
    name: 'Red Rose Palace',
    location: 'Hyderabad (South)',
    hallType: 'Banquet Hall',
    images: [getImage('rrp1'), getImage('rrp2')],
    baseCost: 250000,
    bookedDates: [],
    supportedEvents: ['Marriages (Weddings)', 'Sangeeths', 'General Parties/Gatherings', 'Night Parties', 'Others'],
    capacity: 500,
  },
  {
    id: 'venue-25',
    name: 'Sampradaya Vedika',
    location: 'Hyderabad (South)',
    hallType: 'Open Space',
    images: [getImage('sv1'), getImage('sv2')],
    baseCost: 190000,
    bookedDates: ['2024-09-10'],
    supportedEvents: ['Marriages (Weddings)', 'Corporate Events', 'Birthday Parties', 'General Parties/Gatherings', 'Others'],
    capacity: 700,
  },
  {
    id: 'venue-17',
    name: 'Secunderabad Club',
    location: 'Hyderabad (North)',
    hallType: 'Banquet Hall',
    images: [getImage('v17a'), getImage('v17b'), getImage('v17c'), getImage('v17d')],
    baseCost: 210000,
    bookedDates: ['2024-09-08'],
    supportedEvents: ['Marriages (Weddings)', 'Corporate Events', 'General Parties/Gatherings', 'Others'],
    capacity: 350,
  },
   {
    id: 'venue-23',
    name: 'Ridhira Retreat',
    location: 'Hyderabad (North)',
    hallType: 'Party Lawn',
    images: [getImage('v23a'), getImage('v23b')],
    baseCost: 175000,
    bookedDates: [],
    supportedEvents: ['Marriages (Weddings)', 'Sangeeths', 'Birthday Parties', 'Night Parties', 'Others'],
    capacity: 300,
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
    capacity: 600,
  },
  {
    id: 'venue-26',
    name: 'Lohia Convention',
    location: 'Hyderabad (East)',
    hallType: 'Auditorium',
    images: [getImage('lohia1'), getImage('lohia2')],
    baseCost: 290000,
    bookedDates: ['2024-09-20', '2024-09-21'],
    supportedEvents: ['Corporate Events', 'Marriages (Weddings)', 'Sangeeths', 'Others'],
    capacity: 1500,
    previousEvents: [
        'Filmfare Awards South 2022',
        'Star-studded Sangeet for a Bollywood celebrity',
        'International brand activation for a luxury car company'
    ]
  },
  {
    id: 'venue-27',
    name: 'Tatva Convention and Garden',
    location: 'Hyderabad (East)',
    hallType: 'Banquet Hall',
    images: [getImage('tatva1'), getImage('tatva2')],
    baseCost: 95000,
    bookedDates: ['2024-09-15', '2024-09-16'],
    supportedEvents: ['Birthday Parties', 'General Parties/Gatherings', 'Corporate Events', 'Others'],
    capacity: 200,
  },
];
