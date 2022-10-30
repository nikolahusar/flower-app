import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../redux/apiCalls";
const CommentSection = (props) => {
  const { id, userId, sighting_id, user, content } = props;
  const userInfo = useSelector((state) => state.user.userInfo);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.userLoggedIn);

  return (
    <>
      <div className="flex items-center my-5 gap-[15px] ">
        <div className="flex-1 flex items-center">
          <img
            src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="profilePicture"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="author flex flex-col ml-5">
            <h1 className="text-[15px] font-normal text-[#334144]">{user}</h1>
            <p className="font-normal italic text-xs text-secondary">
              4 days ago
            </p>
          </div>
        </div>

        <div>
          {loggedIn && userId === userInfo.id ? (
            <button
              onClick={() => dispatch(deleteComment(sighting_id, id, token))}
              className=" text-[#DF9186] text-[14px] border-none outline-none font-medium"
            >
              remove
            </button>
          ) : null}
        </div>
      </div>
      <div className="border-b pb-[30px] border-[#E8E9ED] text-secondary text-[13px] font-normal text-justify">
        {content}
      </div>
    </>
  );
};

export default CommentSection;
