import { create } from 'zustand'

export const useAuthStore = create((set) => ({
    isAuth: false,
    setAuth: (bool) => set({ isAuth: bool }),
}));