import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SightingCard from "../components/SightingCard";
import { getUserSightings } from "../redux/apiCalls";
const User = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const token = useSelector((state) => state.user.token);

  const data = useSelector((state) => state.mySightings.sighting);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserSightings(userInfo.id, token));
  }, [userInfo.id, token, dispatch]);

  const name = userInfo.first_name + " " + userInfo.last_name;

  return (
    <>
      <div className="max-w-[1220px] mx-auto my-[50px] sm:my-[30px]  h-[140px] px-4  flex items-center justify-between sm:items-start">
        <div className="flex items-center sm:flex-col sm:gap-[35px]">
          <img
            src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="profilePicture"
            className="w-20 h-20 rounded-full object-cover mr-[30px]"
          />
          <div className="flex flex-col">
            <h2 className="text-[25px] text-[#334144] font-light ">{name}</h2>
            <span className="text-secondary text-sm ">
              {data?.length} sightings
            </span>
          </div>
        </div>

        <button className="w-[110px] h-[50px] mr-[50px] sm:mr-0 sm:mt-4 border-none outline-none bg-primary text-white rounded-[3px] text-sm font-medium">
          Report
        </button>
      </div>
      <div className=" max-w-[1220px] mx-auto px-4 sm:pt-[35px]">
        <section className="flex flex-wrap gap-4 justify-center">
          {data?.map((sighting) => (
            <SightingCard
              key={sighting.id}
              img={sighting.picture}
              comments={sighting.comments_count}
              likes={sighting.likes_count}
              userName={sighting.user.full_name}
              desc={sighting.description}
              name={sighting.name}
              id={sighting.id}
              uid={sighting.user.id}
            />
          ))}
        </section>
      </div>
    </>
  );
};

export default User;
