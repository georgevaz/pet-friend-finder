import { create } from 'zustand';
import {
  DogSearch,
  DogStore,
  Dog,
  Location,
  ZipCityState,
  Match,
} from '../types/types';

const zipping = (zipResults: Location[]): ZipCityState => {
  const zipExtraction = <ZipCityState>{};
  zipResults.forEach((zip: Location) => {
    // I found out that some zipcodes, when used in this endpoint, do not return a value, causing errors
    if (zip) {
      const key = zip.zip_code;
      zipExtraction[key] = {
        city: zip.city,
        state: zip.state,
      };
    }
  });
  return zipExtraction;
};

const idToDog = (
  ids: DogSearch['resultIds'] | Dog['id'][],
): Promise<Response> => {
  return fetch('https://frontend-take-home-service.fetch.com/dogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ids),
    credentials: 'include',
  });
};

const useDogStore = create<DogStore>(set => ({
  breedsList: [],
  dogSearchResults: [],
  extraQueries: {
    next: null,
    prev: null,
  },
  zipCityState: <ZipCityState>{},
  zips: [],
  sortState: {
    ascend: true,
    descend: false,
    off: false,
  },
  favoriteDogsIds: [],
  favoriteDogsResults: [],
  favoritesContainerState: false,
  matchedDog: {
    match: '',
  },

  fetchBreeds: async () => {
    try {
      const response = await fetch(
        'https://frontend-take-home-service.fetch.com/dogs/breeds',
        {
          method: 'GET',
          credentials: 'include',
        },
      );
      const breedsResponse = await response.json();
      set({
        breedsList: breedsResponse,
      });
    } catch (error) {
      console.error(error);
    }
  },

  fetchDogs: async (params, next?, prev?) => {
    let url = 'https://frontend-take-home-service.fetch.com';
    if (next) url += next;
    else if (prev) url += prev;
    else {
      let queryString = '';
      for (const [key, value] of Object.entries(params)) {
        if (Array.isArray(value))
          value.forEach(val => (queryString += `${key}[]=${val}&`));
        else if (value) queryString += `${key}=${value}&`;
      }
      const baseUrl =
        'https://frontend-take-home-service.fetch.com/dogs/search';
      url = `${baseUrl}${queryString ? `?${queryString}` : ''}`;
    }

    // Step 1
    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
      });
      const dogsResponse: DogSearch = await response.json();
      set({
        extraQueries: {
          next: dogsResponse['next'],
          prev: dogsResponse['prev'],
        },
      });
      // Step 2
      try {
        const fetchResponse = await idToDog(dogsResponse.resultIds);
        const response = await fetchResponse.json();

        // Step 3
        const zips = response.map((dogs: Dog) => dogs.zip_code);
        try {
          const zipResponse = await fetch(
            'https://frontend-take-home-service.fetch.com/locations',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(zips),
              credentials: 'include',
            },
          );

          const zipResults: Location[] = await zipResponse.json();
          set(prevState => ({
            zipCityState: {
              ...prevState.zipCityState,
              ...zipping(zipResults),
            },
          }));

          // Storing our results after we find and store zip information for proper rendering purposes.
          set({
            dogSearchResults: response,
          });
        } catch (error) {
          console.error(error);
        }
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
  },

  fetchLocations: async params => {
    try {
      const fetchResponse = await fetch(
        'https://frontend-take-home-service.fetch.com/locations/search',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
          credentials: 'include',
        },
      );
      const response = await fetchResponse.json();
      const zipExtraction = zipping(response.results);
      set(prevState => ({
        zipCityState: {
          ...prevState.zipCityState,
          ...zipExtraction,
        },
      }));
      set({
        zips: Object.keys(zipExtraction),
      });
    } catch (error) {
      console.error(error);
    }
  },

  resetZips: () => {
    set({
      zips: [],
    });
  },

  setSortState: (sort, next) => {
    set(prevState => ({
      sortState: {
        ...prevState.sortState,
        [sort]: false,
        [next]: true,
      },
    }));
  },

  addFavoriteDog: id => {
    set(prevState => ({
      favoriteDogsIds: [...prevState.favoriteDogsIds, id],
    }));
  },

  removeFavoriteDog: (id, favoriteDogs) => {
    const index = favoriteDogs.indexOf(id);
    const copy = [...favoriteDogs];
    if (index > -1) copy.splice(index, 1);
    set({
      favoriteDogsIds: copy,
    });
  },

  fetchFavorites: async favoriteDogs => {
    const fetchResponse = await idToDog(favoriteDogs);
    const response = await fetchResponse.json();
    set({
      favoriteDogsResults: response,
    });
  },

  toggleFavoritesContainer: () => {
    set(prevState => ({
      favoritesContainerState: !prevState.favoritesContainerState,
    }));
  },

  fetchMatch: async favoriteDogsIds => {
    try {
      const fetchResponse = await fetch(
        'https://frontend-take-home-service.fetch.com/dogs/match',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(favoriteDogsIds),
          credentials: 'include',
        },
      );
      const match: Match = await fetchResponse.json();
      set({
        matchedDog: match,
      });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useDogStore;
