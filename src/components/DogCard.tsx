import React, { useEffect, useState } from 'react';
import { Card, CardMedia, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { DogCardProps } from '../types/types';
import { useStore } from 'zustand';
import useDogStore from '../store/dogStore';

const DogCard = ({
  id,
  img,
  name,
  breed,
  age,
  zip,
  city,
  state,
}: DogCardProps) => {
  const {
    favoriteDogsIds,
    favoritesContainerState,
    zipCityState,
    addFavoriteDog,
    removeFavoriteDog,
  } = useStore(useDogStore);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (favoriteDogsIds.includes(id)) setFavorite(true);
  }, [favorite]);

  const handleClickFavorite = () => {
    setFavorite(!favorite);
    !favorite ? addFavoriteDog(id) : removeFavoriteDog(id, favoriteDogsIds);
  };
  return (
    <>
      <Card key={id} className="card-container">
        {favoritesContainerState ? (
          <></>
        ) : (
          <IconButton
            onClick={handleClickFavorite}
            className={favorite ? 'favorite-icon-active' : 'favorite-icon'}>
            <FavoriteIcon />
          </IconButton>
        )}
        <CardMedia
          component="img"
          image={img}
          onClick={() => console.log('ENHANCE')}
        />
        <div className="card-copy-container">
          <p className="card-title">{name}</p>
          <p className="card-p-description">
            {breed}
            <br />
            Age: {age} years
          </p>
          <p className="card-p-location">
            {zipCityState[zip] ? `${city}, ` : 'Zip Code: '}
            {zipCityState[zip] ? state : zip}
          </p>
        </div>
      </Card>
    </>
  );
};

export default DogCard;
