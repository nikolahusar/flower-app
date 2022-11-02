import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import FlowerCard from "../components/FlowerCard";
import { useDebounce } from "../hooks/useDebounce";

const FlowerList = () => {
  const [term, setTerm] = useState("");
  const [data, setData] = useState([]);
  const debouncedValue = useDebounce(term, 500);

  useEffect(() => {
    const searchFlowers = async () => {
      const res = await axios.get(
        "https://flowrspot-api.herokuapp.com/api/v1/flowers/search",
        {
          params: {
            query: debouncedValue,
          },
        }
      );
      setData(res.data.flowers);
    };
    searchFlowers();
  }, [debouncedValue]);

  return (
    <div className="max-w-[1220px] mx-auto">
      <div className="text-gray-400 focus-within:text-gray-600 max-w-[1220px] w-[600px] mx-auto h-[70px] relative mt-10 sm:w-[307px] sm:h-[56px]  ">
        <input
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Looking for something specific?"
          className="w-full h-full pl-4 border-none outline-none   "
        />
        <div className="absolute right-3 top-7 sm:top-5">
          <BsSearch className=" w-5 h-5  text-primary " />
        </div>
      </div>

      <section className="flex flex-wrap  gap-4 my-[40px]  px-4  justify-center">
        {data?.map((flower) => (
          <FlowerCard
            key={flower.id}
            name={flower.name}
            latinName={flower.latin_name}
            img={flower.profile_picture}
            sightings={flower.sightings}
            id={flower.id}
          />
        ))}
      </section>
    </div>
  );
};

export default FlowerList;
