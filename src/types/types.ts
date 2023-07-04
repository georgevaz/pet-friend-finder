// returned objects
interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

interface Match {
  match: string;
}

type DogSearch = {
  resultIds: Dog['id'][];
  total: number;
  next?: string;
  prev?: string;
};

// search params
type DogSearchParams = {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: string;
  ageMax?: string;
  size?: number;
  from?: string;
  sort?: string;
};

type LocationSearchParams = {
  city?: string | undefined;
  states?: string[] | undefined[];
  geoBoundingBox?: GeoBoundingBox;
  size?: number;
  from?: string;
};

interface ZipCityState {
  [key: string]: CityState;
}

interface CityState {
  city: string;
  state: string;
}

interface GeoBoundingBox {
  top?: LatLon;
  left?: LatLon;
  bottom?: LatLon;
  right?: LatLon;
}

type LatLon = {
  lat: number;
  lon: number;
};

type DogCardProps = {
  id: string;
  img: string;
  name: string;
  breed: string;
  age: number;
  zip: string;
  city: string | null;
  state: string | null;
};

type Sort = 'ascend' | 'descend' | 'off';

// store interfaces
interface UserStore {
  name: string;
  email: string;

  setName: (data: string) => void;
  setEmail: (data: string) => void;

  isLoggedIn: boolean;
  setLoggedIn: (isLoggedIn: boolean) => void;
}

interface DogStore {
  breedsList: Dog['breed'][];
  dogSearchResults: Dog[];
  extraQueries: {
    next?: DogSearch['next'];
    prev?: DogSearch['prev'];
  };
  zipCityState: ZipCityState;
  zips: string[];
  sortState: {
    [key in Sort]: boolean;
  };
  favoriteDogsIds: Dog['id'][];
  favoriteDogsResults: Dog[];
  favoriteDogResultsChonked: Dog[][];
  favoritesContainerState: boolean;
  matchedDog: Dog | null;

  fetchBreeds: () => void;
  fetchDogs: (
    params: DogSearchParams,
    next?: DogSearch['next'],
    prev?: DogSearch['prev'],
  ) => void;
  fetchLocations: (params: LocationSearchParams) => void;
  resetZips: () => void;
  setSortState: (sort: Sort, next: Sort) => void;
  addFavoriteDog: (id: Dog['id']) => void;
  removeFavoriteDog: (id: Dog['id']) => void;
  fetchFavorites: (id: Dog['id'][]) => void;
  toggleFavoritesContainer: () => void;
  fetchMatch: () => void;
}

export type {
  Dog,
  Location,
  Match,
  DogSearch,
  DogSearchParams,
  ZipCityState,
  DogCardProps,
  Sort,
  UserStore,
  DogStore,
};
