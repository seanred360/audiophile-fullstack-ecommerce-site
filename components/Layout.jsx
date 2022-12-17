import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import CartProvider, { useCart } from "../lib/CartContext";
import ModalCartQuantityButton from "./ModalCartQuantityButton";
import { urlFor } from "../lib/client";
import { useEffect } from "react";
import { useState } from "react";

const Layout = ({ children }) => {
  const paths = ["headphones", "speakers", "earphones"];

  return (
    <CartProvider>
      <Nav paths={paths} />
      <ModalCart />
      {children}
      <Footer paths={paths} />
    </CartProvider>
  );
};

const Nav = ({ paths }) => {
  return (
    <nav className="relative z-[9] bg-smoke border-b-[1px] border-[white]/[0.4]">
      <div className="max-w-[1110px] px-[24px] lg:px-0 mx-auto py-[32px] text-[white]">
        <NavMobileContents paths={paths} />
        <NavDesktopContents paths={paths} />
      </div>
    </nav>
  );
};

const NavMobileContents = ({ paths }) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
    document.body.classList.toggle("no-scroll");
  };

  return (
    <div className="flex lg:hidden justify-between items-center">
      <button onClick={handleToggle}>
        <Icon height="25" icon="dashicons:menu-alt" />
      </button>
      <Link href="/">
        <img
          className="w-[143px] h-[25px] md:mr-auto md:ml-[24px] cursor-pointer"
          src="/images/logo.png"
          alt="logo"
        />
      </Link>
      <ButtonCart />
      {toggle && <MobileMenu paths={paths} onToggle={handleToggle} />}
    </div>
  );
};

const NavDesktopContents = ({ paths }) => {
  return (
    <div className="hidden lg:flex justify-between items-center ">
      <Link href="/">
        <img
          className="w-[143px] h-[25px] md:mr-auto md:ml-[24px] cursor-pointer"
          src="/images/logo.png"
          alt="logo"
        />
      </Link>
      <ul className="flex justify-center items-center text-[13px] text-bold tracking-[2px]">
        <li className="mr-[32px] hover:text-burntOrange cursor-pointer uppercase"></li>
        {paths.map((path) => (
          <li
            key={"desktop" + path}
            className="mr-[32px] hover:text-burntOrange cursor-pointer uppercase"
          >
            <Link href={`/${path}`}>{path}</Link>
          </li>
        ))}
      </ul>
      <ButtonCart />
    </div>
  );
};

