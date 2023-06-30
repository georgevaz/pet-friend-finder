import React, { useEffect } from 'react';
import useDogStore from '../store/dogStore';
import { useStore } from 'zustand';
import SearchBar from './SearchBar';
import DogCard from './DogCard';
import { IconButton } from '@mui/material';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

const SearchContainer = () => {
  const {
    favoriteDogsResults,
    favoriteDogsIds,
    extraQueries,
    favoritesContainerState,
    dogSearchResults,
    zipCityState,
    fetchDogs,
    fetchFavorites,
  } = useStore(useDogStore);

  useEffect(() => {
    if (favoriteDogsIds[0]) fetchFavorites(favoriteDogsIds);
  }, [favoritesContainerState, favoriteDogsIds]);

  const prevFetch = () => {
    fetchDogs({}, undefined, extraQueries['prev']);
  };

  const nextFetch = () => {
    fetchDogs({}, extraQueries['next']);
  };

  const cards = favoritesContainerState
    ? favoriteDogsResults.map(dog => {
        return (
          <DogCard
            key={dog.id}
            id={dog.id}
            img={dog.img}
            name={dog.name}
            breed={dog.breed}
            age={dog.age}
            zip={dog.zip_code}
            city={
              zipCityState[dog.zip_code]
                ? zipCityState[dog.zip_code].city
                : null
            }
            state={
              zipCityState[dog.zip_code]
                ? zipCityState[dog.zip_code].state
                : null
            }
          />
        );
      })
    : dogSearchResults.map(dog => {
        return (
          <DogCard
            key={dog.id}
            id={dog.id}
            img={dog.img}
            name={dog.name}
            breed={dog.breed}
            age={dog.age}
            zip={dog.zip_code}
            city={
              zipCityState[dog.zip_code]
                ? zipCityState[dog.zip_code].city
                : null
            }
            state={
              zipCityState[dog.zip_code]
                ? zipCityState[dog.zip_code].state
                : null
            }
          />
        );
      });

  const results: React.ReactNode[] = [];
  cards.forEach((card, index) => {
    if (index % 4 === 0 || index === 0) {
      results.push(
        <div className="card-row" key={index}>
          {cards.slice(index, index + 4)}
        </div>,
      );
    }
  });

  return (
    <>
      <SearchBar />
      <div className="search-container">
        {extraQueries['prev'] ? (
          <IconButton className="arrow-icon" onClick={prevFetch}>
            <KeyboardArrowLeftRoundedIcon />
          </IconButton>
        ) : (
          <IconButton disabled={true} className="arrow-icon" />
        )}
        <div className="card-row-container">{results}</div>
        {extraQueries['next'] && dogSearchResults.length % 8 === 0 ? ( // This is a bandaid solution to the arrow appearing despite the 'next' query containing no results
          <IconButton className="arrow-icon" onClick={nextFetch}>
            <KeyboardArrowRightRoundedIcon />
          </IconButton>
        ) : (
          <IconButton disabled={true} className="arrow-icon" />
        )}
      </div>
    </>
  );
};

export default SearchContainer;
