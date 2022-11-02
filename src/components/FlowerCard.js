// import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { markAsFavorite, deleteFromFave } from "../redux/apiCalls";

const FlowerCard = (props) => {
  const { id, name, latinName, sightings, img } = props;
  const user = useSelector((state) => state.user);
  const loggedIn = user.userLoggedIn;
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favoriteList);
  const token = useSelector((state) => state.user.token);
  const [id2, setId2] = useState();
  function findId(id) {
    return favorite?.favoriteId?.find((flowerId) => {
      return flowerId === id;
    });
  }

  const add = () => {
    loggedIn
      ? dispatch(markAsFavorite(token, id))
      : alert("You have to be logged in!");
  };

  const color = findId(id) && "bg-primary text-[white]";

  const match = favorite?.favoriteList?.fav_flowers;

  const remove = () => {
    dispatch(deleteFromFave(token, id, id2));
  };
  useEffect(() => {
    const getId = () => {
      match?.map((fav) => {
        if (fav.flower.id === id) {
          setId2(fav.id);
        }
        return null;
      });
    };
    getId();
    // eslint-disable-next-line
  }, [add, remove]);
  return (
    <div
      className="w-[280px] bg-cover bg-center h-[350px] rounded-[3px]  relative sm:w-[154px] sm:h-[230px]"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.7) 89.5%), url(${img})`,
      }}
    >
      <div
        onClick={findId(id) ? remove : add}
        className={`absolute top-5 right-5 w-[30px] h-[30px] cursor-pointer   rounded-full  flex items-center justify-center sm:w-[24px] sm:h-[24px] ${
          findId(id) ? "bg-primary text-[white]" : "bg-white text-[gray]"
        }`}
      >
        <BsFillStarFill className="w-[13px] h-[12px] " />
      </div>
      <Link to={`/flowers/${id}`}>
        <div className="flex flex-col text-white items-center justify-end  h-full text-center">
          <h1 className="text-xl sm:text-[16px] ">{name}</h1>
          <p className="mb-5 opacity-[0.7] text-xs sm:text-[10px]">
            {latinName}
          </p>
          <button
            className={` h-[30px] w-[103px] rounded-[20px] text-xs px-3.5 mb-5 sm:text-[10px] ${color}`}
          >
            {sightings}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default FlowerCard;
