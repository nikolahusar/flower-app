import React, { useState } from "react";

const Settings = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="w-full bg-[#f2f2f2] h-screen px-8 py-6 ">
      <h1 className="text-center text-xl text-[#334144] font-medium">
        Settings
      </h1>
      <div className="flex mt-[70px] border-b border-gray-300 pb-20">
        <p>Turn notification</p>
        <div className="flex flex-col items-center justify-center ml-6 ">
          <div
            className="w-[60px] h-[30px] border rounded-[15px] "
            onClick={() => setToggle(!toggle)}
          >
            <span
              className={`w-[26px] h-[26px] bg-primary ${
                toggle ? "ml-[2px]" : "ml-[31px]"
              } rounded-full block transition-${toggle} duration-[0.5s]`}
            ></span>
          </div>
          <div className="flex items-center gap-2 text-[14px]">
            <span className={`${toggle ? "text-[#334144]" : "text-[#949EA0]"}`}>
              on
            </span>
            <span
              className={`${!toggle ? "text-[#334144]" : "text-[#949EA0]"}`}
            >
              off
            </span>
          </div>
        </div>
      </div>
      <p className="text-sm text-[#334144] my-8">
        Select favorite flower sighting radius for notifications
      </p>
      <div className="w-full h-0.5 bg-black relative">
        <div>
          <span className="w-1.5 h-1.5 absolute top-[-1px] left-0 rounded-full bg-black "></span>
          <span className="w-1.5 h-1.5 absolute top-[-1px] right-[50%] rounded-full bg-black"></span>
          <span className="w-1.5 h-1.5 absolute top-[-1px] right-0 rounded-full bg-black"></span>
        </div>
        <div className="text-xs">
          <span className=" absolute top-[12px] left-0 ">1 km</span>
          <span className=" absolute top-[12px] right-[50%] ">5 km</span>
          <span className=" absolute top-[12px] right-0 ">10 km</span>
        </div>
      </div>
    </div>
  );
};

export default Settings;
