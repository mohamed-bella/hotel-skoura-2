// Mock API for room data

interface Room {
  id: string;
  name: string;
  description: string;
  image: string;
  capacity: number;
  beds: number;
  price: number;
  features: string[];
}

const rooms: Record<string, Room> = {
  'double-room': {
    id: 'double-room',
    name: 'Double Room',
    description: 'Elegant and comfortable rooms for couples, featuring modern amenities and stylish décor.',
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
    capacity: 2,
    beds: 1,
    price: 120,
    features: ['Free WiFi', 'Air Conditioning', 'Premium Bedding', 'Private Bathroom']
  },
  'twin-room': {
    id: 'twin-room',
    name: 'Twin Room',
    description: 'Spacious rooms with twin beds, perfect for friends or family members traveling together.',
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
    capacity: 2,
    beds: 2,
    price: 140,
    features: ['Free WiFi', 'Air Conditioning', 'Premium Bedding', 'Private Bathroom']
  },
  'triple-room': {
    id: 'triple-room',
    name: 'Triple Room',
    description: 'Generous accommodations for up to three guests, offering comfort and luxury in every detail.',
    image: 'https://images.pexels.com/photos/3634741/pexels-photo-3634741.jpeg',
    capacity: 3,
    beds: 2,
    price: 170,
    features: ['Free WiFi', 'Air Conditioning', 'Premium Bedding', 'Private Bathroom']
  },
  'quadruple-room': {
    id: 'quadruple-room',
    name: 'Quadruple Room',
    description: 'Expansive rooms designed for groups or families, providing ample space and premium amenities.',
    image: 'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg',
    capacity: 4,
    beds: 2,
    price: 210,
    features: ['Free WiFi', 'Air Conditioning', 'Premium Bedding', 'Private Bathroom']
  }
};

export async function getRoomDetails(id: string): Promise<Room | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return rooms[id] || null;
}

export async function getAllRooms(): Promise<Room[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return Object.values(rooms);
}