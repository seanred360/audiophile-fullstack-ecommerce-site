import { Icon } from "@iconify/react";
import Link from "next/link";

const ShopLinksGroup = () => {
  return (
    <div className="max-w-[1110px] w-full grid md:grid-cols-3 md:gap-[11px]">
      <ShopCategoryLink img="/images/image-headphones.png" type="headphones" />
      <ShopCategoryLink img="/images/image-speakers.png" type="speakers" />
      <ShopCategoryLink img="/images/image-earphones.png" type="earphones" />
    </div>
  );
};

const ShopCategoryLink = ({ img, type }) => {
  return (
    <Link href={`/${type}`}>
      <div className="relative max-w-[327px] w-full md:basis-[33%] h-[217px] text-[black] mx-auto mb-[16px] cursor-pointer">
        <div className="relative z-10 flex flex-col justify-center items-center">
          <img className="w-[140px]" src={img} alt={type} />
          <span className="mb-[16px] font-bold tracking-[1.07143px] uppercase">
            {type}
          </span>
          <span className="flex items-center text-[13px] text-[#000000]/[0.6] font-black tracking-[1px] uppercase">
            shop <Icon color="#D87D4A" height="20" icon="bxs:chevron-right" />
          </span>
        </div>
        <div className="absolute bottom-0 left-[50%] translate-x-[-50%] w-full h-[165px] bg-[#F1F1F1] rounded-[8px]" />
      </div>
    </Link>
  );
};

export default ShopLinksGroup;
