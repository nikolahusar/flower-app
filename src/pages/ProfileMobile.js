import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { favListRemove } from "../redux/FavoriteSlice";
import { logOut } from "../redux/UserSlice";

const ProfileMobile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const name = userInfo?.first_name + " " + userInfo?.last_name;
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logOut());
    dispatch(favListRemove());
    navigate("/");
  };

  return (
    <div className="w-full max-h-screen bg-white">
      <div className="w-full  px-8 pt-[30px] bg-white text-black relative">
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
        <div className="mt-10 mb-8 leading-none ">
          <p className="text-[10px] text-[#949EA0] mb-4">First Name</p>
          <h2 className="text-[#334144] text-lg">{userInfo?.first_name}</h2>
        </div>
        <div className="mb-8 leading-none">
          <p className="text-[10px] text-[#949EA0] mb-4">Last Name</p>
          <h2 className="text-[#334144] text-lg">{userInfo?.last_name}</h2>
        </div>
        <div className="mb-8 leading-none">
          <p className="text-[10px] text-[#949EA0] mb-4">Date of Birth</p>
          <h2 className="text-[#334144] text-lg">23 Feb, 1998</h2>
        </div>
        <div className="leading-none">
          <p className="text-[10px] text-[#949EA0] mb-4">Email</p>
          <h2 className="text-[#334144] text-lg">johndoe@gmail.com</h2>
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
  );
};

export default ProfileMobile;
