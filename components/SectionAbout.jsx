const SectionAbout = () => {
  return (
    <section className="lg:grid grid-cols-2 my-[120px]">
      <div className="relative w-full h-[300px] lg:h-full rounded-[8px] overflow-hidden lg:order-2">
        <picture>
          <source
            media="(min-width: 992px)"
            srcSet="/images/shared/desktop/image-best-gear.jpg"
          />
          <source
            media="(min-width: 768px)"
            srcSet="/images/shared/tablet/image-best-gear.jpg"
          />
          <img
            className="w-full object-cover"
            src="/images/shared/mobile/image-best-gear.jpg"
            alt="zx7 speaker"
          />
        </picture>
      </div>

      <div className="max-w-[573px] lg:max-w-[445px] lg:order-1">
        <h5 className="text-[28px] my-[32px] lg:text-left">
          BRINGING YOU THE <span className="text-burntOrange">BEST</span> AUDIO
          GEAR
        </h5>
        <p className="p-0 lg:text-left">
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
    </section>
  );
};

export default SectionAbout;
