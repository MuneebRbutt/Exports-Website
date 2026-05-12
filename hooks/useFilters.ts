import { create } from 'zustand';

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  sortBy: string;
  viewMode: 'GRID4' | 'GRID2' | 'LIST';
  currentPage: number;
}

interface FilterStore extends FilterState {
  setCategories: (categories: string[]) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sortBy: string) => void;
  setViewMode: (mode: 'GRID4' | 'GRID2' | 'LIST') => void;
  setPage: (page: number) => void;
  clearFilters: () => void;
}

export const useFilters = create<FilterStore>((set) => ({
  categories: [],
  priceRange: [0, 500],
  sortBy: 'featured',
  viewMode: 'GRID4',
  currentPage: 1,

  setCategories: (categories) => set({ categories, currentPage: 1 }),
  setPriceRange: (priceRange) => set({ priceRange, currentPage: 1 }),
  setSortBy: (sortBy) => set({ sortBy }),
  setViewMode: (viewMode) => set({ viewMode }),
  setPage: (currentPage) => set({ currentPage }),
  clearFilters: () => set({
    categories: [],
    priceRange: [0, 500],
    currentPage: 1,
  }),
}));
