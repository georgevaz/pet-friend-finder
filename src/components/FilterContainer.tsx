import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useStore } from "zustand";
import useDogStore from "../store/dogStore";
import { Label } from "@mui/icons-material";

const FilterContainer = () => {
  const { breedsList, fetchDogs } = useStore(useDogStore);
  const [ selectedBreed, setSelectedbreed ] = useState('');

  useEffect(() => {
    fetchDogs({
      breeds: [selectedBreed],
    })
  }, [selectedBreed])
  
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
        <FormControl className="input-dropdown" margin="normal">
          <InputLabel>Breeds</InputLabel>
          <Select
            value={selectedBreed}
            onChange={handleChange}
            label='Breeds'
          >
            {breeds}
          </Select>
        </FormControl>
        <TextField className="input-textfield" label="City" margin="normal"/>
        <TextField className="input-textfield" label="State"  margin="normal"/>
        <TextField className="input-textfield" label="Zip"  margin="normal"/>
        <TextField className="input-textfield" label="Minimum Age"  margin="normal"/>
        <TextField className="input-textfield" label="Maximum Age"  margin="normal"/>
      </div>
    </>
  );
};

export default FilterContainer;