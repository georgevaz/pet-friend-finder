import React from "react";
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from "@mui/material";
import { Button } from "@mui/material";

const SearchBar = () =>{
  return (
    <>
    <div className="search-bar-container">
      <IconButton>
        <FavoriteIcon />
      </IconButton>
      <IconButton>
        <FilterAltRoundedIcon />
      </IconButton>
      <Button variant="text" className="button-secondary">
        Sort Breed
        <ArrowDropDownRoundedIcon />
      </Button>
      <IconButton>
        <ArrowDropUpRoundedIcon />
      </IconButton>
    </div>
    </>
  );
};

export default SearchBar;