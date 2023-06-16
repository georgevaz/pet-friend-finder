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

    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    setLoggedIn: (bool) => {
        set({
            isLoggedIn: bool,
        });
        localStorage.setItem('isLoggedIn', bool ? 'true' : 'false')
    }
}));

export default useUserStore;