/**
 * Always generates correct product URL
 * Supports: /products/[category]/[slug]
 */
export function getProductUrl(product: {
  slug: string;
  category: { slug: string } | string;
}): string {
  const categorySlug =
    typeof product.category === 'string'
      ? product.category
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

/**
 * Generates correct subcategory URL
 */
export function getSubcategoryUrl(
  category: string | { slug: string },
  subcategory: string | { slug: string }
): string {
  const categorySlug =
    typeof category === 'string'
      ? category.toLowerCase().replace(/\s+/g, '-')
      : category.slug;

  const subcategorySlug =
    typeof subcategory === 'string'
      ? subcategory.toLowerCase().replace(/\s+/g, '-')
      : subcategory.slug;

  return `/products/${categorySlug}/sub/${subcategorySlug}`;
}
