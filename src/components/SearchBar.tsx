import React, { useState } from "react";
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from "@mui/material";
import { Button } from "@mui/material";
import FilterContainer from "../components/FilterContainer";
import Drawer from '@mui/material/Drawer';

const SearchBar = () =>{
  const [ drawerState, setDrawerState] = useState( false );
  
  const toggleDrawer =
    (open: boolean) => () => {
      setDrawerState( open );
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
      <div className="search-bar-container">
        <Button variant="text" className="button-secondary">
          Sort Breed
          <ArrowDropUpRoundedIcon />
          {/* <ArrowDropDownRoundedIcon /> */}
        </Button>
        <div>
          <IconButton className={drawerState ? "search-bar-icon-button-active" : "search-bar-icon-button"} onClick={toggleDrawer(true)}>
            <FilterAltRoundedIcon />
          </IconButton>
          <IconButton className="search-bar-icon-button">
            <FavoriteIcon/>
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default SearchBar;