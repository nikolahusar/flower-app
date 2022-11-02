import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/apiCalls";
import { err } from "../redux/UserSlice";
import LoginCompleted from "./LoginCompleted";
const Login = ({ setLogin }) => {
  const email = useRef();
  const password = useRef();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.userLoggedIn);
  const error = useSelector((state) => state.user.error);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    loginUser(
      { email: email.current.value, password: password.current.value },
      dispatch
    );

    loggedIn && setLogin(false);
    navigate(-1);
  };
  console.log(error);

  return (
    <>
      {!loggedIn ? (
        <div
          className="absolute text-white z-20 min-h-screen max-w-screen flex pt-[400px] items-center p-6 flex-col top-0 bottom-0 left-0 right-0 "
          style={{
            background: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8))",
          }}
        >
          <div className="w-[440px]  bg-white text-black px-6">
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
                  background:
                    "linear-gradient(270deg, #ECBCB3 0%, #EAA79E 100%)",
                }}
                type="submit"
              >
                Login to your Account
              </button>
            </form>
          </div>
          <button
            className="text-[13px] opacity-[0.5] mt-5"
            onClick={() => {
              setLogin(false);
              dispatch(err());
            }}
          >
            I dont want to login
          </button>
        </div>
      ) : (
        <LoginCompleted />
      )}
    </>
  );
};

export default Login;
