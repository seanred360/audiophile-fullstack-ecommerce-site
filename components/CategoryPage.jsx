import CategoryItem from "../components/CategoryItem";
import ShopLinksGroup from "../components/ShopLinksGroup";
import SectionAbout from "../components/SectionAbout";
import { urlFor } from "../lib/client";

const CategoryPage = ({ productData, productCategory }) => {
  if (productData.length > 0)
    return (
      <>
        <h1 className="mb-[64px] md:mb-[120px] lg:mb-[160px] py-[32px] md:py-[97px] text-white text-[28px] md:text-[40px] bg-smoke">
          {productCategory}
        </h1>
        <div className="max-w-[1110px] px-[24px] mx-auto">
          <div className="md:px-[0px]">
            {productData.map((product) => (
              <CategoryItem
                key={product._id}
                imgDesktop={urlFor(product.image.desktop).height(560).url()}
                imgTablet={urlFor(product.image.mobile).height(352).url()}
                imgMobile={urlFor(product.image.mobile).height(352).url()}
                isNew={product.new}
                productName={product.name}
                productDescription={product.description}
                href={`product/${product.slug.current}`}
              />
            ))}
          </div>
          <ShopLinksGroup />
          <SectionAbout />
        </div>
      </>
    );
};

export default CategoryPage;
