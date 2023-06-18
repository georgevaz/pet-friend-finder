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
      breeds: [],
      zipCodes: [],
      ageMin: 1,
      ageMax: 6,
      size: 100,
      from: 0,
    });
  }, []);

  const results = [];
  for(const result of dogSearchResults){
    results.push(
      <Card key={result.id} className='card-container' sx={{ maxWidth: 345, margin:  5, }}>
        <IconButton onClick={() => console.log('yo')}>
          <FavoriteIcon/>
        </IconButton>
        <CardMedia
          component='img'
          // height='auto'
          image={result.img}
          />
          <div className='card-copy-container'>
            <div className="title-location-container">
              <p className="card-title">{result.name}</p>
              <p className="card-p-location">{result.zip_code}</p>
            </div>
            <p className="card-sub-title">{result.breed}</p>
            <p className="card-p-description">Age: {result.age}</p>
          </div>
      </Card>
    );
  }

  return(
    <>
    <div>
     {results}
    </div>
    </>
  );
};

export default SearchContainer;