import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { User } from "../../typing";

interface BoardState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useGlobalStore = create<BoardState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
      }),
      {
        name: "saarage",
        skipHydration: true,
      }
    )
  )
);
