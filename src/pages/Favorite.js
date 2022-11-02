import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlowerCard from "../components/FlowerCard";
import { favoriteList } from "../redux/apiCalls";
const Favorite = () => {
  const favorite = useSelector((state) => state.favoriteList);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    dispatch(favoriteList(token));
  }, [dispatch, token]);

  return (
    <div>
      <section className="flex flex-wrap max-w-[1220px]  mx-auto gap-4 mt-[90px]  px-4 justify-center ">
        {favorite?.favoriteList?.fav_flowers.map((f) => (
          <>
            <FlowerCard
              key={f.id}
              name={f.flower.name}
              latinName={f.flower.latin_name}
              img={f.flower.profile_picture}
              sightings={f.flower.sightings}
              flower_id={f.id}
              id={f.flower.id}
            />
          </>
        ))}
      </section>
    </div>
  );
};

export default Favorite;
