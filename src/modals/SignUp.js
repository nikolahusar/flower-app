import axios from "axios";
import React, { useRef } from "react";
const SignUp = ({ setRegister, setRegisterCompleted }) => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();
  const dateOfBirth = useRef();

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
      .then((res) => {
        console.log(res);
      });

    setRegisterCompleted(true);
    setRegister(false);
  };

  return (
    <>
      <div
        className="absolute text-white z-20 min-h-screen max-w-screen flex pt-[400px] items-center p-6 flex-col top-0 bottom-0 left-0 right-0 overflow-hidden "
        style={{
          background: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8))",
        }}
      >
        <div className="w-[440px]  bg-white text-black px-6 ">
          <h1 className="text-xl font-semibold  text-center text-[#334144] my-6 ">
            Create An Account
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap  gap-y-6">
              <input
                type="text"
                placeholder="First Name"
                className="w-[185px] h-10 rounded-[3px] border-[1px] border-solid border-[#DFE5EA] px-3 placeholder:text-[10px] bg-[#F5F6F7] outline-none"
                ref={firstName}
                required="This field is required"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-[185px] h-10 rounded-[3px] border-[1px] border-solid border-[#DFE5EA] ml-auto px-3 placeholder:text-[10px] bg-[#F5F6F7] outline-none"
                ref={lastName}
              />
              <input
                type="text"
                placeholder="Date of Birth"
                className="w-full h-10 rounded-[3px] border-[1px]  border-solid border-[#DFE5EA] px-3 placeholder:text-[10px] bg-[#F5F6F7] outline-none"
                ref={dateOfBirth}
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
        <button
          onClick={() => setRegister(false)}
          className="text-[13px] opacity-[0.5] mt-5"
        >
          I dont want to register
        </button>
      </div>
    </>
  );
};

export default SignUp;
