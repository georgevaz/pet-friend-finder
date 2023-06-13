import { create } from 'zustand';
import { DogStore } from '../types/types';

const useDogStore = create<DogStore>(set => ({
    breedsList: [],
    searchResults: {},

    fetchBreeds: async () => {
        try {
          const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
            method: 'GET',
            credentials: 'include'
          });
          const breedsResponse = await response.json();
          set({
            breedsList: breedsResponse,
          })
        } catch (error) {
          console.error(error);
        }
    },
    fetchDogs: async (params) => {
        let queryString = '';
        for(const [key, value] of Object.entries(params)){
            //breeds[]=Lhasa&breeds[]=Affenpinscher
            if(Array.isArray(value)){
                value.forEach(val => queryString += `${key}[]=${val}&`)
            }

        }
        // queryString += `breeds=${breeds.join(',')}&sort=name:asc`;
        const baseUrl = 'https://frontend-take-home-service.fetch.com/dogs/search';
        const url = `${baseUrl}${queryString ? `?${queryString}` : ''}`;
        try {
          const response = await fetch(url, {
            method: 'GET',
            credentials: 'include'
          });
          const dogsResponse = await response.json();
          set({
            searchResults: dogsResponse,
          })
          console.log(dogsResponse)
        } catch (error) {
          console.error(error);
        }
      }


}));

export default useDogStore;