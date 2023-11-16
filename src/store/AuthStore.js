import { create } from 'zustand';

function getCookie(name) {
    if (typeof document !== 'undefined') {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    return null;
}

const useAuthStore = create((set) => ({
    user: getCookie('isAuth'),
    setUser: (user) => set({ user: user })
}));

export default useAuthStore;