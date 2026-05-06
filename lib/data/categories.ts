export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  parentSlug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  subcategories: Subcategory[];
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Sportswear",
    slug: "sportswear",
    image: "/images/categories/sportswear.jpg",
    subcategories: [
      { id: "1-1", name: "Soccer", slug: "soccer", parentSlug: "sportswear" },
      { id: "1-2", name: "American Football", slug: "american-football", parentSlug: "sportswear" },
      { id: "1-3", name: "Basketball Uniform", slug: "basketball-uniform", parentSlug: "sportswear" },
      { id: "1-4", name: "Baseball Uniform", slug: "baseball-uniform", parentSlug: "sportswear" },
      { id: "1-5", name: "Padel Tennis", slug: "padel-tennis", parentSlug: "sportswear" },
    ]
  },
  {
    id: "2",
    name: "Casual Wear",
    slug: "casual-wear",
    image: "/images/categories/casual-wear.jpg",
    subcategories: [
      { id: "2-1", name: "Hoodies", slug: "hoodies", parentSlug: "casual-wear" },
      { id: "2-2", name: "T-Shirts", slug: "t-shirts", parentSlug: "casual-wear" },
      { id: "2-3", name: "Polo", slug: "polo", parentSlug: "casual-wear" },
      { id: "2-4", name: "Sweatshirts", slug: "sweatshirts", parentSlug: "casual-wear" },
      { id: "2-5", name: "Tracksuits", slug: "tracksuits", parentSlug: "casual-wear" },
      { id: "2-6", name: "Joggers", slug: "joggers", parentSlug: "casual-wear" },
    ]
  },
  {
    id: "3",
    name: "Gloves",
    slug: "gloves",
    image: "/images/categories/gloves.jpg",
    subcategories: [
      { id: "3-1", name: "Soccer Gloves", slug: "soccer-gloves", parentSlug: "gloves" },
      { id: "3-2", name: "Boxing Gloves", slug: "boxing-gloves", parentSlug: "gloves" },
      { id: "3-3", name: "Working Gloves", slug: "working-gloves", parentSlug: "gloves" },
    ]
  },
  {
    id: "4",
    name: "Accessories",
    slug: "accessories",
    image: "/images/categories/accessories.jpg",
    subcategories: [
      { id: "4-1", name: "Caps & Hats", slug: "caps-hats", parentSlug: "accessories" },
      { id: "4-2", name: "Socks", slug: "socks", parentSlug: "accessories" },
      { id: "4-3", name: "Bags & Backpacks", slug: "bags-backpacks", parentSlug: "accessories" },
      { id: "4-4", name: "Wristbands", slug: "wristbands", parentSlug: "accessories" },
    ]
  }
];

// Helper to get a category by slug
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}

// Helper to get a subcategory by slug
export function getSubcategoryBySlug(parentSlug: string, subSlug: string): Subcategory | undefined {
  const category = getCategoryBySlug(parentSlug);
  return category?.subcategories.find(s => s.slug === subSlug);
}

// Helper to get all subcategories for a parent
export function getSubcategories(parentSlug: string): Subcategory[] {
  const category = getCategoryBySlug(parentSlug);
  return category?.subcategories || [];
}

// Helper to get all parent category names
export function getParentCategories(): { name: string; slug: string }[] {
  return categories.map(c => ({ name: c.name, slug: c.slug }));
}

// Get subcategory URL
export function getSubcategoryUrl(parentSlug: string, subSlug: string): string {
  return `/products/${parentSlug}/${subSlug}`;
}
