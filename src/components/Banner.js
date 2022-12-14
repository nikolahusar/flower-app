import React from "react";
import hero from "../assets/pl-hero.png";
import Search from "./Search";
const Banner = () => {
  return (
    <div
      className="max-w-screen h-[500px]   bg-cover no-repeat bg-center relative "
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className="flex flex-col justify-center items-center  h-full text-center  ">
        <h2 className="text-[40px] text-white font-semibold sm:font-light leading-10 ">
          Discover flowers around you
        </h2>
        <h3 className="text-white pt-4 text-[17px] opacity-[0.7]">
          Explore between more than 8.427 sightings
        </h3>
        <Search />
      </div>
    </div>
  );
};

export default Banner;
