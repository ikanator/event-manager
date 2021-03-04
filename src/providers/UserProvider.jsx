import { useState, useEffect, createContext } from "react";

export const UserContext = createContext({ user: null });

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const tokenId = localStorage.getItem("tokenId");

    if (userId && tokenId) {
      setUser({ userId });
    } else {
      setUser(undefined);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
