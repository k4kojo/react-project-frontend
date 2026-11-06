import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous buildings in the world.',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcfLyZjs0XOzpE8v3b4oMey0TScYuo-AqKL2J05Ty5Hg&s=10',
    address: '1018 5th Ave, New York, NY 10028, United States',
    creator: 'u1',
    location: { lat: 40.7484405, lng: -73.9856644 },
  },
  {
    id: 'p2',
    title: 'Emp. State Building',
    description: 'One of the most famous buildings in the world.',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcfLyZjs0XOzpE8v3b4oMey0TScYuo-AqKL2J05Ty5Hg&s=10',
    address: '1018 5th Ave, New York, NY 10028, United States',
    creator: 'u2',
    location: { lat: 40.7484405, lng: -73.9856644 },
  },
];

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
