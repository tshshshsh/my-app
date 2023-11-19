import { create } from 'zustand';



const useServiceWorkerStore = create((set) => ({
    registration: null,
    setRegistration: (registration) => set({ registration: registration })
}));

export default useServiceWorkerStore;