import React from 'react';
import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Max Schwarz',
      image:
        'https://images.pexels.com/photos/31869535/pexels-photo-31869535.jpeg',
      places: 4,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
