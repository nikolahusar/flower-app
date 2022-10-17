import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import axios from "axios";
import FlowerCard from "../components/FlowerCard";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios
        .get("https://flowrspot-api.herokuapp.com//api/v1/flowers")
        .then((res) => setData(res.data))
        .catch((e) => console.log(e.message))
        .finally(() => setLoading(false));
    };
    fetchData();
  }, []);

  return (
    <>
      <Banner />
      {loading && <div>Loading...</div>}
      <section className="flex flex-wrap max-w-[1220px]  mx-auto gap-4 py-[90px]  px-4 ">
        {data?.flowers?.map((flower) => (
          <FlowerCard
            key={flower.id}
            name={flower.name}
            latinName={flower.latin_name}
            sightings={flower.sightings}
            img={flower.profile_picture}
            id={flower.id}
          />
        ))}
      </section>
    </>
  );
};

export default Home;
