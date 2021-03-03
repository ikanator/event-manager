import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const UserContext = createContext({ user: null });

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const data = await axios({
        method: "GET",
        url: `https://stark-garden-96861.herokuapp.com/auth/facebook/success`,
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });

      // if (user && status === 200) {
      //   setUser(user);
      // }
      console.log(data);
    };

    checkSession();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
