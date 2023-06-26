interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
};

interface Location {
    zip_code: string
    latitude: number
    longitude: number
    city: string
    state: string
    county: string
};

interface UserStore {
    name: string;
    email: string;
    
    setName: (data: string) => void;
    setEmail: (data: string) => void;
    
    isLoggedIn: boolean;
    setLoggedIn: (isLoggedIn: boolean) => void;
};

interface ZipCityState {
    [key: string]: CityState
};

interface CityState {
    city: string
    state: string
};

interface GeoBoundingBox {
    top?: LatLon,
    left?: LatLon,
    bottom?: LatLon,
    right?: LatLon,
};

type LatLon = {
    lat: number,
    lon: number,
}

type DogSearchParams = { 
    breeds?: string[], 
    zipCodes?: string[], 
    ageMin?: string, 
    ageMax?: string, 
    size?: number, 
    from?: string, 
    sort?: string
}

type LocationSearchParams = { 
    city?: string | undefined, 
    states?: string[] | undefined[], 
    geoBoundingBox?: GeoBoundingBox
    size?: number,
    from?: string,
}

type DogSearch = {
    resultIds: Dog['id'][],
    total: number,
    next?: string,
    prev?: string,
}

type DogCardProps = {
    id: string,
    img: string, 
    name: string,
    breed: string, 
    age: number,
    zip: string,
    city: string | null,
    state: string | null,
    favorited: boolean,
}

type Sort = 'ascend' | 'descend' | 'off';

interface DogStore {
    breedsList: Dog['breed'][];
    dogSearchResults: Dog[];
    zipCityState: ZipCityState;
    zips: string[];
    sortState: {
        [key in Sort]: boolean
    };
    favoriteDogsIds: Dog['id'][];
    favoriteDogsResults: Dog[];
    favoritesContainerState: boolean;

    fetchBreeds: () => void;
    fetchDogs: (params: DogSearchParams) => void;
    fetchLocations: (params: LocationSearchParams) => void;
    resetZips: () => void;
    setSortState: (sort: Sort, next: Sort) => void;
    addFavoriteDog: (id: Dog['id']) => void;
    removeFavoriteDog: (id: Dog['id'], prevState: Dog['id'][]) => void;
    fetchFavorites: (id: Dog['id'][]) => void;
    toggleFavoritesContainer: () => void;
}

export type { UserStore, DogStore, DogSearch, Dog, Location, DogSearchParams, ZipCityState, Sort, DogCardProps };