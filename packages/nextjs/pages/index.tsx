import Image from "next/image";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
        <div className="carousel rounded-box pb-10">
          <div className="carousel-item">
            <Image src="/images/strawberry.jpg" alt="Burger" />
          </div>
          <div className="carousel-item">
            <Image src="/images/orange.jpg" alt="Burger" />
          </div>
          <div className="carousel-item">
            <Image src="/images/apple.jpg" alt="Burger" />
          </div>
          <div className="carousel-item">
            <Image src="/images/pineapple.jpg" alt="Burger" />
          </div>
          <div className="carousel-item">
            <Image src="/images/strawberry.jpg" alt="Burger" />
          </div>
          <div className="carousel-item">
            <Image src="/images/orange.jpg" alt="Burger" />
          </div>
          <div className="carousel-item">
            <Image src="/images/apple.jpg" alt="Burger" />
          </div>
          <div className="carousel-item">
            <Image src="/images/pineapple.jpg" alt="Burger" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
