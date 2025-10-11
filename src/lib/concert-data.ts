import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
    const img = PlaceHolderImages.find(p => p.id === id);
    if (!img) {
        return 'https://placehold.co/800x450';
    }
    return img.imageUrl;
}

export type Concert = {
  id: string;
  name: string;
  artist: string;
  date: string;
  price: number;
  imageUrl: string;
  venue: string;
};

export const concerts: Concert[] = [
  {
    id: 'concert-01',
    name: 'Indie Fusion Night',
    artist: 'The Local Train',
    date: '2024-10-15',
    price: 1500,
    imageUrl: getImage('concert1'),
    venue: 'Hi-Tech Convention',
  },
  {
    id: 'concert-02',
    name: 'Rock Fest Hyderabad',
    artist: 'Parikrama & Guests',
    date: '2024-11-05',
    price: 2500,
    imageUrl: getImage('concert2'),
    venue: 'Golkonda Fort Lawns',
  },
  {
    id: 'concert-03',
    name: 'EDM Pulse',
    artist: 'DJ Snake',
    date: '2024-11-20',
    price: 3500,
    imageUrl: getImage('concert3'),
    venue: 'Necklace Road Gardens',
  },
];
