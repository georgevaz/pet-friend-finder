import React, { useEffect, useState } from "react";
import useDogStore from "../store/dogStore";
import { useStore } from "zustand";
import { Card, CardMedia, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchBar from "./SearchBar";
import DogCard from "./DogCard";

const SearchContainer = () => {
  const { dogSearchResults, zipCityState } = useStore(useDogStore);

  const cards = dogSearchResults.map(dog => {
    return(
      <DogCard 
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
      <div className="card-row-container">
      <SearchBar /> 
        {results}
      </div>
    </div>
    </>
  );
};

export default SearchContainer;