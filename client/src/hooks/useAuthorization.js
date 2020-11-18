import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useAuthorization = () => {
  const { authState } = useContext(AuthContext);

  const [authorization] = useState({
    headers: {
      Authorization: `Bearer ${authState.jwttoken}`,
    },
  });

  return { authorization };
};

export default useAuthorization;
