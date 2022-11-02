import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SightingCard from "../components/SightingCard";
import { getSightings } from "../redux/apiCalls";
const Sightings = () => {
  const sightings = useSelector((state) => state.sightings.sightings);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSightings());
  }, [dispatch]);

  return (
    <>
      <div className="max-w-[1220px]  mx-auto relative">
        <div className="text-secondary flex flex-col justify-center items-center py-[50px]">
          <h1 className="text-[40px] mb-6">Sighting List</h1>
          <p className="text-[17px] opacity-[70%]">
            Explore between more than 8.427 sightings
          </p>
        </div>

        <section className="flex flex-wrap  gap-4 pb-20  px-4 justify-center">
          {sightings?.map((sightings) => (
            <SightingCard
              key={sightings.id}
              img={sightings.picture}
              comments={sightings.comments_count}
              likes={sightings.likes_count}
              userName={sightings.user.full_name}
              name={sightings.name}
              desc={sightings.description}
              id={sightings.id}
              uid={sightings.user.id}
            />
          ))}
        </section>
      </div>
    </>
  );
};

export default Sightings;
