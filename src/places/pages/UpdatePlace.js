import React from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import './PlaceForm.css';

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
    title: 'Empire State Building',
    description: 'One of the most famous buildings in the world.',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcfLyZjs0XOzpE8v3b4oMey0TScYuo-AqKL2J05Ty5Hg&s=10',
    address: '1018 5th Ave, New York, NY 10028, United States',
    creator: 'u2',
    location: { lat: 40.7484405, lng: -73.9856644 },
  },
];

const UpdatePlace = () => {
  const placeId = useParams().placeId;

  const identifiedPlace = DUMMY_PLACES.find((place) => place.id === placeId);

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Place not found!</h2>
      </div>
    );
  }
  return (
    <form className="place-form">
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={() => {}}
        initialValue={identifiedPlace.title}
        initialValid={true}
      />
      <Input
        id="description"
        element="textarea"
        type="text"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={() => {}}
        initialValue={identifiedPlace.description}
        initialValid={true}
      />
      <Button type="submit" disabled={!true}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
