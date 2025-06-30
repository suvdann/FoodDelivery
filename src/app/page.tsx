import { Cards } from "./_components/Cards";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import axios from "axios";

export default async function Homepage() {
  const { data } = await axios.get("http://localhost:8000/foods");

  return (
    <div className="bg-[#404040] w-full h-full flex flex-col  justify-center items-center">
      <div className="w-full">
        <Header />
      </div>
      <Hero />
      <div className="flex">
        <Cards foods={data.foods} />
      </div>

      <Footer />
    </div>
  );
}
//
