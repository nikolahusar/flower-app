import axios from "axios";
import React from "react";

const FlowerCard = (props) => {
  const { id, name, latinName, sightings, img } = props;

  const addToFave = async () => {
    await axios.post(
      `https://flowrspot-api.herokuapp.com/api/v1/flowers/${id}/favorites`
    );
  };

  return (
    <div
      className="w-[280px] bg-cover bg-center h-[350px] rounded-[3px]  "
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.7) 89.5%), url(${img})`,
      }}
    >
      <div className="flex flex-col text-white items-center justify-end  h-full">
        <h1 className="text-xl ">{name}</h1>
        <p className="mb-5 opacity-[0.7] text-xs">{latinName}</p>
        <button
          className=" h-[30px] w-[103px] rounded-[20px] text-xs px-3.5 mb-5 "
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => addToFave(id)}
        >
          {sightings}
        </button>
      </div>
    </div>
  );
};

export default FlowerCard;
