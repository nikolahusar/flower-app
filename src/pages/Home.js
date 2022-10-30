import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/Banner";
import FlowerCard from "../components/FlowerCard";
import { fetchFlowers } from "../redux/apiCalls";
const Home = () => {
  const dispatch = useDispatch();
  const flowers = useSelector((state) => state.flowers);
  useEffect(() => {
    dispatch(fetchFlowers());
  }, [dispatch]);

  return (
    <>
      <Banner />
      {flowers.pending && <div>Loading...</div>}
      <section className="flex flex-wrap max-w-[1220px]  mx-auto gap-4 py-[90px]  px-4 ">
        {flowers?.flowers.map((flower) => (
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
