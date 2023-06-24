import React,  {useEffect } from "react";
import { useStore } from "zustand";
import useDogStore from "../store/dogStore";
import SearchContainer from "../components/SearchContainer";
import FilterContainer from "../components/FilterContainer";
import Drawer from '@mui/material/Drawer';

import Button from '@mui/material/Button';

const Main = () => {
  const { fetchBreeds, fetchDogs } = useStore(useDogStore);
  const [ drawerState, setDrawerState] = React.useState( false );

  useEffect(() => {
    fetchBreeds();
    fetchDogs({
      breeds: [],
      zipCodes: [], // If user empties out the zip input, it passes a query param of [] as oppose to ['']
      size: 8,
      sort: 'breed:asc'
    });
  }, []);
  
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      setDrawerState( open );
    };

  return(
    <>
    <div>
    <Button onClick={toggleDrawer(true)}>{'left'}</Button>
          <Drawer
            anchor={'left'}
            open={drawerState}
            onClose={toggleDrawer(false)}
            keepMounted={true}
          >
            <FilterContainer />
          </Drawer>
    </div>
      <div className="main-container">
        <SearchContainer />
      </div>
    </>
  );
};

export default Main;