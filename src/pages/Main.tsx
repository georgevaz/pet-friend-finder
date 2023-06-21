import React,  {useEffect } from "react";
import { useStore } from "zustand";
import useDogStore from "../store/dogStore";
import SearchContainer from "../components/SearchContainer";
import FilterContainer from "../components/FilterContainer";

const Main = () => {
  const { fetchBreeds, fetchDogs } = useStore(useDogStore);

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
  
  return(
    <>
      <div className="main-container">
        <FilterContainer />
        <SearchContainer />
      </div>
    </>
  );
};

export default Main;