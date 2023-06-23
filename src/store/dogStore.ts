import { create } from 'zustand';
import { DogSearchResult, DogStore, Dog, Location, ZipCityState } from '../types/types';

const zipping = (zipResults: Location[]) => {
  const zipExtraction = <ZipCityState>{};
  zipResults.forEach((zip: Location) => {
      // I found out that some zipcodes, when used in this endpoint, do not return a value, causing errors
      if(zip){
          const key = zip.zip_code;
          zipExtraction[key] = {
              'city': zip.city,
              'state': zip.state
          }
      }
  });
  return zipExtraction;
}

const useDogStore = create<DogStore>(set => ({
    breedsList: [],
    dogSearchResults: [],
    zipCityState: <ZipCityState>{},
    zips: [],

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
            const zips = response.map((dogs: Dog) => dogs.zip_code);
            try {
              const zipResponse = await fetch('https://frontend-take-home-service.fetch.com/locations', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(zips),
                credentials: 'include',
              });
              const zipResults: Location[] = await zipResponse.json();
              set((prevState) => ({
                  zipCityState: {
                      ...prevState.zipCityState,
                      ...zipping(zipResults)
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
      },
      fetchLocations: async (params) => {
        try {
          const fetchResponse = await fetch('https://frontend-take-home-service.fetch.com/locations/search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
            credentials: 'include',
          });
          const response = await fetchResponse.json();
          const zipExtraction = zipping(response.results)
          set((prevState) => ({
            zipCityState: {
                ...prevState.zipCityState,
                ...zipExtraction
            }
          }));
          set(() => ({
            zips: Object.keys(zipExtraction),
          }));
        } catch (error) {
          console.error(error);
        };
      },

      resetZips: () =>{
        set(() => ({
          zips: [],
        }));
      }
}));

export default useDogStore;