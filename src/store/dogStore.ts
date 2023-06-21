import { create } from 'zustand';
import { DogSearchResult, DogStore, Dog, Location, ZipCityState, CityState } from '../types/types';

const useDogStore = create<DogStore>(set => ({
    breedsList: [],
    dogSearchResults: [],
    zipCityState: <ZipCityState>{},

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
        // Step 1
        try {
          const response = await fetch(url, {
            method: 'GET',
            credentials: 'include'
          });
          const dogsResponse: DogSearchResult = await response.json();
          // Step 2
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
            // Step 3
            const zips = response.map((x: Dog) => x.zip_code);
            console.log(zips)
            try {
            const zipResponse = await fetch('https://frontend-take-home-service.fetch.com/locations', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(zips),
              credentials: 'include',
            });
            const zipResults = await zipResponse.json();
            const zipExtraction = <ZipCityState>{};
            zipResults.forEach((x: Location) => {
                // I found out that some zipcodes, when used in this endpoint, do not return a value, causing errors
                if(x){
                    const key = x.zip_code;
                    zipExtraction[key] = {
                        'city': x.city,
                        'state': x.state
                    }
                }
            });
            set((prevState) => ({
                zipCityState: {
                    ...prevState.zipCityState,
                    ...zipExtraction
                }
            }));
            } catch (error) {
                console.error(error);
            };
          } catch (error) {
            console.error(error);
          };

        } catch (error) {
          console.error(error);
          localStorage.clear();
        };
      }


}));

export default useDogStore;