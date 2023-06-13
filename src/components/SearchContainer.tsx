import React, { useEffect, useState } from "react";
import useDogStore from "../store/dogStore";
import { useStore } from "zustand";

const SearchContainer = () => {
  const { breedsList, searchResults, fetchBreeds, fetchDogs } = useStore(useDogStore);

  useEffect(() => {
    fetchBreeds();
    fetchDogs({
      // breeds: ['Labrador Retriever', 'Standard Poodle'],
      zipCodes: ['10001', '10002'],
    });
  }, []);

  const breedNames = [];
  for(const breed of breedsList){
    breedNames.push(<p key={breed}>{breed}</p>);
  }

  return(
    <>
    {breedNames}
    </>
  );
};

export default SearchContainer;