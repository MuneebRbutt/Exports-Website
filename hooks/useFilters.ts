import { create } from 'zustand';

export interface FilterState {
  categories: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  productType: 'RETAIL' | 'EXPORT' | 'ALL';
  materials: string[];
  sortBy: string;
  viewMode: 'GRID4' | 'GRID2' | 'LIST';
  currentPage: number;
}

interface FilterStore extends FilterState {
  setCategories: (categories: string[]) => void;
  setSizes: (sizes: string[]) => void;
  setColors: (colors: string[]) => void;
  setPriceRange: (range: [number, number]) => void;
  setProductType: (type: 'RETAIL' | 'EXPORT' | 'ALL') => void;
  setMaterials: (materials: string[]) => void;
  setSortBy: (sortBy: string) => void;
  setViewMode: (mode: 'GRID4' | 'GRID2' | 'LIST') => void;
  setPage: (page: number) => void;
  clearFilters: () => void;
}

export const useFilters = create<FilterStore>((set) => ({
  categories: [],
  sizes: [],
  colors: [],
  priceRange: [0, 500],
  productType: 'ALL',
  materials: [],
  sortBy: 'featured',
  viewMode: 'GRID4',
  currentPage: 1,

  setCategories: (categories) => set({ categories, currentPage: 1 }),
  setSizes: (sizes) => set({ sizes, currentPage: 1 }),
  setColors: (colors) => set({ colors, currentPage: 1 }),
  setPriceRange: (priceRange) => set({ priceRange, currentPage: 1 }),
  setProductType: (productType) => set({ productType, currentPage: 1 }),
  setMaterials: (materials) => set({ materials, currentPage: 1 }),
  setSortBy: (sortBy) => set({ sortBy }),
  setViewMode: (viewMode) => set({ viewMode }),
  setPage: (currentPage) => set({ currentPage }),
  clearFilters: () => set({
    categories: [],
    sizes: [],
    colors: [],
    priceRange: [0, 500],
    productType: 'ALL',
    materials: [],
    currentPage: 1,
  }),
}));
