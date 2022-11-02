import { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ResponsiveMenu from "./components/ResponsiveMenu";
import Login from "./modals/Login";
import Profile from "./modals/Profile";
import SignUp from "./modals/SignUp";
import Favorite from "./pages/Favorite";
import FlowerDetails from "./pages/FlowerDetails";
import FlowerList from "./pages/FlowerList";
import Home from "./pages/Home";
import LoginMobile from "./pages/LoginMobile";
import MobileSignUp from "./pages/MobileSignUp";
import NewSighting from "./pages/NewSighting";
import ProfileMobile from "./pages/ProfileMobile";
import Settings from "./pages/Settings";
import SightingDetails from "./pages/SightingDetails";
import Sightings from "./pages/Sightings";
import User from "./pages/User";

function App() {
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);
  const [profile, setProfile] = useState(false);

  const loggedIn = useSelector((state) => state.user.userLoggedIn);

  const RequireAut = ({ children }) => {
    return loggedIn ? children : <Navigate to="/" />;
  };

  const [menu, setMenu] = useState(false);

  return (
    <>
      <BrowserRouter>
        <div className="relative">
          <Navbar
            setRegister={setRegister}
            setLogin={setLogin}
            setProfile={setProfile}
            menu={menu}
            setMenu={setMenu}
          />
          {register && <SignUp setRegister={setRegister} setLogin={setLogin} />}

          {login && <Login setLogin={setLogin} />}

          {profile && <Profile setProfile={setProfile} />}
          <Routes>
            <Route index element={<Home />} />
            <Route
              path="/favorite"
              element={
                <RequireAut>
                  <Favorite />
                </RequireAut>
              }
            />
            <Route path="/flower-list" element={<FlowerList />} />
            <Route path="/flowers/:id" element={<FlowerDetails />} />
            {menu ? (
              <Route
                path="/mobileMenu"
                element={<ResponsiveMenu setProfile={setProfile} />}
              />
            ) : null}
            <Route path="/sightings" element={<Sightings />} />

            <Route path="/sighting/:id" element={<SightingDetails />} />
            <Route
              path="/new/:id"
              element={
                <RequireAut>
                  <NewSighting />
                </RequireAut>
              }
            />
            <Route
              path="/user"
              element={
                <RequireAut>
                  <User />
                </RequireAut>
              }
            />
            <Route path="/sign-up" element={<MobileSignUp />} />
            <Route path="/login" element={<LoginMobile />} />
            <Route path="/profile" element={<ProfileMobile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
