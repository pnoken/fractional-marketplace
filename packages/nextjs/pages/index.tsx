import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex-grow bg-base-300 w-full px-8">
        <div className="hero min-h-screen">
          <div className="hero-content flex-col lg:flex-row">
            <Image
              src="/fraction.webp"
              width={1000}
              height={1000}
              className="max-w-sm rounded-lg shadow-2xl"
              alt={"Fractions of NFTs"}
            />
            <div>
              <h1 className="text-5xl font-bold">
                Buy, sell and mint
                <br />
                fractions of NFT
              </h1>
              <p className="py-6">
                Fractional ownership of world&apos;s most sought after NFTs. <br /> Fractional reduces entry costsm
                increases access and enables new communities
              </p>
              <Link href={"/nfts"}>
                <button className="btn btn-primary">Explore Latest Collections</button>
              </Link>
            </div>
          </div>
        </div>
        <h1 className="text-4xl font-bold">Top NFT Collections</h1>
        <div className="carousel rounded-box py-10">
          <div className="carousel-item">
            <Image src="/bayc.png" width={200} height={200} alt="Burger" />
          </div>
          <div className="carousel-item">
            <Image src="/images/orange.jpg" width={200} height={200} alt="Burger" />
          </div>
          <div className="carousel-item">
            <Image src="/images/apple.jpg" width={200} height={200} alt="Burger" />
          </div>
          <div className="carousel-item">
            <Image src="/images/pineapple.jpg" width={200} height={200} alt="Burger" />
          </div>
          <div className="carousel-item">
            <Image src="/images/strawberry.jpg" width={200} height={200} alt="Burger" />
          </div>
          <div className="carousel-item">
            <Image src="/images/orange.jpg" width={200} height={200} alt="Burger" />
          </div>
          <div className="carousel-item">
            <Image src="/images/apple.jpg" width={200} height={200} alt="Burger" />
          </div>
          <div className="carousel-item">
            <Image src="/images/pineapple.jpg" width={200} height={200} alt="Burger" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
