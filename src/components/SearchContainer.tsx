import React, { useEffect, useState } from "react";
import useDogStore from "../store/dogStore";
import { useStore } from "zustand";
import SearchBar from "./SearchBar";
import DogCard from "./DogCard";

const SearchContainer = () => {
  const { favoriteDogsResults, favoriteDogsIds, favoritesContainerState, dogSearchResults, zipCityState, fetchFavorites } = useStore(useDogStore);

  useEffect(() => {
    fetchFavorites(favoriteDogsIds);
    console.log(favoriteDogsIds)
  }, [favoriteDogsIds])

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
        favorited={favoriteDogsIds.includes(dog.id)}
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
        favorited={favoriteDogsIds.includes(dog.id)}
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
      <div className="card-row-container">
      <SearchBar /> 
        {results}
      </div>
    </div>
    </>
  );
};

export default SearchContainer;