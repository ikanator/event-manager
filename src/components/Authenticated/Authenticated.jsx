import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const Authenticated = () => {
  const { location, push } = useHistory();

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const userId = params.get("userId");
    const tokenId = params.get("tokenId");

    if (userId && tokenId) {
      localStorage.setItem("userId", userId);
      localStorage.setItem("tokenId", tokenId);

      push("/");
    }
  }, [location, push]);

  return <>Authenticated</>;
};
