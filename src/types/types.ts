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

type DogSearchParams = { 
    breeds?: string[], 
    zipCodes?: string[], 
    ageMin?: number, 
    ageMax?: number, 
    size?: number, 
    from?: number, 
    sort?: string
}

type DogSearchResult = {
    resultIds: string[],
    total: number,
    next?: string,
    prev?: string,
}

interface DogStore {
    breedsList: string[];
    dogSearchResults: Dog[];

    fetchBreeds: () => void;
    fetchDogs: (params: DogSearchParams) => void;
}
export type { UserStore, DogStore, DogSearchResult, Dog, Location, DogSearchParams };