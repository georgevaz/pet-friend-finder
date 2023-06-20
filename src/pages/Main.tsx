import React from "react";
import SearchContainer from "../components/SearchContainer";
import FilterContainer from "../components/FilterContainer";

const Main = () => {
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