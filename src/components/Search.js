import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDebounce } from "../hooks/useDebounce";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

function Search() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState();

  const debounce = useDebounce(query, 500);
  useEffect(() => {
    const searchFlowers = async () => {
      const res = await axios.get(
        "https://flowrspot-api.herokuapp.com/api/v1/flowers/search",
        {
          params: {
            query: debounce,
          },
        }
      );
      setData(res.data.flowers);
    };
    debounce && searchFlowers();
  }, [debounce]);

  const remove = () => {
    setData(null);
    setQuery("");
  };

  return (
    <div className="relative mt-10">
      <div className="relative w-[600px] h-[70px] ">
        {!query ? (
          <button className="cursor-pointer absolute h-6 w-6 right-6 top-6 ">
            <BsSearch className="w-full h-full text-primary" />
          </button>
        ) : (
          <button
            onClick={() => remove()}
            className="cursor-pointer absolute h-6 w-6 right-6 top-6 "
          >
            <AiOutlineClose className="w-full h-full text-primary" />
          </button>
        )}

        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type="text"
          placeholder="Looking for something specific?"
          className="outline-0  w-full h-full px-6 rounded-md"
        />
      </div>
      <div className="mt-[-6px] absolute z-10 w-full">
        {query?.length > 0 &&
          data?.map((d) => (
            <Link to={`/flowers/${d.id}`}>
              <div
                key={d.id}
                className=" owerflow-hidden cursor-pointer h-16  bg-white w-full border border-red-100 flex items-center px-5 hover:bg-gray-100"
              >
                <img
                  className="bg-cover w-7 h-10 rounded-md mr-4"
                  src={d.profile_picture}
                  alt=""
                />
                <div className="flex flex-col">
                  <h1 className="font-medium">{d.name}</h1>
                  <h1 className="font-sm text-gray-400">{d.latin_name}</h1>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Search;
