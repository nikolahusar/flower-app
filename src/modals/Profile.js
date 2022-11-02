import React from "react";
import { logOut } from "../redux/UserSlice";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { favListRemove } from "../redux/FavoriteSlice";
import { useNavigate } from "react-router-dom";
const Profile = ({ setProfile }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const name = userInfo?.first_name + " " + userInfo?.last_name;
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logOut());
    dispatch(favListRemove());
    setProfile(false);
    navigate("/");
  };
  return (
    <>
      <div
        className="absolute text-white z-20 min-h-screen max-w-screen flex pt-[100px] items-center p-6 flex-col top-0 bottom-0 left-0 right-0 "
        style={{
          background: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8))",
        }}
      >
        <div className="w-[590px]  pt-[87px] px-[110px]  bg-white text-black relative">
          <div className="flex items-center">
            <img
              src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="profilePicture"
              className="w-[80px] h-[80px] rounded-full object-cover mr-[30px]"
            />
            <div className="flex flex-col">
              <h2 className="text-2xl mb-1.5">{name}</h2>
              <span className="text-xs text-[#949EA0]">47 Sightings</span>
            </div>
          </div>
          <div className="mt-10 mb-8">
            <p className="text-[10px] text-[#949EA0] mb-4">First Name</p>
            <h2 className="text-[#334144] text-lg">{userInfo?.first_name}</h2>
          </div>
          <div className="mb-8">
            <p className="text-[10px] text-[#949EA0] mb-4">Last Name</p>
            <h2 className="text-[#334144] text-lg">{userInfo?.last_name}</h2>
          </div>
          <div className="mb-8">
            <p className="text-[10px] text-[#949EA0] mb-4">Date of Birth</p>
            <h2 className="text-[#334144] text-lg">23 Feb, 1998</h2>
          </div>
          <div>
            <p className="text-[10px] text-[#949EA0] mb-4">Email</p>
            <h2 className="text-[#334144] text-lg">johndoe@gmail.com</h2>
          </div>
          <div
            onClick={() => setProfile(false)}
            className="absolute top-4 right-4 cursor-pointer"
          >
            <AiOutlineClose />
          </div>
          <div className="text-center">
            <button
              className="w-[150px] h-12 rounded-[3px]   my-[60px] text-sm text-white shadow-[0px 15px 20px rgba(234, 168, 159, 0.2)] px-12 "
              style={{
                background: "linear-gradient(270deg, #ECBCB3 0%, #EAA79E 100%)",
              }}
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
