type UserStore = {
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
    from?:number, 
    sort?:string
}

type DogStore = {
    breedsList: string[];
    searchResults: object; // figure out what returns

    fetchBreeds: () => void;
    fetchDogs: (params: DogSearchParams) => void;
}
export type { UserStore, DogStore };