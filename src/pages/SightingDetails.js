import React, { useEffect, useRef, useState } from "react";
import { AiFillHeart, AiFillMessage } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import { addComment, getComments, getSightingDetails } from "../redux/apiCalls";
import { like, unlike, getLikes } from "../redux/apiCalls";
import GoogleMaps from "../components/GoogleMap";

const SightingDetails = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const renderLikes = useSelector((state) => state.likes.likes);

  const userId = userInfo?.id;
  const id = useParams();
  const [content, setContent] = useState("");
  const token = useSelector((state) => state.user.token);
  const ref = useRef();
  const comments = useSelector((state) => state.comments.comments);
  const data = useSelector((state) => state.sightingDetails.sighting);
  const loggedIn = useSelector((state) => state.user.userLoggedIn);
  const idArr = renderLikes.map((id) => id.user_id);

  function findId(userId) {
    return idArr?.find((id) => {
      return id === userId;
    });
  }
  const color = loggedIn && findId(userId) ? "text-red-500" : null;

  const focusInput = () => {
    ref.current.focus();
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSightingDetails(id.id));
  }, [id.id, dispatch]);

  useEffect(() => {
    dispatch(getComments(id.id));
  }, [id.id, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment(id.id, content, token));
    setContent("");
  };

  const handleLike = () => {
    dispatch(like(id.id, token));
  };
  const handleUnlike = () => {
    dispatch(unlike(id.id, token));
  };

  useEffect(() => {
    dispatch(getLikes(id.id));
  }, [id.id, dispatch]);

  const [position, setPosition] = useState({
    lat: 0,
    lng: 0,
  });
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }
  return (
    <>
      <div className="w-full">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full overflow-hidden h-[400px]">
            <GoogleMaps
              position={{ lat: data.latitude, lng: data.longitude }}
              setPosition={setPosition}
            />
          </div>
          <div className=" z-10 w-[1220px] sm:w-[90%] p-[30px] sm:p-4 h-[350px] sm:h-screen z-1 shadow-lg mx-auto  mt-[-50px] bg-[white] flex items-center gap-[50px] sm:gap-2 scroll-smooth sm:flex-col">
            <div className="w-[290px] h-[290px] sm:w-full">
              <img
                src={data.picture}
                alt={data.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col w-full">
              <div className="user-info flex items-center my-5 gap-[15px] flex-start ">
                <img
                  src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="profilePicture"
                  className="w-10 h-10 rounded-full object-cover sm:w-[50px] sm:h-[50px]"
                />
                <div className="author flex flex-col">
                  <h1 className="text-[15px] font-normal text-[#334144] sm:text-[25px]">
                    {data.name}
                  </h1>
                  <p className="font-normal italic text-xs text-secondary sm:text-sm">
                    By {data.user?.full_name}
                  </p>
                </div>
              </div>
              <p className="font-medium text-xs text-secondary  h-[74px] sm:h-[200px]">
                {truncate(data.description, 400)}
              </p>
              <div className=" flex items-center gap-5 py-5 border-t  border-[#E8E9ED]">
                <div className="flex items-center gap-2.5">
                  <AiFillMessage className="text-[#D4D8D9] w-[16px]" />
                  <p className="text-secondary text-xs">
                    <span>{comments.length}</span> Comments
                  </p>
                </div>
                <div
                  className="flex items-center gap-2.5 cursor-pointer"
                  onClick={findId(userId) ? handleUnlike : handleLike}
                >
                  <AiFillHeart className={`text-[#D4D8D9] w-[18px] ${color}`} />
                  <p className="text-secondary text-xs">
                    <span>{data.likes_count}</span> Likes
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[50px] w-[780px] border-t border-[#E8E9ED] mx-auto pb-[80px] sm:w-full sm:border-none sm:px-4 sm:mb-5">
            <div className="flex mt-[63px] items-center justify-between">
              <p className="text-[25px] text-[#334144] pl-[50px] sm:pl-4 sm:font-light">
                {comments.length} Comments
              </p>
              <button
                onClick={focusInput}
                className="w-[150px] sm:mt-[-160px] h-[50px] bg-white shadow-lg text-[#DF9186] text-[14px] border-none outline-none font-medium"
              >
                Add Comment
              </button>
            </div>
            <section className="mt-20 sm:px-4 sm:mt-10">
              {comments?.map((comment) => (
                <CommentSection
                  key={comment.id}
                  user={comment.user_full_name}
                  content={comment.content}
                  sighting_id={comment.sighting_id}
                  id={comment.id}
                  userId={comment.user_id}
                />
              ))}
            </section>
            <form className="mt-[30px]" onSubmit={handleSubmit}>
              <textarea
                type="text"
                placeholder="Write a comment..."
                onChange={(e) => setContent(e.target.value)}
                value={content}
                ref={ref}
                className="h-[150px] w-full resize-none bg-[#F5F6F7] rounded-[3px] outline-none border-none p-5 "
              />
              <div className="w-full flex justify-end mt-5">
                <button className="bg-primary text-white py-[18px] px-[35px] text-[14px] font-medium">
                  Publish Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SightingDetails;
