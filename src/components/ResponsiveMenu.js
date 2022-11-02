import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { favListRemove } from "../redux/FavoriteSlice";
import { logOut } from "../redux/UserSlice";

const ResponsiveMenu = ({ setProfile }) => {
  const loggedIn = useSelector((state) => state.user.userLoggedIn);
  const userInfo = useSelector((state) => state.user.userInfo);
  const name = userInfo?.first_name + " " + userInfo?.last_name;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logOut());
    dispatch(favListRemove());
    setProfile(false);
    navigate("/");
  };

  return (
    <div className="w-full h-screen bg-white  flex-col items-start justify-center p-10 sm:block hidden">
      <ul className="flex flex-col gap-12  text-secondary cursor-pointer">
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
        <li onClick={() => navigate("/settings")}>settings</li>

        {loggedIn && (
          <>
            <li>
              <Link to="/user">{name}</Link>
            </li>
            <li onClick={() => navigate("/profile")}>Profile</li>
          </>
        )}
        {loggedIn && <li onClick={() => logout()}>Logout</li>}
        {!loggedIn && <li onClick={() => navigate("/login")}>Login</li>}
      </ul>

      {!loggedIn ? (
        <>
          <button
            className=" bg-primary text-white py-2 px-8 rounded-full mt-10"
            onClick={() => navigate("/sign-up")}
          >
            New Account
          </button>
        </>
      ) : null}
    </div>
  );
};

export default ResponsiveMenu;
