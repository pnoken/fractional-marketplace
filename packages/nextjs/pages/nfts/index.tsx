import Image from "next/image";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const ExampleUI: NextPage = () => {
  return (
    <>
      <MetaHeader
        title="Example UI | Scaffold-ETH 2"
        description="Example UI created with 🏗 Scaffold-ETH 2, showcasing some of its features."
      >
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="flex justify-center items-center gap-20 p-10 flex-col sm:flex-row">
        <div className="card w-50 glass">
          <figure>
            <Image src="/bayc.png" width={200} height={200} alt="car!" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">BAYC</h2>
            <div className="card-actions justify-start">
              <button className="btn btn-primary">0x00fe23</button>
            </div>

            <div>
              <progress className="progress progress-error w-full" value="70" max="100"></progress>
              <p>Fraction left: 78%</p>
            </div>
            <div className="flex justify-between ">
              <div>
                <h2>Fractions</h2>
                <p>21m</p>
              </div>
              <div>
                <h2>Fractions</h2>
                <p>21m</p>
              </div>
              <div>
                <h2>Fractions</h2>
                <p>21m</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card w-50 glass">
          <figure>
            <Image src="/bayc.png" width={200} height={200} alt="car!" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">BAYC</h2>
            <div className="card-actions justify-start">
              <button className="btn btn-primary">0x00fe23</button>
            </div>

            <div>
              <progress className="progress progress-error w-full" value="70" max="100"></progress>
              <p>Fraction left: 78%</p>
            </div>
            <div className="flex justify-between ">
              <div>
                <h2>Fractions</h2>
                <p>21m</p>
              </div>
              <div>
                <h2>Fractions</h2>
                <p>21m</p>
              </div>
              <div>
                <h2>Fractions</h2>
                <p>21m</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card w-50 glass">
          <figure>
            <Image src="/bayc.png" width={200} height={200} alt="car!" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">BAYC</h2>
            <div className="card-actions justify-start">
              <button className="btn btn-primary">0x00fe23</button>
            </div>

            <div>
              <progress className="progress progress-error w-full" value="70" max="100"></progress>
              <p>Fraction left: 78%</p>
            </div>
            <div className="flex justify-between ">
              <div>
                <h2>Fractions</h2>
                <p>21m</p>
              </div>
              <div>
                <h2>Fractions</h2>
                <p>21m</p>
              </div>
              <div>
                <h2>Fractions</h2>
                <p>21m</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExampleUI;
