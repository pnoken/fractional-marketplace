import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const Card = ({
  imgSrc,
  fractionPurchased,
  totalFractions,
  contractAddress,
}: {
  imgSrc: string;
  fractionPurchased: number;
  totalFractions: number;
  contractAddress: string;
}) => {
  const fractionLeft = (fractionPurchased / totalFractions) * 100;

  return (
    <Link href={"nfts/[id]"} className="card py-1  glass">
      <figure>
        <Image src={imgSrc} width={200} height={150} alt="car!" />
      </figure>
      <div className="p-3">
        <h2 className="card-title">BAYC</h2>
        <div className="card-actions justify-start">
          <button className="btn btn-primary btn-sm">{contractAddress}</button>
        </div>

        <div>
          <progress className="progress progress-error w-full" value={fractionLeft.toString()} max="100"></progress>
          <p>{`Fraction left: ${fractionLeft}%`}</p>
        </div>
      </div>
    </Link>
  );
};

const NFTMarketplace: NextPage = () => {
  return (
    <>
      <MetaHeader
        title="NFTS | Fract"
        description="Example UI created with 🏗 Scaffold-ETH 2, showcasing some of its features."
      >
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="grid p-10 xl:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-10">
        <Card imgSrc="/bayc.png" fractionPurchased={100} totalFractions={400} contractAddress="0x1273nb" />
        <Card imgSrc="/bayc.png" fractionPurchased={100} totalFractions={400} contractAddress="0x1273nb" />
        <Card imgSrc="/bayc.png" fractionPurchased={100} totalFractions={400} contractAddress="0x1273nb" />
        <Card imgSrc="/bayc.png" fractionPurchased={100} totalFractions={400} contractAddress="0x1273nb" />
        <Card imgSrc="/bayc.png" fractionPurchased={100} totalFractions={400} contractAddress="0x1273nb" />
      </div>
    </>
  );
};

export default NFTMarketplace;
