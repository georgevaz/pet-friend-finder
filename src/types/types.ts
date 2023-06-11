type Store = {
    name: string;
    email: string;

    setName: (data: string) => void;
    setEmail: (data: string) => void;

    isLoggedIn: boolean;
    setLoggedIn: (isLoggedIn: boolean) => void;
};

export type { Store };