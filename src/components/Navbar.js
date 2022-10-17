import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { UserContext } from "../context/userContext";
function Navbar({ setRegister, setLogin, setProfile }) {
  const { currentUser } = useContext(UserContext);

  const name =
    currentUser?.user?.first_name + " " + currentUser?.user?.last_name;

  return (
    <>
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 flex ">
        <div className=" flex w-full justify-between items-center  py-6  md:space-x-10 ">
          <div className="ml-4 flex lg:ml-0">
            <Link to="/">
              <img src={logo} alt="FlwrSpot" />
            </Link>
          </div>
          <div className=" flex ">
            <ul className="space-x-14 flex items-center text-secondary cursor-pointer ">
              <li>Flowers</li>
              <li>Latest Sightings</li>
              <li>Favorites</li>
              {currentUser?.user ? (
                <div
                  className="flex items-center"
                  onClick={() => {
                    setProfile(true);
                  }}
                >
                  <li>{name}</li>
                  <img
                    src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="profilePicture"
                    className="w-10 h-10 rounded-full object-cover m-5"
                  />
                </div>
              ) : (
                <li onClick={() => setLogin(true)}>Login</li>
              )}
            </ul>

            {!currentUser?.user && (
              <button
                className="ml-12 bg-primary text-white py-3 px-8 rounded-full"
                onClick={() => setRegister(true)}
              >
                New Account
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
