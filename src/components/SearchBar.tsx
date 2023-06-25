import React, { useState } from "react";
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from "@mui/material";
import { Button } from "@mui/material";
import FilterContainer from "../components/FilterContainer";
import Drawer from '@mui/material/Drawer';

type Sort = 'ascend' | 'descend' | 'off';

const SearchBar = () =>{
  const [ drawerState, setDrawerState ] = useState(false);
  const [ favoritesState, setFavoritesState ] = useState(false);
  const [ sortState, setSortState ] = useState({
    'ascend': false,
    'descend': false,
    'off': true,
  });
  
  const toggleDrawer =
    (open: boolean) => () => {
      setDrawerState(open);
    };

  const toggleFavorites =
    (open: boolean) => () => {
      setFavoritesState(!open);
    };

  const toggleSort = (sort: string, next: string) => () => {
    setSortState({
      ...sortState,
      [sort]: false,
      [next]: true,
    });
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
          <IconButton className={favoritesState ? "search-bar-icon-button-active" : "search-bar-icon-button"} onClick={toggleFavorites(favoritesState)}>
            <FavoriteIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default SearchBar;