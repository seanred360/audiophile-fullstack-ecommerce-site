import { Icon } from "@iconify/react";
import SectionAbout from "../components/SectionAbout";
import SectionSuggestions from "../components/SectionSuggestions";
import { client } from "../lib/client";

const orderCancelled = ({ suggestedProducts }) => {
  return (
    <div className="h-full flex flex-col items-center my-[32px] mb-[64px] max-w-[1110px] px-[24px] mx-auto">
      <Icon
        className="my-[32px]"
        icon="mdi:close-circle-outline"
        color="red"
        width="100"
      />
      <h1>
        <strong className="text-[red]">CHECKOUT CANCELLED</strong>{" "}
      </h1>
      <p>Your order wasn't processed</p>
      <img
        className="mb-[64px]"
        src="/assets/paper-airplane-fail.png"
        alt="success"
        width="250"
      />
      <SectionSuggestions suggestedProducts={suggestedProducts} />
      <SectionAbout />
    </div>
  );
};

export async function getStaticProps() {
  const query = `*[_type == "products"][0..5] | order(_createdAt desc)`;
  const suggestedProducts = await client.fetch(query);

  return {
    props: { suggestedProducts },
  };
}

export default orderCancelled;
