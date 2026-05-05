/**
 * Always generates correct product URL
 */
export function getProductUrl(product: { 
  slug: string; 
  category: string | { slug: string }; 
}): string {
  const categorySlug = 
    typeof product.category === 'string' 
      ? product.category
          .toLowerCase()
          .replace(/\s+/g, '-')
      : product.category.slug;

  return `/products/${categorySlug}/${product.slug}`;
}

/**
 * Generates correct category URL
 */
export function getCategoryUrl(category: string | { slug: string }): string {
  const categorySlug = 
    typeof category === 'string' 
      ? category.toLowerCase().replace(/\s+/g, '-')
      : category.slug;

  return `/products/${categorySlug}`;
}
