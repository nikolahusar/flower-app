import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/apiCalls";

const LoginMobile = () => {
  const email = useRef();
  const password = useRef();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    loginUser(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  const loggedIn = useSelector((state) => state.user.userLoggedIn);

  return (
    <div className="w-full max-h-screen bg-white">
      {!loggedIn ? (
        <div className="w-full  bg-white text-black px-6">
          <h1 className="text-xl font-semibold  text-center text-[#334144] my-6 ">
            Welcome Back
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full h-10 rounded-[3px] border-[1px]  border-solid border-[#DFE5EA] px-3 placeholder:text-[10px] bg-[#F5F6F7] outline-none mb-2.5"
              placeholder="Email Address"
              ref={email}
            />
            <input
              type="text"
              className="w-full h-10 rounded-[3px] border-[1px]  border-solid border-[#DFE5EA] px-3 placeholder:text-[10px] bg-[#F5F6F7] outline-none "
              placeholder="Password"
              ref={password}
            />
            <div className="text-xs font-bold text-red-600 px-1 my-2">
              {error && <span>{error}</span>}
            </div>
            <button
              className="w-full py-[18px]  text-sm text-white shadow-[0px 15px 20px rgba(234, 168, 159, 0.2)] mb-6"
              style={{
                background: "linear-gradient(270deg, #ECBCB3 0%, #EAA79E 100%)",
              }}
              type="submit"
            >
              Login to your Account
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full bg-white text-black p-4 flex flex-col justify-items-center ">
          <h2 className="text-xl">
            Congratulations! You have successfully logged into FlowrSpot!
          </h2>
          <div className="flex gap-2">
            <button
              className="flex-1  py-2 mt-4 text-sm text-white shadow-[0px 15px 20px rgba(234, 168, 159, 0.2)] "
              style={{
                background: "linear-gradient(270deg, #ECBCB3 0%, #EAA79E 100%)",
              }}
              onClick={() => navigate("/")}
            >
              OK
            </button>
            <button
              className="flex-1  py-2 mt-4 text-sm   border-primary border text-primary"
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginMobile;
