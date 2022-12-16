import Link from "next/link";

const CategoryItem = ({
  imgDesktop,
  imgTablet,
  imgMobile,
  isNew,
  productName,
  productDescription,
  href,
}) => {
  return (
    <section className="relative max-w-[1110px] lg:h-[560px] lg:grid lg:grid-cols-2 mx-auto mb-[120px] lg:mb-[160px]">
      <div className="mb-[32px] md:w-full md:h-[352px] lg:w-[540px] lg:h-[560px] md:bg-[#F1F1F1] lg:bg-[transparent] rounded-[8px] overflow-hidden">
        <picture>
          <source media="(min-width: 992px)" srcSet={imgDesktop} />
          <source media="(min-width: 768px)" srcSet={imgTablet} />
          <img
            className="md:mx-auto lg:mx-0 lg:w-full lg:h-full"
            src={imgMobile}
            width="327"
            height="352"
            alt="product"
          />
        </picture>
      </div>
      <div className="max-w-[573px] flex flex-col justify-center items-center lg:ml-[125px] lg:items-start">
        {isNew && (
          <span className="relative mb-[24px] text-[14px] text-burntOrange tracking-[10px] lg:text-left">
            NEW PRODUCT
          </span>
        )}
        <h1 className="text-[28px] md:text-[40px] leading-[38px] lg:text-left">
          {productName}
        </h1>
        <p className="text-[black]/75 lg:text-left">{productDescription}</p>
        <Link href={href}>
          <a className="btn orange">SEE PRODUCT</a>
        </Link>
      </div>
    </section>
  );
};

export default CategoryItem;
