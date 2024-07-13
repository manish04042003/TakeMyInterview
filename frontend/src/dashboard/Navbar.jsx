import { useRecoilState } from "recoil";
import { isLoginstate } from "../store";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Logo from '../landingcomponent/Logo'
import { useLocation } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const [loginState, setLoginState] = useRecoilState(isLoginstate);
    // const  handlelogot = ()=>{
    //     localStorage.setItem("token","");
    //     setLoginState(false);
    //     console.log(loginState);
    //     navigate("/login");

    // }
    const showButton = location.pathname === '/dashboard' || location.pathname === '/dashboard/home';
    const goBack = () => {
        navigate(-1);
    };

    console.log("btn show",showButton)
    return <>
        <div className="link-container">
            {
                showButton?"":<div className="navbarbackbtn"  onClick={goBack}>
                <ArrowBackIcon />
            </div>
            }
            
            <Logo/>
            <div>
                {showButton? <Link to="/dashboard/playground"><button className="custom-btn btn-15">Start practicing</button></Link>:""}
           
            </div>
        </div>
    </>
}


export default Navbar