const MobileMenu = ({ paths, onToggle }) => {
  return (
    <div className="absolute z-[999] top-0 left-0 flex justify-center w-screen h-screen bg-[black]/40">
      <div className="relative flex flex-col w-[75vw] h-screen mr-auto bg-[black]">
        <button
          className="absolute top-0 left-0 py-[32px] px-[24px]"
          onClick={onToggle}
        >
          <Icon icon="material-symbols:close" height="25" />
        </button>
        <ul className="mt-[64px] mb-auto py-[32px] px-[24px]">
          {paths.map((path) => (
            <li
              key={"mobile" + path}
              className="w-full uppercase text-[24px] font-bold text-white mb-[24px] tracking-[2px]"
            >
              <Link href={`/${path}`}>
                <a
                  className="underline decoration-burntOrange"
                  onClick={onToggle}
                >
                  {path}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-auto mx-auto p-[24px]">
          <img src="/images/logo.png" alt="" width="200" />
        </div>
      </div>
    </div>
  );
};

const ButtonCart = () => {
  const { handleToggleModal } = useCart();

  return (
    <button onClick={handleToggleModal}>
      <Icon height="25" icon="ant-design:shopping-cart-outlined" />
    </button>
  );
};

const ModalCart = () => {
  const { cart, toggle, handleDeleteCart, handleToggleModal, getCartTotal } =
    useCart();

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  const handleCheckout = async () => {
    const lineItems = cart?.map((item) => ({
      price: item.product.stripePriceId,
      quantity: item.quantity,
    }));

    fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lineItems: lineItems }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ session }) => {
        window.location = session.url;
      })
      .catch((e) => {
        console.error(e.error);
      });
  };

  return (
    <>
      {toggle && (
        <div className="absolute z-[100] w-screen h-screen bg-black/40 overflow-hidden">
          <div className="w-[327px] h-[488px] mt-[24px] mx-auto p-[24px] bg-white rounded-[8px]">
            <button onClick={handleToggleModal}>
              <Icon icon="material-symbols:close" />
            </button>
            <div className="mx-auto mt-[32px] bg-white rounded-[8px]">
              <div className="flex justify-between mb-[32px]">
                <span className="text-[17px] font-bold tracking-[1.28px] text-black">
                  CART({cart.length})
                </span>
                {cart.length >= 1 && (
                  <button
                    className="font-[500] text-15[px] text-black/50"
                    onClick={handleDeleteCart}
                  >
                    Remove all
                  </button>
                )}
              </div>
              <ul className="w-full h-[200px] overflow-y-scroll mb-auto">
                {cart.map((item) => (
                  <li
                    key={"cart item" + item.product._id}
                    className="w-full overflow-hidden flex justify-between items-center mb-[24px] gap-[16px]"
                  >
                    <img
                      className="rounded-[8px]"
                      src={urlFor(item.product.image.mobile).width(64).url()}
                      alt="product"
                      width="64"
                      height="64"
                    />
                    <div className="flex flex-col">
                      <span className="w-[76px] font-bold text-[15px] truncate">
                        {item.product.name}
                      </span>
                      <span className="font-bold text-[14px] text-black/50">
                        ${item.product.price.toLocaleString("en-US")}
                      </span>
                    </div>
                    <ModalCartQuantityButton
                      product={item.product}
                      initialQuantity={item.quantity}
                    />
                  </li>
                ))}
              </ul>

              <div className="flex justify-between mb-[24px]">
                <span className="font-[500] text-[15px] text-black/50">
                  TOTAL
                </span>
                <span className="font-bold text-[15px]">${getCartTotal()}</span>
              </div>
              <button
                className="btn orange w-full"
                role="link"
                onClick={handleCheckout}
                disabled={cart.length <= 0}
              >
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Footer = ({ paths }) => {
  return (
    <footer className="mt-auto flex flex-col justify-center items-center px-[24px] md:px-[38px] bg-smoke text-white md:text-left">
      <div className="max-w-[1110px] w-full">
        <div className="lg:flex lg:justify-between lg:items-center">
          <div className="py-[48px] md:mr-auto border-burntOrange border-t-[4px] cursor-pointer">
            <Image width="148" height="25" src="/images/logo.png" alt="logo" />
          </div>

          <ul className="md:flex md:mr-auto lg:mr-0 text-[13px] text-bold tracking-[2px] text-center">
            {paths.map((path) => (
              <li
                key={"footer link" + path}
                className="mb-[16px] md:mb-0 md:mr-[32px] hover:text-burntOrange cursor-pointer uppercase"
              >
                {path}
              </li>
            ))}
          </ul>
        </div>

        <p className="max-w-[540px] my-[48px] p-0 opacity-50 md:text-left">
          Audiophile is an all in one stop to fulfill your audio needs. We're a
          small team of music lovers and sound specialists who are devoted to
          helping you get the most out of personal audio. Come and visit our
          demo facility - we're open 7 days a week.
        </p>
        <div className="w-full md:flex md:justify-between md:items-center">
          <span className="flex justify-center text-bold opacity-50 ">
            Copyright 2023. All Rights Reserved
          </span>
          <Link href="https://seanred.io">
            <a className="hover:underline pointer text-burntOrange">
              created by seanred.io
            </a>
          </Link>
          <div className="flex justify-center text-[24px] mt-[48px] mb-[38px]">
            <Link href="https://facebook.com">
              <Icon
                className="mr-[16px] hover:text-burntOrange cursor-pointer"
                icon="ant-design:facebook-filled"
              />
            </Link>
            <Link href="https://twitter.com">
              <Icon
                className="mr-[16px] hover:text-burntOrange cursor-pointer"
                icon="akar-icons:twitter-fill"
              />
            </Link>
            <Link href="https://instgram.com">
              <Icon
                className="hover:text-burntOrange cursor-pointer"
                icon="akar-icons:instagram-fill"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Layout;
