import React, { useContext } from "react";
import Header from "../components/Header";
import AuthContext from "../context/AuthProvider";


const appBarComponent = (Component) => () => {
    const { auth } = useContext(AuthContext);
    return (
        <>
        {auth.email != "" && 
         <Header /> }
        <Component></Component>
        </>
    )
}

export default appBarComponent;