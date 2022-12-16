import { client } from "../lib/client";
import CategoryPage from "../components/CategoryPage";

const speakers = ({ productData, productCategory }) => {
  return (
    <CategoryPage productData={productData} productCategory={productCategory} />
  );
};

export async function getStaticProps() {
  const selectedCategory = "speakers";
  const query = `*[_type == "products" && category == "${selectedCategory}"] | order(_createdAt desc)`;
  const productData = await client.fetch(query);

  return {
    props: { productData, productCategory: selectedCategory },
  };
}

export default speakers;
