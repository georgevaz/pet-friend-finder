import { create } from 'zustand';
import { DogSearchResult, DogStore } from '../types/types';

const useDogStore = create<DogStore>(set => ({
    breedsList: [],
    dogSearchResults: [],

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
            if(Array.isArray(value)) value.forEach(val => queryString += `${key}[]=${val}&`);
            else queryString += `${key}=${value}&`
        }
        const baseUrl = 'https://frontend-take-home-service.fetch.com/dogs/search';
        const url = `${baseUrl}${queryString ? `?${queryString}` : ''}`;
        try {
          const response = await fetch(url, {
            method: 'GET',
            credentials: 'include'
          });
          const dogsResponse: DogSearchResult = await response.json();

          try {
            const fetchResponse = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(dogsResponse.resultIds),
              credentials: 'include',
            });
            const response = await fetchResponse.json();
            set({
                dogSearchResults: response
            })
          } catch (error) {
            console.error(error);
          }
        } catch (error) {
          console.error(error);
        }
      }


}));

export default useDogStore;