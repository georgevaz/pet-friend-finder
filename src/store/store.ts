import { create } from 'zustand';
import { Store } from '../types/types';

const useDataStore = create<Store>(set => ({
    name: '',
    email: '',

    setName: data => {
        set({
            name: data,
        })
    },
    setEmail: data => {
        set({
            email: data,
        })
    },

    isLoggedIn: false,
    setLoggedIn: (bool) => {
        set({
            isLoggedIn: bool,
        })
    }
}));

export default useDataStore;