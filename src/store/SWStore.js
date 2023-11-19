import { create } from 'zustand';



const useServiceWorkerStore = create((set) => ({
    registration: undefined,
    setRegistration: (registration) => set({ registration: registration })
}));

export default useServiceWorkerStore;