/**
 * Always generates correct product URL
 * Supports: /products/[category]/[slug]
 * Or: /products/[category]/[subcategory]/[slug]
 */
export function getProductUrl(product: {
  slug: string;
  category: string | { slug: string };
  subcategory?: string | { slug: string } | null;
}): string {
  const categorySlug =
    typeof product.category === 'string'
      ? product.category
          .toLowerCase()
          .replace(/\s+/g, '-')
      : product.category.slug;

  const subcategorySlug = product.subcategory
    ? typeof product.subcategory === 'string'
      ? product.subcategory.toLowerCase().replace(/\s+/g, '-')
      : product.subcategory.slug
    : null;

  if (subcategorySlug) {
    return `/products/${categorySlug}/${subcategorySlug}/${product.slug}`;
  }

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

  return `/products/${categorySlug}/${subcategorySlug}`;
}
