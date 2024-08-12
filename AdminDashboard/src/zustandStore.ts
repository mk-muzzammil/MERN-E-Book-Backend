import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { persist } from "zustand/middleware";
import { ZustandStoretype } from "../src/types/index";
const useTokenStore = create<ZustandStoretype>()(
  devtools(
    persist(
      (set) => ({
        token: "",
        setToken: (data: string) => set(() => ({ token: data })),
      }),
      { name: "token-store" }
    )
  )
);
// const useGenreStore = create<ZuStandGenreStoretype>((set) => ({
//   selectedGenre: "",
//   setSelectedGenre: (genre) => set({ selectedGenre: genre }),
// }));
export { useTokenStore };
