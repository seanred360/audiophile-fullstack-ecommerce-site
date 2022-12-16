import { Icon } from "@iconify/react";
import SectionAbout from "../components/SectionAbout";
import SectionSuggestions from "../components/SectionSuggestions";
import { client } from "../lib/client";

const orderSuccess = ({ suggestedProducts }) => {
  return (
    <div className="h-full flex flex-col items-center my-[32px] mb-[64px] max-w-[1110px] px-[24px] mx-auto">
      <Icon
        className="my-[32px]"
        icon="clarity:success-standard-line"
        color="green"
        width="100"
      />
      <h1>
        <strong className="text-[green]">THANK YOU!</strong>{" "}
        <span className="capitalize">Your order has been processed</span>
      </h1>
      <p>Please check your email</p>
      <img
        className="mb-[64px]"
        src="/assets/paper-airplane.png"
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

export default orderSuccess;
