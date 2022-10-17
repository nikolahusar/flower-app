import React from "react";
import hero from "../assets/pl-hero.png";
import { BsSearch } from "react-icons/bs";
const Banner = () => {
  return (
    <div
      className="max-w-screen h-[500px] bg-cover no-repeat relative  "
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className="flex flex-col justify-center items-center w-full h-full ">
        <h1 className="text-[40px] text-white font-semibold">
          Discover Flowers around you
        </h1>
        <h3 className="text-white pt-4 text-[17px] opacity-[0.7]">
          Explore between more than 8.427 sightings
        </h3>
        <div className="text-gray-400 focus-within:text-gray-600 block w-[600px] h-[70px] relative mt-10 ">
          <input
            type="text"
            name="email"
            placeholder="Looking for something specific?"
            className="w-full h-full pl-4 "
          />
          <div className="absolute right-3 top-7 ">
            <BsSearch className=" w-5 h-5   text-search " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
