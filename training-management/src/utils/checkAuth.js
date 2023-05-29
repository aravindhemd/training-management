import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";



const CheckAuth = () => {
    console.log("INSIDE CHECKAUTH")
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(auth)

    if(auth && !auth.email){
        navigate("/Login");
    }

    console.log("FINISH CHECKAUTH")
}

export default CheckAuth;