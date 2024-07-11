import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { atom,useRecoilState,useRecoilValue } from "recoil";
import { isLoginstate } from "./store";
import useIsLoggedIn from "./customhooks/useIsLoggedIn";
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
        <nav style={{display:"flex", justifyContent:"space-between"}} >
            <p>
                    <Link to="/">Home </Link>
            </p>
            <p>
                    <Link to="/aboutus">About Us</Link>
            </p>
            {(isLoggedIn)?<button onClick={handlelogout}>Log Out</button>:<>
            <p><Link to="/login">Login</Link></p><p>
                    <Link to="/signup">Sign Up</Link>
            </p>
            </>}
        </nav>
        <br />
        <br />
        <br />
        <Outlet />
    </>

}

export default Landing