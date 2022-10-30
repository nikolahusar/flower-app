import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import hero from "../assets/fd-hero.png";
import { markAsFavorite } from "../redux/apiCalls";

const FlowerDetails = () => {
  const id = useParams();
  const favorite = useSelector((state) => state.favoriteList);
  const user = useSelector((state) => state.user);
  const loggedIn = user.userLoggedIn;

  const [data, setData] = useState([]);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const add = () => {
    loggedIn
      ? dispatch(markAsFavorite(token, data.id))
      : alert("You have to be logged in!");
  };

  useEffect(() => {
    const getFlower = async () => {
      const res = await axios.get(
        `https://flowrspot-api.herokuapp.com/api/v1/flowers/${id.id}`
      );
      setData(res.data.flower);
    };
    getFlower();
  }, [id.id]);

  function findId(id) {
    return favorite?.favoriteId?.find((flowerId) => {
      return flowerId === id;
    });
  }
  console.log(findId(id));

  return (
    <>
      <div
        className="max-w-screen h-[350px] bg-cover bg-center "
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.4) 100%), url(${hero})`,
        }}
      >
        <div className="max-w-[1220px] mx-auto h-full flex">
          <div className="w-[280px] h-[350px] mt-[50px]">
            <img
              src={data.profile_picture}
              alt={data.name}
              className="w-full h-full  object-cover rounded-[3px]"
            />
          </div>
          <div className="w-full  flex  relative">
            <div className="flex flex-col pt-[190px] ml-[50px]">
              <div className="flex  gap-[10px] mb-1.5">
                <div
                  className={`w-[30px] h-[30px] cursor-pointer   rounded-full  flex items-center justify-center  ${
                    findId(data.id)
                      ? "bg-primary text-[white]"
                      : "bg-white text-[gray]"
                  }`}
                  onClick={add}
                >
                  <BsFillStarFill className="w-[13px] h-[12px] " />
                </div>
                <span className="leading-3 text-[white] text-xs rounded-[20px] bg-[rgba(0,0,0,0.2)] px-[15px] py-2.5 ">
                  {data.sightings} sightings
                </span>
              </div>
              <h2 className="text-[35px] text-[white] ">{data.name}</h2>
              <p className="text-[14px] opacity-[70%] text-[white]">
                {data.latin_name}
              </p>
            </div>

            {loggedIn ? (
              <Link
                to={`/new/${data.id}`}
                className="absolute right-[120px] bottom-[50px]  bg-primary text-white py-[18px] px-[35px] text-[14px] font-medium"
              >
                + Add New Sighting
              </Link>
            ) : null}
          </div>
        </div>
      </div>
      <div className="max-w-[1220px]  mx-auto">
        <div className="flex">
          <ul className="w-full pt-[100px] flex flex-col gap-1 text-secondary text-sm font-bold">
            <li>Kingdom: Plantae</li>
            <li>Order: Asterales</li>
            <li>Family: Campanulaceae</li>
            <li>Species: {data.latin_name}</li>
          </ul>
          <div className="max-w-[750px] pr-[120px] pt-[50px] text-secondary text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            illum in quaerat laborum non alias iusto voluptatum, fuga error
            officia deleniti. Modi aperiam dicta et sapiente ut, fugiat
            doloremque nam nesciunt, quod provident eaque dolorem totam rem sint
            labore sit libero ipsam veniam beatae molestias porro quasi aliquam?
            Provident quisquam animi ex laudantium ea sed iusto nulla earum unde
            modi.
            <br />
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In, error
            voluptas earum, numquam nemo quibusdam adipisci suscipit dicta ea
            non nam molestias. Laudantium magni sed corrupti! Nihil maxime
            aliquam tenetur nam non, quo animi quis quibusdam in soluta
            voluptatum earum facilis a laborum corporis sed voluptatibus porro
            eos hic beatae similique doloremque iste veritatis maiores?
            Repudiandae exercitationem sunt eum illo maxime, cumque suscipit
            saepe voluptas ea non. Quibusdam, doloremque non.
          </div>
        </div>
        <hr className="mt-[30px] bg-[#E8E9ED]" />
      </div>
    </>
  );
};

export default FlowerDetails;
