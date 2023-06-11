import React from "react";
import { useStore } from "zustand";
import useDataStore from "../store/store";

const Home = () => {
  const { isLoggedIn } = useStore(useDataStore);

  return(
    <>
      <p>Home</p>
      {isLoggedIn ? <p>hello!</p>: <></>}
    </>
  );
};

export default Home;