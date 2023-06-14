import React, { useEffect, useState } from "react";
import useDogStore from "../store/dogStore";
import { useStore } from "zustand";
import { Card, CardMedia } from "@mui/material";

const SearchContainer = () => {
  const { breedsList, dogSearchResults, fetchBreeds, fetchDogs } = useStore(useDogStore);

  useEffect(() => {
    fetchBreeds();
    fetchDogs({
      breeds: ['Labrador Retriever', 'Standard Poodle'],
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
      <Card key={result.id} sx={{ maxWidth: 345, margin:  5, }}>
        <CardMedia
          component='img'
          height='auto'
          image={result.img}
          />
          <p>{result.name}</p>
          <p>{result.age}</p>
          <p>{result.zip_code}</p>
          <p>{result.breed}</p>
      </Card>
    );
  }

  return(
    <>
    {results}
    </>
  );
};

export default SearchContainer;