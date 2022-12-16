import Link from "next/link";
import { client, urlFor } from "../../lib/client";
import ShopLinksGroup from "../../components/ShopLinksGroup";
import SectionAbout from "../../components/SectionAbout";
import CartQuantityButton from "../../components/CartQuantityButton";
import { useCart } from "../../lib/CartContext";
import { useState } from "react";
import SectionSuggestions from "../../components/SectionSuggestions";

const product = ({ productData, suggestedProducts }) => {
  return (
    <div className="max-w-[1110px] mx-auto px-[24px]">
      <BackButton />
      <SectionBanner productData={productData} />
      <div className="flex justify-between flex-wrap my-[88px]">
        <SectionFeatures productData={productData} />
        <SectionInTheBox productData={productData} />
      </div>
      <SectionGallery productData={productData} />
      <SectionSuggestions
        productData={productData}
        suggestedProducts={suggestedProducts}
      />
      <ShopLinksGroup />
      <SectionAbout />
    </div>
  );
};

const BackButton = () => {
  return (
    <div className="my-[32px]">
      <Link href="/">
        <a className="font-[500] text-[15px] text-black/50 cursor-pointer hover:text-burntOrange">
          Go Back
        </a>
      </Link>
    </div>
  );
};

const SectionBanner = ({ productData }) => {
  const [quantity, setQuantity] = useState(1);
  const { handleAddToCart } = useCart();

  return (
    <div className="grid md:grid-cols-2 items-center md:mb-[120px]">
      <picture>
        <source
          media="(min-width: 992px)"
          srcSet={urlFor(productData.image.desktop).url()}
        />
        <source
          media="(min-width: 768px)"
          srcSet={urlFor(productData.image.tablet).url()}
        />
        <img
          className="w-full md:w-[327px] lg:w-[450px]"
          src={urlFor(productData.image.mobile).url()}
        />
      </picture>

      <div>
        {productData.new && (
          <p className="relative my-[32px] text-[14px] text-burntOrange tracking-[10px] text-left">
            NEW PRODUCT
          </p>
        )}
        <h1 className="my-[24px] text-[28px] md:text-[40px] leading-[38px] text-left">
          {productData.name}
        </h1>
        <p className="text-[black]/75 text-left">{productData.description}</p>
        <span className="font-bold text-[18px] tracking-[1.29px]">{`$${productData.price.toLocaleString(
          "en-US"
        )}`}</span>
        <br />
        <div className="flex justify-between items-center">
          <CartQuantityButton quantity={quantity} setQuantity={setQuantity} />
          <button
            className="my-[32px] btn orange"
            onClick={() => handleAddToCart(productData, quantity)}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

const SectionFeatures = ({ productData }) => {
  return (
    <section className="max-w-[635px] items-start md:mb-[120px]">
      <h2 className="text-left text-[24px] md:text-[32px]">FEATURES</h2>
      <p className="text-[black]/75 text-left">{productData.features}</p>
    </section>
  );
};

const SectionInTheBox = ({ productData }) => {
  return (
    <section className="md:w-full lg:w-auto grid items-start md:grid-cols-2 lg:grid-cols-1 md:mt-[88px] lg:mt-0">
      <h3 className="my-[24px] md:my-[0px] text-[28px] md:text-[32px] leading-[38px] text-left md:mr-auto lg:mr-0">
        IN THE BOX
      </h3>
      <ul>
        {productData.includes.map((itemInTheBox) => (
          <li className="mb-[8px]" key={itemInTheBox.item}>
            <span className="mr-[24px] text-burntOrange font-bold">
              {itemInTheBox.quantity}x
            </span>
            <span className="text-[black]/75 font-[500]">
              {itemInTheBox.item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

const SectionGallery = ({ productData }) => {
  return (
    <div className="w-full relative grid grid-cols-1 md:grid-cols-[auto_2fr] my-[88px] gap-[20px]">
      <img
        className="w-full rounded-[10px] md:order-1"
        src={urlFor(productData.gallery[0]).url()}
      />
      <img
        className="w-full rounded-[10px] md:order-3"
        src={urlFor(productData.gallery[1]).url()}
      />
      <img
        className="w-full h-full object-cover rounded-[10px] md:order-2 md:row-span-2"
        src={urlFor(productData.gallery[2]).url()}
      />
    </div>
  );
};

export async function getStaticPaths() {
  // Return a list of possible value for id

  const query = `*[_type == "products"] | order(_createdAt desc)`;
  const fetchedProducts = await client.fetch(query);

  const paths = fetchedProducts.map((product) => {
    return {
      params: { slug: product.slug.current.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  // Fetch necessary data for the blog post using params.id

  const slug = context.params.slug;
  const query = `*[_type == "products" && slug.current == "${slug}"]`;
  const fetchedProduct = await client.fetch(query);

  const suggestionsQuery = `*[_type == "products" && category == "${fetchedProduct[0].category}"] | order(_createdAt desc)`;
  const suggestedProducts = await client.fetch(suggestionsQuery);

  return {
    props: { productData: fetchedProduct[0], suggestedProducts },
  };
}

export default product;
