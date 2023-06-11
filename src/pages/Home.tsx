import React from "react";
import { useStore } from "zustand";
import useDataStore from "../store/store";
import SearchContainer from "../components/SearchContainer";

const Home = () => {
  const { isLoggedIn, setLoggedIn } = useStore(useDataStore);

  const handleLogout = async () => {
    try {
      const fetchResponse = await fetch('https://frontend-take-home-service.fetch.com/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      const status = await fetchResponse.status;
      if (status === 200 ){
        setLoggedIn(false);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return(
    <>
      <p>Home</p>
      {isLoggedIn ? 
        <>
          <p>hello!</p>
          <button onClick={() => handleLogout()}>Logout</button>
          <SearchContainer/>
        </>
        
        : <></>}
    </>
  );
};

export default Home;