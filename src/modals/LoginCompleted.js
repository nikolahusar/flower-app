import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginCompleted = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  const navigate = useNavigate();
  const profileModal = () => {
    navigate("/user");
  };

  return (
    <div
      className="absolute text-white z-20 min-h-screen max-w-screen flex pt-[400px] items-center  flex-col top-0 bottom-0 left-0 right-0 "
      style={{
        background: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8))",
      }}
    >
      <div className="w-[440px]  bg-white text-black p-4 flex flex-col justify-items-center ">
        {loading ? (
          "Loading..."
        ) : (
          <>
            <h2 className="text-xl">
              Congratulations! You have successfully logged into FlowrSpot!
            </h2>
            <div className="flex gap-2">
              <button
                className="flex-1  py-2 mt-4 text-sm text-white shadow-[0px 15px 20px rgba(234, 168, 159, 0.2)] "
                style={{
                  background:
                    "linear-gradient(270deg, #ECBCB3 0%, #EAA79E 100%)",
                }}
                onClick={() => navigate(0)}
              >
                OK
              </button>
              <button
                className="flex-1  py-2 mt-4 text-sm   border-primary border text-primary"
                onClick={profileModal}
              >
                Profile
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginCompleted;
