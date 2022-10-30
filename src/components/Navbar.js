import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { getUser } from "../redux/apiCalls";
function Navbar({ setRegister, setLogin, setProfile }) {
  const loggedIn = useSelector((state) => state.user.userLoggedIn);

  const userInfo = useSelector((state) => state.user.userInfo);

  const name = userInfo?.first_name + " " + userInfo?.last_name;
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    token && dispatch(getUser(token));
  }, [dispatch, token]);

  return (
    <>
      <div className="  px-4 sm:px-6 flex bg-white">
        <div className=" flex w-full justify-between items-center  py-6  md:space-x-10 mx-auto max-w-[1220px]">
          <div className="ml-4 flex lg:ml-0">
            <Link to="/">
              <img src={logo} alt="FlwrSpot" />
            </Link>
          </div>
          <div className=" flex ">
            <ul className="space-x-14 flex items-center text-secondary cursor-pointer ">
              <Link to="/flower-list">
                <li>Flowers</li>
              </Link>
              <Link to="/sightings">
                <li>Latest Sightings</li>
              </Link>
              {loggedIn && (
                <li>
                  <Link to="/favorite">Favorites</Link>
                </li>
              )}

              {loggedIn ? (
                <div className="flex items-center">
                  <Link to="/user">
                    <li>{name}</li>
                  </Link>
                  <img
                    src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="profilePicture"
                    className="w-10 h-10 rounded-full object-cover m-5"
                    onClick={() => {
                      setProfile(true);
                    }}
                  />
                </div>
              ) : (
                <li onClick={() => setLogin(true)}>Login</li>
              )}
            </ul>
            {!loggedIn && (
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
