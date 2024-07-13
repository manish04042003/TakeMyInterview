import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { atom,useRecoilState,useRecoilValue } from "recoil";
import { isLoginstate } from "./store";
import useIsLoggedIn from "./customhooks/useIsLoggedIn";
import Logo from "./landingcomponent/Logo"
function Landing() {
    const [isLogin,setLoginState] = useRecoilState(isLoginstate);
    const {loding , isLoggedIn} = useIsLoggedIn();
    useEffect(()=>{
        let token = localStorage.getItem("token");
        if(token==null || token==''){
            setLoginState(false);
        }else{
            setLoginState(true)
        }
    },[]);


    const handlelogout =()=>{
        localStorage.setItem("token",null);
        setLoginState(false)
    }

    return <>
        <nav className="landingnav" >
            <Logo/>

            {(isLoggedIn)?
                <Link to="/dashboard"><button className="custom-btn btn-15">Go to Dashboard</button></Link>
            :<div>
                <Link to="/login"><button className="custom-btn btn-15">Login</button></Link>
                <Link to="/signup"><button className="custom-btn btn-15">Sign Up</button></Link>
            </div>}
        </nav>
        <div className="landingpagecontent">
            <Outlet />
        </div>
    </>

}

export default Landing