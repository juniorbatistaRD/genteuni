import React, { useState, createContext } from "react";
import Parse from "parse";

export const AuthContext = createContext();

function AuthContextProvider(props) {
  const [currentUser, setCurrentUser] = useState(Parse.User.current());

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
