import { create } from 'zustand';
import { Club } from '@/types';

interface ClubStore {
  clubs: Club[];
  selectedClub: Club | null;
  setClubs: (clubs: Club[]) => void;
  setSelectedClub: (club: Club | null) => void;
}

export const useClubStore = create<ClubStore>((set) => ({
  clubs: [],
  selectedClub: null,
  setClubs: (clubs) => set({ clubs }),
  setSelectedClub: (club) => set({ selectedClub: club }),
}));