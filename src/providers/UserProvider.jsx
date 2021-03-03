import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const UserContext = createContext({ user: null });

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { push } = useHistory();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { user, success } = {} } = await axios({
          method: "GET",
          url: `https://stark-garden-96861.herokuapp.com/auth/facebook/success`,
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        });

        if (user && success) {
          setUser(user);
        }
      } catch (err) {
        push("/login");
      }
    };

    checkSession();
  }, [push]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
