import { useState, useEffect, createContext } from "react";
import { useHistory } from "react-router-dom";

export const UserContext = createContext({ user: null });

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { push } = useHistory();

  useEffect(() => {
    const checkSession = async () => {
      const userId = localStorage.getItem("userId");
      const tokenId = localStorage.getItem("tokenId");

      if (userId && tokenId) {
        setUser({ userId });
      }
    };

    checkSession();
  }, [push]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
