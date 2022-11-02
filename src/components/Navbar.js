import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { getUser } from "../redux/apiCalls";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
function Navbar({ setRegister, setLogin, setProfile, menu, setMenu }) {
  const loggedIn = useSelector((state) => state.user.userLoggedIn);
  const userInfo = useSelector((state) => state.user.userInfo);
  const name = userInfo?.first_name + " " + userInfo?.last_name;
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  useEffect(() => {
    token && dispatch(getUser(token));
  }, [dispatch, token]);

  const openMenu = () => {
    setMenu(true);
    navigate("/mobileMenu");
  };

  const closeMenu = () => {
    setMenu(false);
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-between items-center px-4 py-6 mx-auto max-w-[1220px] sm:max-w-full  ">
        <div className="">
          <Link to="/">
            <img src={logo} alt="FlwrSpot" />
          </Link>
        </div>
        <div className="sm:block hidden text-[#949EA0] w-6">
          {location.pathname === "/mobileMenu" ? (
            <AiOutlineClose onClick={closeMenu} />
          ) : (
            <AiOutlineMenu onClick={openMenu} />
          )}
        </div>
        <div className=" flex sm:hidden ">
          <ul className="gap-x-14 sm:gap-x-4 flex items-center text-secondary cursor-pointer sm:text-xs">
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
              className="ml-12 bg-primary text-white py-3 px-8 rounded-full sm:text-xs"
              onClick={() => setRegister(true)}
            >
              New Account
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
