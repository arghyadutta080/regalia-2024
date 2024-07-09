import Cursor from "@/components/common/Cursor";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Events from "@/components/home/Events";
import Image from "next/image";
import Sponsors from "@/components/home/Sponsors";
import { Footer } from "@/components/common";
import InfoPopup from "@/components/home/InfoPopup";
import Judges from "@/components/home/Judges";
import Artists from "@/components/home/Artists";

const Home = () => {
  return (
    <>
      <main className="mx-auto flex min-h-screen w-full flex-col gap-2">
        {/* <InfoPopup /> */}
        <Hero />
        <Artists />
        <About />
        <Image
          src="/assets/home/goldbar1.svg"
          alt="About"
          className="w-full"
          width={0}
          height={0}
        />
        <Events />
        <Judges />
        <Image
          src="/assets/home/goldbar2.svg"
          alt="About"
          className="w-full"
          width={0}
          height={0}
        />
        <Sponsors />
      </main>
      <Footer />
    </>
  );
};

export default Home;
