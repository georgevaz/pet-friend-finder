import React, { useEffect } from 'react';
import { useStore } from 'zustand';
import useDogStore from '../store/dogStore';
import SearchContainer from '../components/SearchContainer';

// TODO
// Check Cookie status, redirect user, if not authorized, from /main to /login

const Main = () => {
  const { fetchBreeds, fetchDogs } = useStore(useDogStore);

  useEffect(() => {
    fetchBreeds();
    fetchDogs({
      breeds: [],
      zipCodes: [], // If user empties out the zip input, it passes a query param of [] as oppose to ['']
      size: 8,
      sort: 'breed:asc',
    });
  }, []);

  return (
    <>
      <div className="main-container">
        <SearchContainer />
      </div>
    </>
  );
};

export default Main;
