import Cursor from "@/components/common/Cursor";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Events from "@/components/home/Events";
import Image from "next/image";
import Sponsors from "@/components/home/Sponsors";

const Home = () => {
  return (
    <main className="flex min-h-screen w-full flex-col gap-2">
      <Hero />
      <About />
      <Image
        src="/assets/home/goldbar1.svg"
        alt="About"
        className="w-full"
        width={0}
        height={0}
      />
      <Events />
      <Image
        src="/assets/home/goldbar2.svg"
        alt="About"
        className="w-full"
        width={0}
        height={0}
      />
      <Sponsors />
    </main>
  );
};

export default Home;
