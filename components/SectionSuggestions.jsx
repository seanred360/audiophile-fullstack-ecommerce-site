import { urlFor } from "../lib/client";
import Link from "next/link";

const SectionSuggestions = ({ suggestedProducts }) => {
  if (suggestedProducts === null) return;
  return (
    <section className="md:mb-[120px]">
      <h4 className="my-[28px] text-[28px] md:text-[40px] leading-[38px] md:mb-[56px]">
        YOU MAY ALSO LIKE
      </h4>
      <div className="w-full grid md:grid-cols-3 md:gap-[11px]">
        {suggestedProducts.map((product) => (
          <div
            key={product._id}
            className="flex flex-col items-center mb-[56px]"
          >
            <picture>
              <source
                media="(min-width: 992px)"
                srcSet={urlFor(product.suggestedImage.desktop)
                  .height(318)
                  .url()}
              />
              <source
                media="(min-width: 768px)"
                srcSet={urlFor(product.suggestedImage.tablet).height(318).url()}
              />
              <img
                src={urlFor(product.suggestedImage.mobile).height(120).url()}
                width="327"
                height="120"
              />
            </picture>
            <span className="h-[72px] my-[32px] font-bold text-[24px] tracking-[1.71px] text-center">
              {product.name}
            </span>
            <Link href={`/product/${product.slug.current}`}>
              <a className="btn orange">SEE PRODUCT</a>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionSuggestions;
