import React, { useContext, useState } from "react";

const UserContext = React.createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({ info: null, status: false });

  const value = {
    state: { user },
    actions: { setUser },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const Context = () => useContext(UserContext);
