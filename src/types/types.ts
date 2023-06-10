type Store = {
    name: string;
    email: string;

    setName: (data: string) => void;
    setEmail: (data: string) => void;
};

export type { Store };