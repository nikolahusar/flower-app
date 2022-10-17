import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const getUser = async () => {
      await axios
        .get("https://flowrspot-api.herokuapp.com/api/v1/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setCurrentUser(res.data));
    };

    getUser();
  }, [token]);

  console.log(currentUser);
  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};
