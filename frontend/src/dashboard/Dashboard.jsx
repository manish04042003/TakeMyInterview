import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar"
import useIsLoggedIn from "../customhooks/useIsLoggedIn";


function Dashboard(){
    const navigate = useNavigate();
    const {loding , isLoggedIn} = useIsLoggedIn();

    console.log(loding);
    console.log(isLoggedIn);
    if(loding){
        return "loding...."
    }
    if(isLoggedIn==false){
        // console.log("redice;bsdfbsbd")
        navigate("/login")
    }
    return <>
          <Navbar/>
         <Outlet></Outlet>
    </>
}

export default Dashboard;