import React, { useState } from "react";
import { TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useStore } from "zustand";
import useDogStore from "../store/dogStore";

const FilterContainer = () => {
  const { breedsList } = useStore(useDogStore);
  const [ selectedBreed, setSelectedbreed ] = useState('');
  const breeds = breedsList.map(x => 
    <MenuItem
      value={x}
      key={x}
      className="input-drowdown-item"
    >
    {x}
    </MenuItem>
    )

  const handleChange = (e : any) => {
    setSelectedbreed(e.target.value);
  }
  return (
    <>
      <div className="filter-container">
        <p className="sub-page-h1">Filter</p>
        <FormControl className="input-dropdown" id="outlined" margin="normal">
          <InputLabel>Breeds</InputLabel>
          <Select
            value={selectedBreed}
            onChange={handleChange}
            label='Breeds'
          >
            {breeds}
          </Select>
        </FormControl>
        <TextField className="input-textfield" id="outlined" label="City" margin="normal"/>
        <TextField className="input-textfield" id="outlined" label="State"  margin="normal"/>
        <TextField className="input-textfield" id="outlined" label="Zip"  margin="normal"/>
        <TextField className="input-textfield" id="outlined" label="Minimum Age"  margin="normal"/>
        <TextField className="input-textfield" id="outlined" label="Maximum Age"  margin="normal"/>
      </div>
    </>
  );
};

export default FilterContainer;