import React, { useEffect, useState } from "react";
import useDogStore from "../store/dogStore";
import { useStore } from "zustand";
import { Card, CardMedia, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';

const SearchContainer = () => {
  const { dogSearchResults, zipCityState } = useStore(useDogStore);

  const results = [];
  for(const result of dogSearchResults){
    results.push(
      <Card key={result.id} className='card-container'>
        <IconButton onClick={() => console.log('yo')}>
          <FavoriteIcon/>
        </IconButton>
        <CardMedia
          component='img'
          image={result.img}
          onClick={() => console.log('ENHANCE')}
          />
        <div className='card-copy-container'>
          <p className="card-title">{result.name}</p>
          <p className="card-p-description">
            {result.breed}
            <br/>
            Age: {result.age} years
          </p>
          <p className="card-p-location">{zipCityState[result.zip_code] ? `${zipCityState[result.zip_code].city}, ` : 'Zip Code: '}{zipCityState[result.zip_code] ? zipCityState[result.zip_code].state : result.zip_code}</p>
        </div>
      </Card>
    );
  };

  return(
    <>
    <div className="search-container">
     {results}
    </div>
    </>
  );
};

export default SearchContainer;