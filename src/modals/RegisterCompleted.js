import React, { useEffect, useState } from "react";

const RegisterCompleted = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <>
      <div
        className="absolute text-white z-20 min-h-screen max-w-screen flex pt-[400px] items-center  flex-col top-0 bottom-0 left-0 right-0 "
        style={{
          background: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8))",
        }}
      >
        <div className="w-[440px]  bg-white text-black p-4 flex flex-col justify-items-center ">
          {loading ? (
            "loading..."
          ) : (
            <>
              <h2 className="text-xl">
                Congratulations! You have successfully signed up for FlowrSpot!
              </h2>
              <button
                className="w-full  py-2 mt-4 text-sm text-white shadow-[0px 15px 20px rgba(234, 168, 159, 0.2)] "
                style={{
                  background:
                    "linear-gradient(270deg, #ECBCB3 0%, #EAA79E 100%)",
                }}
              >
                OK
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default RegisterCompleted;
