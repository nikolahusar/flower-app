import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./modals/Login";
import LoginCompleted from "./modals/LoginCompleted";
import Profile from "./modals/Profile";
import RegisterCompleted from "./modals/RegisterCompleted";
import SignUp from "./modals/SignUp";
import Home from "./pages/Home";

function App() {
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);
  const [registerCompleted, setRegisterCompleted] = useState(false);
  const [loginCompleted, setLoginCompleted] = useState(false);
  const [profile, setProfile] = useState(false);

  return (
    <>
      <BrowserRouter>
        <div className="relative">
          <Navbar
            setRegister={setRegister}
            setLogin={setLogin}
            setProfile={setProfile}
          />
          {register && (
            <SignUp
              setRegister={setRegister}
              setRegisterCompleted={setRegisterCompleted}
            />
          )}
          {registerCompleted && (
            <RegisterCompleted
              setLogin={setLogin}
              setRegisterCompleted={setRegisterCompleted}
            />
          )}
          {login && (
            <Login setLogin={setLogin} setLoginCompleted={setLoginCompleted} />
          )}
          {loginCompleted && (
            <LoginCompleted
              setLoginCompleted={setLoginCompleted}
              setProfile={setProfile}
            />
          )}
          {profile && <Profile setProfile={setProfile} />}
          <Routes>
            <Route index element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
