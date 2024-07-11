import { useRecoilState } from "recoil";
import { isLoginstate } from "../store";
import { Link, useNavigate } from "react-router-dom";



function Navbar() {
    const navigate = useNavigate();
    const [loginState, setLoginState] = useRecoilState(isLoginstate);
    // const  handlelogot = ()=>{
    //     localStorage.setItem("token","");
    //     setLoginState(false);
    //     console.log(loginState);
    //     navigate("/login");

    // }
    return <>
        <div className="link-container">
            <h1>Mock Master</h1>
            {/* <p onClick={ handlelogot} >Logout</p> */}
        </div>
    </>
}


export default Navbar