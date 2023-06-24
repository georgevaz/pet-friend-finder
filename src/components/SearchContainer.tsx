import React, { useEffect, useState } from "react";
import useDogStore from "../store/dogStore";
import { useStore } from "zustand";
import { Card, CardMedia, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchBar from "./SearchBar";

const SearchContainer = () => {
  const { dogSearchResults, zipCityState } = useStore(useDogStore);

  const cards = dogSearchResults.map(dog => {
    return(
      <Card key={dog.id} className='card-container'>
        <IconButton onClick={() => console.log('yo')}>
          <FavoriteIcon/>
        </IconButton>
        <CardMedia
          component='img'
          image={dog.img}
          onClick={() => console.log('ENHANCE')}
          />
        <div className='card-copy-container'>
          <p className="card-title">{dog.name}</p>
          <p className="card-p-description">
            {dog.breed}
            <br/>
            Age: {dog.age} years
          </p>
          <p className="card-p-location">{zipCityState[dog.zip_code] ? `${zipCityState[dog.zip_code].city}, ` : 'Zip Code: '}{zipCityState[dog.zip_code] ? zipCityState[dog.zip_code].state : dog.zip_code}</p>
        </div>
      </Card>
    )
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