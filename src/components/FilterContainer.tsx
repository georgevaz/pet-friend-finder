import React, { useEffect, useState, FocusEvent } from "react";
import { TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useStore } from "zustand";
import useDogStore from "../store/dogStore";


const FilterContainer = () => {
  const { breedsList, fetchDogs } = useStore(useDogStore);
  const [ selectedBreed, setSelectedBreed ] = useState<string[]>(['Standard Schnauzer']);
  const [ zip, setZip ] = useState<string[]>([])
  const [ zipNum, setZipNum ] = useState<string>('')
  const [ ageMin, setAgeMin ] = useState<string>('')
  const [ ageMinNum, setAgeMinNum ] = useState<string>('')
  const [ ageMax, setAgeMax ] = useState<string>('')
  const [ ageMaxNum, setAgeMaxNum ] = useState<string>('')

  useEffect(() => {
    fetchDogs({
      breeds: selectedBreed,
      zipCodes: zip[0] ? zip : [], // If user empties out the zip input, it passes a query param of [] as oppose to ['']
      ageMin,
      ageMax,
    });
  }, [selectedBreed, ageMin, ageMax, zip])
  
  const breeds = breedsList.map(x => 
    <MenuItem
      value={x}
      key={x}
      className="input-drowdown-item"
    >
    {x}
    </MenuItem>
    )

  const handleDropdownChange = (e: SelectChangeEvent<typeof selectedBreed>) => {
    setSelectedBreed(
      // On autofill we get a stringified value.
      typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value,
    );
  };
  
  const onUnfocusZip = (e: FocusEvent<HTMLInputElement>) => {
    setZip(
      // On autofill we get a stringified value.
      typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value,
    );
  };

  const onChangeZip = (e: FocusEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b]+$/;
    if ((e.target.value === "" || regex.test(e.target.value))) {
      setZipNum(e.target.value);
    }
  };

  const onUnfocusMinAge = (e: FocusEvent<HTMLInputElement>) => {
    setAgeMin(e.target.value);
  };

  const onChangeMinAge = (e: FocusEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setAgeMinNum(e.target.value);
    }
  };
  
  const onUnfocusMaxAge = (e: FocusEvent<HTMLInputElement>) => {
    setAgeMax(e.target.value);
  };
  
  const onChangeMaxAge = (e: FocusEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setAgeMaxNum(e.target.value);
    }
  };

  return (
    <>
      <div className="filter-container">
        <p className="sub-page-h1">Filter</p>
        <FormControl className="input-dropdown" margin="normal">
          <InputLabel>Breeds</InputLabel>
          <Select
            multiple
            value={selectedBreed}
            onChange={handleDropdownChange}
            label='Breeds'
          >
            {breeds}
          </Select>
        </FormControl>
        <TextField className="input-textfield" label="City" margin="normal"/>
        <TextField className="input-textfield" label="State"  margin="normal"/>
        <TextField className="input-textfield" label="Zip"  margin="normal" value={zipNum} onBlur={onUnfocusZip} onChange={onChangeZip}/>
        <TextField className="input-textfield" label="Minimum Age" margin="normal" value={ageMinNum} onBlur={onUnfocusMinAge} onChange={onChangeMinAge}/>
        <TextField className="input-textfield" label="Maximum Age" margin="normal" value={ageMaxNum} onBlur={onUnfocusMaxAge} onChange={onChangeMaxAge}/>
      </div>
    </>
  );
};

export default FilterContainer;