import React, { useEffect, useState } from "react";

const SearchContainer = () => {
  const [ breeds, setBreeds ] = useState([]);
  const [ dogs, setDogs ] = useState({});

  const fetchBreeds = async () => {
    try {
      const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
        method: 'GET',
        credentials: 'include'
      });
      const breedsResponse = await response.json();
      setBreeds(breedsResponse);
    } catch (error) {
      console.error(error);
    }
  }
  const fetchDogs = async () => {
    const breeds = ['Affenpinscher', 'Afghan Hound'];
    let queryString = '?';
    queryString += `breeds=${breeds.join(',')}`;
    const baseUrl = 'https://frontend-take-home-service.fetch.com/dogs/search';
    const url = `${baseUrl}?${queryString}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include'
      });
      const dogsResponse = await response.json();
      setDogs(dogsResponse);
      console.log(dogsResponse)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchBreeds();
    fetchDogs();
  }, []);

  const breedNames = [];
  for(const breed of breeds){
    breedNames.push(<p>{breed}</p>);
  }

  return(
    <>
    {breedNames}
    </>
  );
};

export default SearchContainer;