import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import axios from "axios";



const Home: NextPage = () => {

 const submit =  async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const server = axios.create({
        baseURL: "http://localhost:3042",
      });

      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
    
      const nftId = formData.get("nftId") as string;
      const metadata = formData.get("metadata") as string;
      const image = formData.get("image") as File;
      // Read the selected image file


      if (!image) {
          return alert('Please select an image file.');
      }


      console.log('formData', formData);

   
        try {
          const response = await server.post('/upload-nft', formData);
          console.log('NFT uploaded successfully.', response);
        } catch (error) {
          console.log('Error uploading NFT.', error);
        }

  };

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
