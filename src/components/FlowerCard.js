// import axios from "axios";
import axios from "axios";
import React from "react";
import { BsFillStarFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { favoriteList, markAsFavorite } from "../redux/apiCalls";

const FlowerCard = (props) => {
  const { id, name, latinName, sightings, img, flower_id } = props;
  const user = useSelector((state) => state.user);
  const loggedIn = user.userLoggedIn;
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favoriteList);
  const token = useSelector((state) => state.user.token);

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
  const deleteFromFave = async () => {
    await axios.delete(
      `https://flowrspot-api.herokuapp.com/api/v1/flowers/${id}/favorites/${flower_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(favoriteList(token));
  };

  const color = findId(id) && "bg-primary text-[white]";
  return (
    <div
      className="w-[280px] bg-cover bg-center h-[350px] rounded-[3px]  relative"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.7) 89.5%), url(${img})`,
      }}
    >
      <div
        onClick={!flower_id ? add : deleteFromFave}
        className={`absolute top-5 right-5 w-[30px] h-[30px] cursor-pointer   rounded-full  flex items-center justify-center ${
          findId(id) ? "bg-primary text-[white]" : "bg-white text-[gray]"
        }`}
      >
        <BsFillStarFill className="w-[13px] h-[12px] " />
      </div>
      <Link to={`/flowers/${id}`}>
        <div className="flex flex-col text-white items-center justify-end  h-full">
          <h1 className="text-xl ">{name}</h1>
          <p className="mb-5 opacity-[0.7] text-xs">{latinName}</p>
          <button
            className={` h-[30px] w-[103px] rounded-[20px] text-xs px-3.5 mb-5 ${color}`}
          >
            {sightings}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default FlowerCard;
