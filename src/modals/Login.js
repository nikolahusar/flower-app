import axios from "axios";
import React, { useRef } from "react";

const Login = ({ setLogin, setLoginCompleted }) => {
  const email = useRef();
  const password = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "https://flowrspot-api.herokuapp.com/api/v1/users/login",
      {
        email: email.current.value,
        password: password.current.value,
      }
    );

    localStorage.setItem("authToken", res.data.auth_token);

    setLoginCompleted(true);
    setLogin(false);
  };

  return (
    <div
      className="absolute text-white z-10 min-h-screen max-w-screen flex pt-[400px] items-center p-6 flex-col top-0 bottom-0 left-0 right-0 "
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
            className="w-full h-10 rounded-[3px] border-[1px]  border-solid border-[#DFE5EA] px-3 placeholder:text-[10px] bg-[#F5F6F7] outline-none mb-5"
            placeholder="Password"
            ref={password}
          />
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
      <button
        className="text-[13px] opacity-[0.5] mt-5"
        onClick={() => setLogin(false)}
      >
        I dont want to login
      </button>
    </div>
  );
};

export default Login;
