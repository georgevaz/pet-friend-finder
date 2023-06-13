import { create } from 'zustand';
import { UserStore } from '../types/types';

const useUserStore = create<UserStore>(set => ({
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

export default useUserStore;