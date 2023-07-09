import React, { useEffect } from 'react';
import { useStore } from 'zustand';
import useDogStore from '../store/dogStore';
import SearchContainer from '../components/SearchContainer';
import useUserStore from '../store/userStore';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const { fetchBreeds, fetchDogs } = useStore(useDogStore);
  const { isLoggedIn } = useStore(useUserStore);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate('/login');
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
