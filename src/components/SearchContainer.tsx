import React, { useEffect, useState } from "react";
import useDogStore from "../store/dogStore";
import { useStore } from "zustand";
import SearchBar from "./SearchBar";
import DogCard from "./DogCard";
import { Button } from "@mui/material";

const SearchContainer = () => {
  const { favoriteDogsResults, favoriteDogsIds, extraQueries, favoritesContainerState, dogSearchResults, zipCityState, fetchDogs, fetchFavorites } = useStore(useDogStore);
  useEffect(() => {
    if(favoriteDogsIds[0]) fetchFavorites(favoriteDogsIds);
  }, [favoriteDogsIds])

  const prevFetch = () => {
    fetchDogs({}, undefined, extraQueries['prev'])
  };

  const nextFetch = () => {
    fetchDogs({}, extraQueries['next'])
  };


  const cards = favoritesContainerState
  ?
  favoriteDogsResults.map(dog => {
    return(
      <DogCard
        key={dog.id}
        id={dog.id}
        img={dog.img}
        name={dog.name}
        breed={dog.breed}
        age={dog.age}
        zip={dog.zip_code}
        city={zipCityState[dog.zip_code] ? zipCityState[dog.zip_code].city : null}
        state={zipCityState[dog.zip_code] ? zipCityState[dog.zip_code].state : null}
      />
    );
  })
  :
  dogSearchResults.map(dog => {
    return(
      <DogCard
        key={dog.id}
        id={dog.id}
        img={dog.img}
        name={dog.name}
        breed={dog.breed}
        age={dog.age}
        zip={dog.zip_code}
        city={zipCityState[dog.zip_code] ? zipCityState[dog.zip_code].city : null}
        state={zipCityState[dog.zip_code] ? zipCityState[dog.zip_code].state : null}
      />
    );
  });

  const results: React.ReactNode[] = [];
  cards.forEach((card, index) => {
    if(index % 4 === 0 || index === 0){
      results.push(
        <div className="card-row" key={index}>
          {cards.slice(index, index + 4)}
        </div>
      );
    };
  });

  return(
    <>
    <div className="search-container">
      <SearchBar /> 
      <div className="card-row-container">
        <Button onClick={prevFetch}>Prev</Button>
        {results}
        <Button onClick={nextFetch}>next</Button>
      </div>
    </div>
    </>
  );
};

export default SearchContainer;