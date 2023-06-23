import React,  {useEffect } from "react";
import { useStore } from "zustand";
import useDogStore from "../store/dogStore";
import SearchContainer from "../components/SearchContainer";
import FilterContainer from "../components/FilterContainer";

const Main = () => {
  const { fetchBreeds } = useStore(useDogStore);

  useEffect(() => {
    fetchBreeds();
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