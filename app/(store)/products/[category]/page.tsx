import ProductCatalog from "../page";

export default function CategoryPage({ params }: { params: { category: string } }) {
  return <ProductCatalog params={params} />;
}
