import React, { useEffect, useState } from "react";
import useDogStore from "../store/dogStore";
import { useStore } from "zustand";
import { Card, CardMedia, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';

const SearchContainer = () => {
  const { breedsList, dogSearchResults, fetchBreeds, fetchDogs } = useStore(useDogStore);

  useEffect(() => {
    fetchBreeds();
    fetchDogs({
      breeds: ['Standard Schnauzer'],
      zipCodes: [],
      ageMin: 1,
      ageMax: 6,
      size: 10,
      from: 0,
    });
  }, []);

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
          <p className="card-p-location">{result.zip_code}</p>
        </div>
      </Card>
    );
  }

  return(
    <>
    <div className="search-container">
     {results}
    </div>
    </>
  );
};

export default SearchContainer;