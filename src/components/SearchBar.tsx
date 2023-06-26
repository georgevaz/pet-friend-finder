import React, { useEffect, useState } from "react";
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from "@mui/material";
import { Button } from "@mui/material";
import FilterContainer from "../components/FilterContainer";
import Drawer from '@mui/material/Drawer';
import { Sort } from "../types/types";
import { useStore } from "zustand";
import useDogStore from "../store/dogStore";


const SearchBar = () => {
  const { favoritesContainerState, sortState, setSortState, toggleFavoritesContainer } = useStore(useDogStore);
  const [ drawerState, setDrawerState ] = useState(false);

  const toggleDrawer =
    (open: boolean) => () => {
      setDrawerState(open);
    };

  const toggleFavorites = () => {
      toggleFavoritesContainer();
    };

  const toggleSort = 
    (sort: Sort, next: Sort) => () => {
      setSortState(sort, next);
    };

  return (
    <>
      <Drawer
        anchor={'left'}
        open={drawerState}
        onClose={toggleDrawer(false)}
        keepMounted={true}
      >
        <FilterContainer />
      </Drawer>
      <div className="search-bar-container">{
        sortState['off'] ? 
          <Button variant="text" className="button-secondary" onClick={toggleSort('off', 'ascend')}>
            Sort Breed
            <ArrowDropUpRoundedIcon />
          </Button> 
        :
          sortState['ascend'] ?
            <Button variant="text" className="button-secondary-active" onClick={toggleSort('ascend', 'descend')}>
              Sort Breed
              <ArrowDropUpRoundedIcon />
            </Button> 
          :
            <Button variant="text" className="button-secondary-active" onClick={toggleSort('descend', 'off')}>
              Sort Breed
              <ArrowDropDownRoundedIcon />
            </Button> 
      }

        <div>
          <IconButton className={drawerState ? "search-bar-icon-button-active" : "search-bar-icon-button"} onClick={toggleDrawer(true)}>
            <FilterAltRoundedIcon />
          </IconButton>
          <IconButton className={favoritesContainerState ? "search-bar-icon-button-active" : "search-bar-icon-button"} onClick={toggleFavorites}>
            <FavoriteIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default SearchBar;