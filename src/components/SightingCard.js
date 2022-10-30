import React from "react";
import { AiFillHeart, AiFillMessage } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteSighting } from "../redux/apiCalls";

const SightingCard = (props) => {
  const { id, img, comments, likes, userName, name, desc, uid } = props;

  const user = useSelector((state) => state.user);
  const loggedIn = user.userLoggedIn;

  const userInfo = useSelector((state) => state.user.userInfo);
  const userId = userInfo?.id;

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteSighting(id, token, userId));
  };

  return (
    <div className="w-[280px] max-h-[500px] rounded-[3px] shadow-lg">
      <Link to={`/sighting/${id}`}>
        <div
          className="w-full h-[280px] bg-cover bg-center"
          style={{
            backgroundImage: `url(${img})`,
          }}
        ></div>
      </Link>
      <div className="flex flex-col px-5 ">
        <div className="flex items-center  ">
          <div className="flex-1 flex items-center gap-[15px] my-5">
            <img
              src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="profilePicture"
              className="w-10 h-10 rounded-full object-cover "
            />
            <div className="author flex flex-col">
              <h1 className="text-[15px] font-normal text-[#334144]">{name}</h1>
              <p className="font-normal italic text-xs text-secondary">
                By {userName}
              </p>
            </div>
          </div>
          {loggedIn && userId === uid ? (
            <div className="flex justify-end">
              <button
                className=" text-[#DF9186] text-[14px] border-none outline-none font-medium "
                onClick={handleDelete}
              >
                remove
              </button>
            </div>
          ) : null}
        </div>
        <div className="font-medium text-xs text-secondary  h-[74px] ">
          {truncate(desc, 120)}
        </div>
        <div className=" flex items-center gap-5 py-5 border-t  border-[#E8E9ED]">
          <div className="flex items-center gap-2.5">
            <AiFillMessage className="text-[#D4D8D9] w-[16px]" />
            <p className="text-secondary text-xs">
              <span>{comments}</span> Comments
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <AiFillHeart className="text-[#D4D8D9] w-[18px]" />
            <p className="text-secondary text-xs">
              <span>{likes}</span> Likes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SightingCard;
