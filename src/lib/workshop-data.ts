
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
  {
    id: 'workshop-04',
    title: 'Pottery Making Basics',
    instructor: 'Sunita Kumar',
    date: '2024-10-28',
    price: 2500,
    description: 'Get your hands dirty and learn the basics of wheel-thrown pottery. Create your own cups and bowls.',
    imageUrl: getImage('workshop4'),
  },
  {
    id: 'workshop-05',
    title: 'Digital Marketing Crash Course',
    instructor: 'Vikram Reddy',
    date: '2024-11-08',
    price: 5000,
    description: 'Learn the fundamentals of SEO, SEM, and social media marketing to grow your business online.',
    imageUrl: getImage('workshop5'),
  },
  {
    id: 'workshop-06',
    title: 'Introduction to AI & Machine Learning',
    instructor: 'Dr. Alisha Khan',
    date: '2024-12-02',
    price: 9500,
    description: 'A beginner-friendly introduction to the concepts of AI and Machine Learning with hands-on examples.',
    imageUrl: getImage('workshop6'),
  },
  {
    id: 'workshop-07',
    title: 'Creative Writing & Storytelling',
    instructor: 'Sameer Joshi',
    date: '2024-11-18',
    price: 3500,
    description: 'Find your voice and learn the techniques of crafting compelling stories and narratives.',
    imageUrl: getImage('workshop7'),
  },
  {
    id: 'workshop-08',
    title: 'Gourmet Baking & Pastry',
    instructor: 'Chef Meher',
    date: '2024-12-10',
    price: 6000,
    description: 'Master the art of making artisanal bread, croissants, and delicious pastries from scratch.',
    imageUrl: getImage('workshop8'),
  },
];
