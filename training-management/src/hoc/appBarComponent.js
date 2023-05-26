import React, { useContext } from "react";
import Header from "../components/Header";
import AuthContext from "../context/AuthProvider";
import Login from "../components/Login"

const appBarComponent = (Component) => () => {
  const { auth } = useContext(AuthContext);
  return (
    <>
      {auth.email != "" && (
        <>
          <Header />
          <Component></Component>
        </>
      )}
      <Login />
    </>
  );
};

export default appBarComponent;
