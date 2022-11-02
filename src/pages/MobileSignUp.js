import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const MobileSignUp = () => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();
  const dateOfBirth = useRef();

  const [proba, setProba] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://flowrspot-api.herokuapp.com/api/v1/users/register", {
        email: email.current.value,
        password: password.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        date_of_birth: dateOfBirth.current.value,
      })
      .catch((e) => alert(e.response.data.error));
    setProba(true);
  };

  return (
    <div className="w-full max-h-screen bg-white">
      {!proba ? (
        <div className="  bg-white text-black px-6 ">
          <h1 className="text-xl font-semibold  text-center text-[#334144] my-6 ">
            Create An Account
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap  gap-y-6">
              <input
                type="text"
                placeholder="First Name"
                className="w-[160px] h-10 rounded-[3px] border-[1px] border-solid border-[#DFE5EA] px-3 placeholder:text-[10px] bg-[#F5F6F7] outline-none"
                ref={firstName}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-[160px] h-10 rounded-[3px] border-[1px] border-solid border-[#DFE5EA] ml-auto px-3 placeholder:text-[10px] bg-[#F5F6F7] outline-none"
                ref={lastName}
                required
              />
              <input
                type="date"
                placeholder="Date of Birth"
                className="w-full h-10 rounded-[3px] border-[1px]  border-solid border-[#DFE5EA] px-3 placeholder:text-[10px] bg-[#F5F6F7] outline-none"
                ref={dateOfBirth}
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full h-10 rounded-[3px] border-[1px]  border-solid border-[#DFE5EA] px-3 placeholder:text-[10px] bg-[#F5F6F7] outline-none"
                ref={email}
              />
              <input
                type="text"
                placeholder="Password"
                className="w-full h-10 rounded-[3px] border-[1px]  border-solid border-[#DFE5EA] px-3 placeholder:text-[10px] bg-[#F5F6F7] outline-none"
                ref={password}
                required
              />
            </div>
            <button
              className="w-full py-[18px] my-6 text-sm text-white shadow-[0px 15px 20px rgba(234, 168, 159, 0.2)] "
              style={{
                background: "linear-gradient(270deg, #ECBCB3 0%, #EAA79E 100%)",
              }}
              type="submit"
            >
              Create Account
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full bg-white  text-black p-4 flex flex-col ">
          <>
            <h2 className="text-xl">
              Congratulations! You have successfully signed up for FlowrSpot!
            </h2>
            <button
              className="w-full  py-2 mt-4 text-sm text-white shadow-[0px 15px 20px rgba(234, 168, 159, 0.2)] "
              style={{
                background: "linear-gradient(270deg, #ECBCB3 0%, #EAA79E 100%)",
              }}
              onClick={() => navigate("/login")}
            >
              OK
            </button>
          </>
        </div>
      )}
    </div>
  );
};

export default MobileSignUp;
