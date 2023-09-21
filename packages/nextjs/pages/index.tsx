import Image from "next/image";
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
      <>
      <h1>Upload Your NFT</h1>
    <form onSubmit={submit} id="nftUploadForm" encType="multipart/form-data">
        <label htmlFor="nftId">NFT ID:</label>
        <input type="text" id="nftId" name="nftId" required></input><br></br>

        <label htmlFor="metadata">Metadata:</label>
        <textarea id="metadata" name="metadata" required></textarea><br></br>

        <label htmlFor="image">Select Image:</label>
        <input type="file" id="image" name="image" accept="image/*" required></input><br></br>

        <button type="submit">Upload NFT</button>
    </form>

    <div id="message"></div>
      </>
      <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
        <div className="carousel rounded-box pb-10">
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
