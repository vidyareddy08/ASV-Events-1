import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
    const img = PlaceHolderImages.find(p => p.id === id);
    if (!img) {
        return 'https://placehold.co/800x450';
    }
    return img.imageUrl;
}

export type Workshop = {
  id: string;
  title: string;
  instructor: string;
  date: string;
  price: number;
  description: string;
  imageUrl: string;
};

export const workshops: Workshop[] = [
  {
    id: 'workshop-01',
    title: 'Street Photography Masterclass',
    instructor: 'Ankit Singh',
    date: '2024-10-22',
    price: 4000,
    description: 'Learn the art of capturing candid moments on the streets of Hyderabad. Suitable for all skill levels.',
    imageUrl: getImage('workshop1'),
  },
  {
    id: 'workshop-02',
    title: 'Abstract Canvas Painting',
    instructor: 'Priya Rao',
    date: '2024-11-12',
    price: 3000,
    description: 'Unleash your creativity with acrylics on canvas. No prior experience needed, all materials provided.',
    imageUrl: getImage('workshop2'),
  },
  {
    id: 'workshop-03',
    title: 'React for Beginners',
    instructor: 'Rohan Verma',
    date: '2024-11-25',
    price: 8000,
    description: 'A week-long immersive coding bootcamp to kickstart your journey into web development with React.',
    imageUrl: getImage('workshop3'),
  },
];
