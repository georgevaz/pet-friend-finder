import React, { useEffect, useMemo, useState } from 'react';
import useDogStore from '../store/dogStore';
import { useStore } from 'zustand';
import SearchBar from './SearchBar';
import DogCard from './DogCard';
import { IconButton } from '@mui/material';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { Dog, ZipCityState } from '../types/types';
import { map } from 'lodash';

const pupulateCards = (
  arr: Dog[],
  zipCollection: ZipCityState,
): JSX.Element[] => {
  return map(arr, dog => {
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
          zipCollection[dog.zip_code] ? zipCollection[dog.zip_code].city : null
        }
        state={
          zipCollection[dog.zip_code] ? zipCollection[dog.zip_code].state : null
        }
      />
    );
  });
};

interface FavoriteQueries {
  prev: number | null;
  curr: number;
  next: number | null;
}

const SearchContainer = () => {
  const {
    favoriteDogResultsChonked,
    favoriteDogsIds,
    extraQueries,
    favoritesContainerState,
    dogSearchResults,
    zipCityState,
    fetchDogs,
    fetchFavorites,
  } = useStore(useDogStore);

  const [favoriteQueries, setFavoriteQueries] = useState<FavoriteQueries>({
    prev: null,
    curr: 0,
    next: null,
  });
  // TODO
  // Persist page user was on

  useMemo(() => {
    setFavoriteQueries({
      prev: null,
      curr: 0,
      next: favoriteDogResultsChonked[1] ? 1 : null,
    });
  }, [favoriteDogResultsChonked]);

  useEffect(() => {
    if (favoriteDogsIds) fetchFavorites(favoriteDogsIds);
  }, [favoritesContainerState, favoriteDogsIds]);

  const prevFetch = () => {
    fetchDogs({}, undefined, extraQueries['prev']);
  };

  const nextFetch = () => {
    fetchDogs({}, extraQueries['next']);
  };

  const prevFav = () => {
    setFavoriteQueries({
      prev: favoriteDogResultsChonked[favoriteQueries.prev - 1]
        ? favoriteQueries.prev - 1
        : null,
      curr: favoriteQueries.curr - 1,
      next: favoriteQueries.next - 1,
    });
  };

  const nextFav = () => {
    setFavoriteQueries({
      prev: favoriteQueries.prev + 1,
      curr: favoriteQueries.curr + 1,
      next: favoriteDogResultsChonked[favoriteQueries.next + 1]
        ? favoriteQueries.next + 1
        : null,
    });
  };

  const cards = favoritesContainerState
    ? pupulateCards(
        favoriteDogResultsChonked[favoriteQueries.curr],
        zipCityState,
      )
    : pupulateCards(dogSearchResults, zipCityState);

  const results: JSX.Element[] = [];

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
        {favoritesContainerState ? (
          favoriteQueries.prev ? (
            <IconButton className="arrow-icon" onClick={prevFav}>
              <KeyboardArrowLeftRoundedIcon />
            </IconButton>
          ) : (
            <IconButton disabled={true} className="arrow-icon" />
          )
        ) : extraQueries['prev'] ? (
          <IconButton className="arrow-icon" onClick={prevFetch}>
            <KeyboardArrowLeftRoundedIcon />
          </IconButton>
        ) : (
          <IconButton disabled={true} className="arrow-icon" />
        )}
        <div className="card-row-container">{results}</div>
        {favoritesContainerState ? (
          favoriteQueries.next ? (
            <IconButton className="arrow-icon" onClick={nextFav}>
              <KeyboardArrowRightRoundedIcon />
            </IconButton>
          ) : (
            <IconButton disabled={true} className="arrow-icon" />
          )
        ) : extraQueries['next'] && dogSearchResults.length % 8 === 0 ? ( // This is a bandaid solution to the arrow appearing despite the 'next' query containing no results
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
